// Author: Kevin Dubon
// Hogwarts School of AI and Automation - Audio Fetch
// Downloads pre-generated audio cache from GitHub Releases
// Uses Node.js built-ins only (https, fs, path, crypto, child_process)

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { execFileSync } = require('child_process');

const SKILL_DIR = path.resolve(__dirname, '..');
const VERSION_PATH = path.join(SKILL_DIR, 'assets', 'audio-version.json');
const PROJECT_ROOT = path.resolve(SKILL_DIR, '..', '..', '..');
const CACHE_DIR = path.join(PROJECT_ROOT, '.hogwarts-data', 'audio-cache');
const MANIFEST_PATH = path.join(CACHE_DIR, 'manifest.json');

function loadAudioVersion() {
  if (!fs.existsSync(VERSION_PATH)) {
    throw new Error('audio-version.json not found at ' + VERSION_PATH);
  }
  return JSON.parse(fs.readFileSync(VERSION_PATH, 'utf8'));
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

function isUpToDate() {
  const version = loadAudioVersion();
  const manifest = loadManifest();
  return manifest.audio_version === version.version;
}

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const request = (targetUrl) => {
      https.get(targetUrl, (res) => {
        // Follow redirects (GitHub releases redirect to S3)
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          request(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} fetching ${targetUrl}`));
          return;
        }
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }).on('error', reject);
    };
    request(url);
  });
}

function verifySha256(buffer, expectedHash) {
  const actual = crypto.createHash('sha256').update(buffer).digest('hex');
  if (actual !== expectedHash) {
    throw new Error(`SHA256 mismatch!\n  Expected: ${expectedHash}\n  Got:      ${actual}`);
  }
  return true;
}

async function fetchAudio(options = {}) {
  const version = loadAudioVersion();

  // Check if placeholder — not yet configured
  if (version.sha256 === 'PLACEHOLDER_UPLOAD_AUDIO_FIRST') {
    if (!options.silent) {
      console.log('[Audio Fetch] audio-version.json has placeholder values.');
      console.log('  Run scripts/package-audio.sh to package and upload audio first.');
    }
    return { skipped: true, reason: 'not_configured' };
  }

  // Check if already up to date
  if (!options.force && isUpToDate()) {
    if (!options.silent) {
      console.log(`[Audio Fetch] Cache already up to date (${version.version})`);
    }
    return { skipped: true, reason: 'up_to_date' };
  }

  ensureCacheDir();

  if (!options.silent) {
    console.log(`[Audio Fetch] Downloading audio ${version.version}...`);
    console.log(`  URL: ${version.download_url}`);
  }

  // Download tarball
  const tarball = await httpsGet(version.download_url);

  if (!options.silent) {
    console.log(`  Downloaded: ${(tarball.length / 1024).toFixed(0)}KB`);
  }

  // Verify hash
  verifySha256(tarball, version.sha256);
  if (!options.silent) {
    console.log('  SHA256 verified');
  }

  // Write tarball to temp file
  const tmpFile = path.join(CACHE_DIR, '.download.tar.gz');
  fs.writeFileSync(tmpFile, tarball);

  // Extract using tar (available on macOS/Linux)
  try {
    execFileSync('tar', ['xzf', tmpFile, '-C', CACHE_DIR], { stdio: 'pipe' });
    if (!options.silent) {
      console.log(`  Extracted to ${CACHE_DIR}`);
    }
  } catch (err) {
    // Clean up and report
    try { fs.unlinkSync(tmpFile); } catch (e) {}
    throw new Error(`Failed to extract tarball: ${err.message}\n  tar may not be available on this platform.`);
  }

  // Clean up temp file
  try { fs.unlinkSync(tmpFile); } catch (e) {}

  // Build manifest from static-narrations.json + extracted MP3s
  const manifest = loadManifest();
  manifest.audio_version = version.version;
  manifest.fetched_at = new Date().toISOString();
  manifest.version = manifest.version || 1;
  manifest.provider = manifest.provider || 'elevenlabs';
  manifest.generated_at = manifest.generated_at || new Date().toISOString();

  // Rebuild entries from static-narrations catalog
  const narrationsCatalogPath = path.join(SKILL_DIR, 'assets', 'static-narrations.json');
  if (fs.existsSync(narrationsCatalogPath)) {
    const catalog = JSON.parse(fs.readFileSync(narrationsCatalogPath, 'utf8'));
    if (!manifest.entries) manifest.entries = {};
    for (const narration of catalog.narrations) {
      const fileName = `${narration.id}.mp3`;
      const filePath = path.join(CACHE_DIR, fileName);
      if (fs.existsSync(filePath)) {
        const textHash = crypto.createHash('md5').update(narration.text).digest('hex');
        manifest.entries[narration.id] = {
          file: fileName,
          character: narration.character,
          text: narration.text,
          text_hash: textHash,
          generated_at: manifest.fetched_at
        };
      }
    }
    if (!options.silent) {
      console.log(`  Manifest rebuilt (${Object.keys(manifest.entries).length} entries)`);
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');

  if (!options.silent) {
    console.log(`  Manifest updated (audio_version: ${version.version})`);
    console.log('[Audio Fetch] Done!');
  }

  return { fetched: true, version: version.version, bytes: tarball.length };
}

// --- CLI ---

if (require.main === module) {
  const args = process.argv.slice(2);
  const force = args.includes('--force');

  fetchAudio({ force }).then((result) => {
    if (result.skipped) {
      process.exit(0);
    }
    console.log(`\nAudio cache ready (${result.version})`);
  }).catch((err) => {
    console.error(`[Audio Fetch] Error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = { fetchAudio, isUpToDate, loadAudioVersion };
