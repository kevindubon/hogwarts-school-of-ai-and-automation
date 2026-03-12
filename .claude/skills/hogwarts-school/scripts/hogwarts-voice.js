// Author: Kevin Dubon
// Hogwarts School of AI and Automation - Voice Narration
// Provides TTS narration for dramatic moments via ElevenLabs or OpenAI
// Supports audio caching for static narrations and multi-character voices

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const https = require('https');
const { execFile } = require('child_process');

const SKILL_DIR = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(SKILL_DIR, 'assets', 'voice-config.json');
const NARRATIONS_PATH = path.join(SKILL_DIR, 'assets', 'static-narrations.json');
const PROJECT_ROOT = path.resolve(SKILL_DIR, '..', '..', '..');
const CACHE_DIR = path.join(PROJECT_ROOT, '.hogwarts-data', 'audio-cache');
const MANIFEST_PATH = path.join(CACHE_DIR, 'manifest.json');
const PROFILE_PATH = path.join(PROJECT_ROOT, '.hogwarts-data', 'student-profile.json');

// Auto-load .env from project root if keys aren't already in env
const ENV_PATH = path.join(PROJECT_ROOT, '.env');
if (fs.existsSync(ENV_PATH)) {
  const envContent = fs.readFileSync(ENV_PATH, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// --- Configuration ---

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}

function getApiKey(provider) {
  const config = loadConfig();
  const p = provider || config.provider;
  const envVar = config[p]?.api_key_env;
  return envVar ? (process.env[envVar] || null) : null;
}

function isVoiceEnabled() {
  const config = loadConfig();
  return config.enabled === true;
}

function getStudentSettings() {
  try {
    if (fs.existsSync(PROFILE_PATH)) {
      const profile = JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
      return profile.settings || {};
    }
  } catch (e) {}
  return {};
}

function setVoiceEnabled(enabled) {
  const config = loadConfig();
  config.enabled = enabled;
  saveConfig(config);
  return config;
}

function setProvider(provider) {
  if (!['elevenlabs', 'openai'].includes(provider)) {
    throw new Error('Provider must be "elevenlabs" or "openai"');
  }
  const config = loadConfig();
  config.provider = provider;
  saveConfig(config);
  return config;
}

function setVoiceId(voiceId) {
  const config = loadConfig();
  if (config.provider === 'openai') {
    config.openai.voice = voiceId;
  } else {
    config.elevenlabs.voice_id = voiceId;
  }
  saveConfig(config);
  return config;
}

// --- Character Voice Lookup ---

function getVoiceIdForCharacter(characterName) {
  const config = loadConfig();
  const character = config.characters?.[characterName];
  if (character && character.voice_id) {
    return character.voice_id;
  }
  // Fall back to default voice_id
  return config.elevenlabs.voice_id;
}

// --- Cache / Manifest ---

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return { version: 1, generated_at: null, provider: 'elevenlabs', entries: {} };
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

function saveManifest(manifest) {
  ensureCacheDir();
  manifest.generated_at = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
}

function textHash(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

// --- HTTP Helper ---

function apiRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const contentType = res.headers['content-type'] || '';
          if (contentType.includes('application/json')) {
            resolve({ type: 'json', data: JSON.parse(Buffer.concat(chunks).toString()) });
          } else {
            resolve({ type: 'binary', data: Buffer.concat(chunks) });
          }
        } else {
          const body = Buffer.concat(chunks).toString();
          reject(new Error(`API error ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// --- ElevenLabs API ---

async function elevenLabsSynthesize(text, voiceId) {
  const config = loadConfig();
  const apiKey = getApiKey('elevenlabs');
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY not set');

  const el = config.elevenlabs;
  const vid = voiceId || el.voice_id;
  if (!vid || vid === 'TBD_after_voice_selection') {
    throw new Error('ElevenLabs voice ID not configured. Run: node hogwarts-voice.js voices');
  }

  const postData = JSON.stringify({
    text,
    model_id: el.model_id,
    voice_settings: el.voice_settings
  });

  return apiRequest({
    hostname: 'api.elevenlabs.io',
    path: `/v1/text-to-speech/${vid}?output_format=${el.output_format}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
      'Content-Length': Buffer.byteLength(postData)
    }
  }, postData);
}

async function elevenLabsListVoices() {
  const apiKey = getApiKey('elevenlabs');
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY not set');

  return apiRequest({
    hostname: 'api.elevenlabs.io',
    path: '/v1/voices',
    method: 'GET',
    headers: { 'xi-api-key': apiKey }
  });
}

// --- OpenAI API ---

async function openaiSynthesize(text) {
  const config = loadConfig();
  const apiKey = getApiKey('openai');
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const oai = config.openai;
  const postData = JSON.stringify({
    model: oai.model,
    input: text,
    voice: oai.voice,
    response_format: oai.response_format,
    speed: oai.speed
  });

  return apiRequest({
    hostname: 'api.openai.com',
    path: '/v1/audio/speech',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  }, postData);
}

// --- Audio Playback ---

function isAudioPlaying() {
  const { execSync } = require('child_process');
  try {
    if (process.platform === 'darwin') {
      execSync('pgrep -x afplay', { stdio: 'ignore' });
      return true;
    } else if (process.platform === 'linux') {
      execSync('pgrep -x mpv', { stdio: 'ignore' });
      return true;
    }
  } catch (e) {} // pgrep exits non-zero when no match
  return false;
}

async function playAudio(filePath) {
  // Wait for any currently playing audio to finish, then pause 5 seconds
  if (isAudioPlaying()) {
    await waitForAudioToFinish();
    await sleep(5000);
  }
  return new Promise((resolve, reject) => {
    const platform = process.platform;
    let cmd, args;
    if (platform === 'darwin') {
      cmd = 'afplay';
      args = [filePath];
    } else if (platform === 'win32') {
      cmd = 'powershell';
      args = ['-c', `Add-Type -AssemblyName presentationCore; $p = New-Object System.Windows.Media.MediaPlayer; $p.Open('${filePath.replace(/'/g, "''")}'); $p.Play(); while($p.NaturalDuration.HasTimeSpan -eq $false){Start-Sleep -Milliseconds 100}; Start-Sleep -Seconds $p.NaturalDuration.TimeSpan.TotalSeconds; $p.Close()`];
    } else {
      cmd = 'mpv';
      args = ['--no-video', '--really-quiet', filePath];
    }
    execFile(cmd, args, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

function waitForAudioToFinish() {
  return new Promise((resolve) => {
    const check = () => {
      if (isAudioPlaying()) {
        setTimeout(check, 300);
      } else {
        resolve();
      }
    };
    check();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playAudioBackground(filePath) {
  // Wait for any currently playing audio to finish, then pause 5 seconds
  if (isAudioPlaying()) {
    await waitForAudioToFinish();
    await sleep(5000);
  }
  const { spawn } = require('child_process');
  const platform = process.platform;
  let cmd, args;
  if (platform === 'darwin') {
    cmd = 'afplay';
    args = [filePath];
  } else if (platform === 'win32') {
    cmd = 'powershell';
    args = ['-c', `Add-Type -AssemblyName presentationCore; $p = New-Object System.Windows.Media.MediaPlayer; $p.Open('${filePath.replace(/'/g, "''")}'); $p.Play(); while($p.NaturalDuration.HasTimeSpan -eq $false){Start-Sleep -Milliseconds 100}; Start-Sleep -Seconds $p.NaturalDuration.TimeSpan.TotalSeconds; $p.Close()`];
  } else {
    cmd = 'mpv';
    args = ['--no-video', '--really-quiet', filePath];
  }
  const child = spawn(cmd, args, { detached: true, stdio: 'ignore' });
  child.unref();
}

// --- Synthesis ---

async function synthesizeForCharacter(text, characterName) {
  const config = loadConfig();
  if (config.provider === 'openai') {
    return openaiSynthesize(text);
  }
  const voiceId = getVoiceIdForCharacter(characterName || 'dumbledore');
  return elevenLabsSynthesize(text, voiceId);
}

async function synthesizeSpeech(text) {
  return synthesizeForCharacter(text, 'dumbledore');
}

// --- Main Functions ---

async function speak(text, options = {}) {
  if (!isVoiceEnabled() && !options.force) {
    return { skipped: true, reason: 'Voice is disabled' };
  }

  const studentSettings = getStudentSettings();

  // Check cache first if cache_id provided
  if (options.cache_id) {
    // Cached audio respects play_cached_audio setting (default: true)
    if (studentSettings.play_cached_audio === false && !options.force) {
      return { skipped: true, reason: 'Cached audio playback disabled in student settings' };
    }

    const manifest = loadManifest();
    const entry = manifest.entries[options.cache_id];
    if (entry) {
      const cachedFile = path.join(CACHE_DIR, entry.file);
      if (fs.existsSync(cachedFile)) {
        try {
          if (options.background) {
            await playAudioBackground(cachedFile);
            return { played: true, background: true, cached: true, cache_id: options.cache_id };
          }
          await playAudio(cachedFile);
          return { played: true, background: false, cached: true, cache_id: options.cache_id };
        } catch (error) {
          console.warn(`[Hogwarts Voice] Cache playback failed: ${error.message}`);
        }
      }
    }
    // Cache miss — try auto-fetching from GitHub Release
    try {
      const { fetchAudio } = require('./hogwarts-audio-fetch');
      const fetchResult = await fetchAudio({ silent: true });
      if (fetchResult.fetched) {
        // Re-check cache after fetch
        const freshManifest = loadManifest();
        const freshEntry = freshManifest.entries[options.cache_id];
        if (freshEntry) {
          const freshFile = path.join(CACHE_DIR, freshEntry.file);
          if (fs.existsSync(freshFile)) {
            try {
              if (options.background) {
                await playAudioBackground(freshFile);
                return { played: true, background: true, cached: true, cache_id: options.cache_id, auto_fetched: true };
              }
              await playAudio(freshFile);
              return { played: true, background: false, cached: true, cache_id: options.cache_id, auto_fetched: true };
            } catch (error) {
              console.warn(`[Hogwarts Voice] Cache playback failed after fetch: ${error.message}`);
            }
          }
        }
      }
    } catch (fetchErr) {
      // Auto-fetch not available or failed — fall through silently
    }
    // Fall through to live synthesis
  }

  // Dynamic/live API voice respects dynamic_voice_api setting (default: false)
  if (studentSettings.dynamic_voice_api !== true && !options.force) {
    return { skipped: true, reason: 'Dynamic voice API disabled in student settings' };
  }

  const config = loadConfig();
  const apiKey = getApiKey(config.provider);
  if (!apiKey) {
    const envVar = config[config.provider]?.api_key_env || 'API_KEY';
    console.warn(`[Hogwarts Voice] ${envVar} not set - continuing silently`);
    return { skipped: true, reason: 'No API key' };
  }

  const character = options.character || 'dumbledore';
  const timestamp = Date.now();
  const tmpFile = path.join(os.tmpdir(), `hogwarts-voice-${timestamp}.mp3`);

  try {
    const result = await synthesizeForCharacter(text, character);
    if (result.type !== 'binary') {
      throw new Error('Expected audio data from API');
    }

    fs.writeFileSync(tmpFile, result.data);

    if (options.background) {
      await playAudioBackground(tmpFile);
      return { played: true, background: true, chars: text.length, provider: config.provider, character };
    }

    await playAudio(tmpFile);
    fs.unlinkSync(tmpFile);
    return { played: true, background: false, chars: text.length, provider: config.provider, character };
  } catch (error) {
    try { fs.unlinkSync(tmpFile); } catch (e) {}
    if (options.force) throw error;
    console.warn(`[Hogwarts Voice] Narration failed: ${error.message}`);
    return { skipped: true, reason: error.message };
  }
}

// --- Cache Generation ---

async function generateCache() {
  if (!fs.existsSync(NARRATIONS_PATH)) {
    console.error('static-narrations.json not found at', NARRATIONS_PATH);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(NARRATIONS_PATH, 'utf8'));
  const manifest = loadManifest();
  ensureCacheDir();

  let generated = 0;
  let skipped = 0;
  let totalChars = 0;

  for (const entry of catalog.narrations) {
    const hash = textHash(entry.text);
    const existing = manifest.entries[entry.id];

    if (existing && existing.text_hash === hash) {
      const cachedFile = path.join(CACHE_DIR, existing.file);
      if (fs.existsSync(cachedFile)) {
        console.log(`  [skip] ${entry.id} (unchanged)`);
        skipped++;
        continue;
      }
    }

    console.log(`  [gen]  ${entry.id} (${entry.character}, ${entry.text.length} chars)`);
    try {
      const result = await synthesizeForCharacter(entry.text, entry.character);
      if (result.type !== 'binary') {
        throw new Error('Expected audio data');
      }

      const fileName = `${entry.id}.mp3`;
      fs.writeFileSync(path.join(CACHE_DIR, fileName), result.data);

      const voiceId = getVoiceIdForCharacter(entry.character);
      manifest.entries[entry.id] = {
        file: fileName,
        character: entry.character,
        text: entry.text,
        text_hash: hash,
        voice_id: voiceId,
        generated_at: new Date().toISOString()
      };

      generated++;
      totalChars += entry.text.length;
    } catch (error) {
      console.error(`  [ERR]  ${entry.id}: ${error.message}`);
    }
  }

  saveManifest(manifest);

  const costEL = (totalChars / 1000) * 0.06;
  console.log(`\nCache generation complete:`);
  console.log(`  Generated: ${generated} new`);
  console.log(`  Skipped:   ${skipped} unchanged`);
  console.log(`  Total:     ${catalog.narrations.length} entries`);
  if (generated > 0) {
    console.log(`  Chars synthesized: ${totalChars}`);
    console.log(`  Est. cost (ElevenLabs Flash): $${costEL.toFixed(2)}`);
  }
}

// --- Play Cached ---

async function playCached(cacheId, options = {}) {
  // Check student setting (default: true)
  if (!options.force) {
    const studentSettings = getStudentSettings();
    if (studentSettings.play_cached_audio === false) {
      console.log(JSON.stringify({ skipped: true, reason: 'Cached audio playback disabled in student settings', cache_id: cacheId }));
      return;
    }
  }

  // Check if narration belongs to a completed module — skip if so
  if (!options.force && fs.existsSync(NARRATIONS_PATH) && fs.existsSync(PROFILE_PATH)) {
    try {
      const catalog = JSON.parse(fs.readFileSync(NARRATIONS_PATH, 'utf8'));
      const narration = catalog.narrations.find(n => n.id === cacheId);
      if (narration && narration.module !== undefined) {
        const profile = JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
        const moduleProgress = profile.progress?.modules?.[String(narration.module)];
        if (moduleProgress && moduleProgress.status === 'completed') {
          console.log(JSON.stringify({ skipped: true, reason: `Module ${narration.module} already completed`, cache_id: cacheId }));
          return;
        }
      }
    } catch (e) {} // silently continue if check fails
  }

  let manifest = loadManifest();
  let entry = manifest.entries[cacheId];
  let filePath = entry ? path.join(CACHE_DIR, entry.file) : null;

  // Auto-fetch from GitHub Release if entry or file is missing
  if (!entry || !fs.existsSync(filePath)) {
    try {
      const { fetchAudio } = require('./hogwarts-audio-fetch');
      console.log(`[Audio] Cache miss for "${cacheId}" — attempting auto-fetch...`);
      const fetchResult = await fetchAudio({ silent: false });
      if (fetchResult.fetched) {
        manifest = loadManifest();
        entry = manifest.entries[cacheId];
        filePath = entry ? path.join(CACHE_DIR, entry.file) : null;
      }
    } catch (fetchErr) {
      // Auto-fetch not available or failed
    }
  }

  if (!entry) {
    console.error(`Cache entry "${cacheId}" not found.`);
    console.log('Available entries:', Object.keys(manifest.entries).join(', ') || '(none)');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`Cached file not found: ${filePath}`);
    console.log('Run "generate-cache" to regenerate.');
    process.exit(1);
  }

  const isFull = entry.text.length > 200;
  console.log(`Playing: ${cacheId} (${entry.character}, ${isFull ? 'background' : 'foreground'})`);

  if (isFull) {
    await playAudioBackground(filePath);
    console.log(JSON.stringify({ played: true, background: true, cached: true, cache_id: cacheId, character: entry.character }));
  } else {
    await playAudio(filePath);
    console.log(JSON.stringify({ played: true, background: false, cached: true, cache_id: cacheId, character: entry.character }));
  }
}

// --- Cache Status ---

function cacheStatus() {
  const manifest = loadManifest();
  const entries = Object.keys(manifest.entries);

  if (entries.length === 0) {
    console.log('Audio cache is empty. Run "generate-cache" to populate.');
    return;
  }

  console.log('Hogwarts Audio Cache Status:');
  console.log(`  Entries:      ${entries.length}`);
  console.log(`  Generated at: ${manifest.generated_at || 'N/A'}`);
  console.log(`  Provider:     ${manifest.provider}`);
  console.log('');

  let totalSize = 0;
  for (const id of entries) {
    const e = manifest.entries[id];
    const filePath = path.join(CACHE_DIR, e.file);
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    totalSize += size;
    const sizeKB = (size / 1024).toFixed(0);
    const status = exists ? `${sizeKB}KB` : 'MISSING';
    console.log(`  ${id}: ${e.character} | ${e.text.length} chars | ${status}`);
  }
  console.log(`\n  Total cache size: ${(totalSize / 1024).toFixed(0)}KB`);
}

// --- Other Functions ---

async function testVoice() {
  const config = loadConfig();
  console.log(`Testing voice narration (provider: ${config.provider})...`);
  const result = await speak('Welcome to Hogwarts, young wizard.', { force: true });
  console.log('Voice test successful!', result);
  return result;
}

async function listVoices() {
  const config = loadConfig();
  if (config.provider === 'openai') {
    console.log('OpenAI TTS Voices (all available with tts-1 and tts-1-hd):\n');
    const voices = [
      { id: 'alloy',   desc: 'Neutral, balanced, versatile' },
      { id: 'echo',    desc: 'Warm, clear, conversational' },
      { id: 'fable',   desc: 'Warm, expressive, storyteller -- good for narration' },
      { id: 'nova',    desc: 'Bright, friendly, energetic' },
      { id: 'onyx',    desc: 'Deep, authoritative, commanding -- best Dumbledore fit' },
      { id: 'shimmer', desc: 'Soft, gentle, calming' }
    ];
    for (const v of voices) {
      const current = v.id === config.openai.voice ? ' <-- CURRENT' : '';
      console.log(`  ${v.id}${current}`);
      console.log(`    ${v.desc}`);
      console.log('');
    }
    console.log('Set voice: node hogwarts-voice.js set-voice <name>');
    console.log('Upgrade quality: node hogwarts-voice.js set-model tts-1-hd');
    return;
  }
  // ElevenLabs
  console.log('Fetching available voices from ElevenLabs...\n');
  const result = await elevenLabsListVoices();
  if (result.type === 'json' && result.data.voices) {
    const voices = result.data.voices;
    console.log(`Found ${voices.length} voices:\n`);
    for (const v of voices) {
      const labels = v.labels || {};
      const accent = labels.accent || '';
      const age = labels.age || '';
      const gender = labels.gender || '';
      const useCase = labels.use_case || '';
      console.log(`  ${v.voice_id}`);
      console.log(`    Name: ${v.name}`);
      console.log(`    ${gender} | ${age} | ${accent} | ${useCase}`);
      console.log(`    Preview: ${v.preview_url || 'N/A'}`);
      console.log('');
    }
  }
}

function getStatus() {
  const config = loadConfig();
  const provider = config.provider;
  const apiKey = getApiKey(provider);
  const status = {
    enabled: config.enabled,
    provider,
    has_api_key: !!apiKey
  };
  if (provider === 'openai') {
    status.voice = config.openai.voice;
    status.model = config.openai.model;
    status.voice_configured = true;
  } else {
    status.voice_id = config.elevenlabs.voice_id;
    status.model_id = config.elevenlabs.model_id;
    status.voice_configured = config.elevenlabs.voice_id !== 'TBD_after_voice_selection';
  }

  // Add character and cache info
  const characters = config.characters || {};
  status.characters = Object.keys(characters).length;
  const manifest = loadManifest();
  status.cached_entries = Object.keys(manifest.entries).length;

  // Student voice settings
  const studentSettings = getStudentSettings();
  status.play_cached_audio = studentSettings.play_cached_audio !== false;
  status.dynamic_voice_api = studentSettings.dynamic_voice_api === true;

  return status;
}

// --- CLI Interface ---

if (require.main === module) {
  const rawArgs = process.argv.slice(2);
  const command = rawArgs[0];

  // Parse --character flag from args
  let characterFlag = null;
  const args = [];
  for (let i = 1; i < rawArgs.length; i++) {
    if (rawArgs[i] === '--character' && rawArgs[i + 1]) {
      characterFlag = rawArgs[i + 1];
      i++; // skip next
    } else {
      args.push(rawArgs[i]);
    }
  }

  const commands = {
    status: () => {
      const status = getStatus();
      console.log('Hogwarts Voice Narration Status:');
      console.log(`  Enabled:          ${status.enabled}`);
      console.log(`  Provider:         ${status.provider}`);
      console.log(`  API Key Set:      ${status.has_api_key}`);
      if (status.provider === 'openai') {
        console.log(`  Voice:            ${status.voice}`);
        console.log(`  Model:            ${status.model}`);
      } else {
        console.log(`  Voice ID:         ${status.voice_id}`);
        console.log(`  Voice Configured: ${status.voice_configured}`);
        console.log(`  Model:            ${status.model_id}`);
      }
      console.log(`  Characters:       ${status.characters}`);
      console.log(`  Cached Entries:   ${status.cached_entries}`);
      console.log('');
      console.log('  Student Settings:');
      console.log(`    Play Cached Audio:  ${status.play_cached_audio} (pre-cached MP3s)`);
      console.log(`    Dynamic Voice API:  ${status.dynamic_voice_api} (live API calls)`);
    },
    enable: () => {
      setVoiceEnabled(true);
      console.log('Voice narration ENABLED');
    },
    disable: () => {
      setVoiceEnabled(false);
      console.log('Voice narration DISABLED');
    },
    provider: () => {
      const [p] = args;
      if (!p) {
        const config = loadConfig();
        console.log(`Current provider: ${config.provider}`);
        console.log('Available: elevenlabs, openai');
        console.log('Usage: node hogwarts-voice.js provider <elevenlabs|openai>');
        return;
      }
      setProvider(p);
      console.log(`Provider set to: ${p}`);
    },
    speak: async () => {
      const text = args.join(' ');
      if (!text) {
        console.error('Usage: node hogwarts-voice.js speak "text" [--character name]');
        process.exit(1);
      }
      const result = await speak(text, { force: true, character: characterFlag || 'dumbledore' });
      console.log(JSON.stringify(result, null, 2));
    },
    test: async () => {
      await testVoice();
    },
    voices: async () => {
      await listVoices();
    },
    'set-voice': () => {
      const [voiceId] = args;
      if (!voiceId) {
        console.error('Usage: node hogwarts-voice.js set-voice <voice_id>');
        process.exit(1);
      }
      setVoiceId(voiceId);
      const config = loadConfig();
      console.log(`Voice set to: ${voiceId} (provider: ${config.provider})`);
    },
    'set-model': () => {
      const [model] = args;
      if (!model) {
        console.error('Usage: node hogwarts-voice.js set-model <model_id>');
        process.exit(1);
      }
      const config = loadConfig();
      if (config.provider === 'openai') {
        config.openai.model = model;
      } else {
        config.elevenlabs.model_id = model;
      }
      saveConfig(config);
      console.log(`Model set to: ${model} (provider: ${config.provider})`);
    },
    'generate-cache': async () => {
      console.log('Generating audio cache from static narrations...\n');
      await generateCache();
    },
    'play-cached': async () => {
      const [cacheId] = args;
      if (!cacheId) {
        console.error('Usage: node hogwarts-voice.js play-cached <cache_id>');
        process.exit(1);
      }
      await playCached(cacheId);
    },
    'cache-status': () => {
      cacheStatus();
    }
  };

  if (!command || !commands[command]) {
    console.log('Hogwarts Voice Narration');
    console.log('Commands:');
    console.log('  status              Show current voice configuration');
    console.log('  enable              Enable voice narration');
    console.log('  disable             Disable voice narration');
    console.log('  provider [name]     Get/set TTS provider (elevenlabs or openai)');
    console.log('  speak "text"        Narrate the given text');
    console.log('    --character name  Use a specific character voice');
    console.log('  test                Test with "Welcome to Hogwarts"');
    console.log('  voices              List available voices for current provider');
    console.log('  set-voice <id>      Set the voice to use');
    console.log('  set-model <id>      Set the model (e.g. tts-1-hd, eleven_turbo_v2)');
    console.log('  generate-cache      Generate MP3 cache from static-narrations.json');
    console.log('  play-cached <id>    Play a cached narration by ID');
    console.log('  cache-status        Show cache contents and sizes');
    process.exit(0);
  }

  Promise.resolve(commands[command]()).catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = {
  isVoiceEnabled,
  setVoiceEnabled,
  setProvider,
  speak,
  testVoice,
  listVoices,
  getStatus,
  setVoiceId,
  generateCache,
  playCached,
  cacheStatus,
  CONFIG_PATH,
  CACHE_DIR
};
