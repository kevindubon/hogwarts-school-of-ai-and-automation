// Author: Kevin Dubon
// Hogwarts School of AI and Automation - Session Setup
// Ensures audio cache is populated, skill-creator is installed, and environment is ready
// Run this ONCE at the start of every session

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SKILL_DIR = path.resolve(__dirname, '..');
const PROJECT_ROOT = path.resolve(SKILL_DIR, '..', '..', '..');
const CACHE_DIR = path.join(PROJECT_ROOT, '.hogwarts-data', 'audio-cache');
const MANIFEST_PATH = path.join(CACHE_DIR, 'manifest.json');
const VOICE_CONFIG_PATH = path.join(SKILL_DIR, 'assets', 'voice-config.json');
const SKILL_CREATOR_DIR = path.join(PROJECT_ROOT, '.claude', 'skills', 'skill-creator');
const SKILL_CREATOR_REPO = 'https://github.com/anthropics/skills.git';
const SKILL_CREATOR_SRC = 'skills/skill-creator';

// --- Audio Setup ---

async function setupAudio() {
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

// --- Skill Creator Setup ---

function setupSkillCreator() {
  const result = {
    skill_creator_ready: false,
    skill_creator_updated: false
  };

  // Check if already installed
  const skillMdPath = path.join(SKILL_CREATOR_DIR, 'SKILL.md');
  if (fs.existsSync(skillMdPath)) {
    result.skill_creator_ready = true;
    // Try to update via sparse checkout pull
    try {
      execFileSync('git', [
        '-C', SKILL_CREATOR_DIR,
        'pull', '--depth=1', '--quiet'
      ], { stdio: 'pipe', timeout: 15000 });
      result.skill_creator_updated = true;
    } catch (e) {
      // Already installed, update failed — that's fine
    }
    return result;
  }

  // Not installed — fetch via sparse checkout
  try {
    const tmpDir = path.join(PROJECT_ROOT, '.hogwarts-data', '.skill-creator-tmp');

    // Clean up any previous failed attempt
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }

    // Sparse clone just the skill-creator directory
    execFileSync('git', [
      'clone', '--depth=1', '--filter=blob:none', '--sparse',
      SKILL_CREATOR_REPO, tmpDir
    ], { stdio: 'pipe', timeout: 30000 });

    execFileSync('git', [
      '-C', tmpDir,
      'sparse-checkout', 'set', SKILL_CREATOR_SRC
    ], { stdio: 'pipe', timeout: 15000 });

    // Copy to final location
    const srcDir = path.join(tmpDir, SKILL_CREATOR_SRC);
    if (fs.existsSync(srcDir)) {
      fs.mkdirSync(path.dirname(SKILL_CREATOR_DIR), { recursive: true });
      copyDirSync(srcDir, SKILL_CREATOR_DIR);
      result.skill_creator_ready = true;
      result.skill_creator_updated = true;
    }

    // Clean up tmp
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {
    // Fetch failed — skill creator won't be available until manually installed
  }

  return result;
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// --- Main Setup ---

async function setup() {
  const audio = await setupAudio();
  const skillCreator = setupSkillCreator();

  return {
    ...audio,
    ...skillCreator
  };
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
