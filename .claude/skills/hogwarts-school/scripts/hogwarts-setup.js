// Author: Kevin Dubon
// Hogwarts School of AI and Automation - Session Setup
// Ensures audio cache is populated and environment is ready
// Run this ONCE at the start of every session

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.resolve(__dirname, '..');
const PROJECT_ROOT = path.resolve(SKILL_DIR, '..', '..', '..');
const CACHE_DIR = path.join(PROJECT_ROOT, '.hogwarts-data', 'audio-cache');
const MANIFEST_PATH = path.join(CACHE_DIR, 'manifest.json');
const VOICE_CONFIG_PATH = path.join(SKILL_DIR, 'assets', 'voice-config.json');

async function setup() {
  const result = {
    audio_ready: false,
    audio_files: 0,
    voice_enabled: false,
    fetched: false
  };

  // Check voice config
  try {
    const config = JSON.parse(fs.readFileSync(VOICE_CONFIG_PATH, 'utf8'));
    result.voice_enabled = config.enabled === true;
  } catch (e) {
    result.voice_enabled = false;
  }

  // Check existing cache
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
      result.audio_files = manifest.entries ? Object.keys(manifest.entries).length : 0;
      if (result.audio_files >= 24) {
        result.audio_ready = true;
        return result;
      }
    } catch (e) {}
  }

  // Cache incomplete or missing — try fetching
  try {
    const { fetchAudio } = require('./hogwarts-audio-fetch');
    const fetchResult = await fetchAudio({ silent: true });
    if (fetchResult.fetched) {
      result.fetched = true;
      // Re-check manifest
      if (fs.existsSync(MANIFEST_PATH)) {
        const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
        result.audio_files = manifest.entries ? Object.keys(manifest.entries).length : 0;
        result.audio_ready = result.audio_files >= 24;
      }
    } else if (fetchResult.skipped && fetchResult.reason === 'up_to_date') {
      result.audio_ready = true;
    }
  } catch (e) {
    // Fetch not available or failed — audio won't be available
  }

  return result;
}

if (require.main === module) {
  setup().then((result) => {
    console.log(JSON.stringify(result, null, 2));
  }).catch((err) => {
    console.error(`Setup error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = { setup };
