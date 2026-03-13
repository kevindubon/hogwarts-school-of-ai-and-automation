// Author: Kevin Dubon
// Hogwarts School of AI and Automation - Progress Manager
// Reads, writes, and validates student progress state

const fs = require('fs');
const path = require('path');

const SKILL_DIR = path.resolve(__dirname, '..');
// Store student data at project root so skill updates don't overwrite progress
const PROJECT_ROOT = path.resolve(SKILL_DIR, '..', '..', '..');
const PROGRESS_DIR = path.join(PROJECT_ROOT, '.hogwarts-data');
const PROFILE_PATH = path.join(PROGRESS_DIR, 'student-profile.json');
const EXERCISES_DIR = path.join(PROGRESS_DIR, 'exercises');
const SCHEMA_PATH = path.join(SKILL_DIR, 'assets', 'progress-schema.json');

// Legacy location (inside skill folder) -- migrate if found
const LEGACY_PROGRESS_DIR = path.join(SKILL_DIR, '.hogwarts-progress');
const LEGACY_PROFILE_PATH = path.join(LEGACY_PROGRESS_DIR, 'student-profile.json');

// --- Schema Validation ---

function loadSchema() {
  return JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
}

function validateProgress(data) {
  const schema = loadSchema();
  const errors = [];

  // Validate top-level required fields (settings is optional for backward compat)
  const optionalFields = ['settings'];
  for (const field of schema.required) {
    if (!(field in data) && !optionalFields.includes(field)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate student object
  if (data.student) {
    const s = data.student;
    const validHouses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
    const validHumor = ['mild', 'medium', 'savage', 'unhinged'];
    const validLevels = ['muggle', 'squib', 'halfblood', 'pureblood'];

    if (!s.nickname || typeof s.nickname !== 'string') errors.push('Invalid nickname');
    if (!validHouses.includes(s.house)) errors.push(`Invalid house: ${s.house}`);
    if (!validHumor.includes(s.humor_level)) errors.push(`Invalid humor_level: ${s.humor_level}`);
    if (!validLevels.includes(s.experience_level)) errors.push(`Invalid experience_level: ${s.experience_level}`);
  }

  // Validate progress object
  if (data.progress) {
    const p = data.progress;
    if (typeof p.current_module !== 'number' || p.current_module < 0 || p.current_module > 8) {
      errors.push(`Invalid current_module: ${p.current_module}`);
    }
    if (typeof p.current_lesson !== 'number' || p.current_lesson < 1) {
      errors.push(`Invalid current_lesson: ${p.current_lesson}`);
    }

    // Validate each module entry
    if (p.modules) {
      for (const [key, mod] of Object.entries(p.modules)) {
        const validStatuses = ['not_started', 'in_progress', 'completed'];
        if (!validStatuses.includes(mod.status)) {
          errors.push(`Module ${key}: invalid status "${mod.status}"`);
        }
        if (!Array.isArray(mod.lessons_completed)) {
          errors.push(`Module ${key}: lessons_completed must be an array`);
        }
        if (!mod.quiz || typeof mod.quiz.passed !== 'boolean') {
          errors.push(`Module ${key}: invalid quiz object`);
        }
        if (!mod.exercises || !Array.isArray(mod.exercises.completed)) {
          errors.push(`Module ${key}: invalid exercises object`);
        }
      }
    }
  }

  // Validate house_points
  if (data.house_points) {
    if (typeof data.house_points.total !== 'number' || data.house_points.total < 0) {
      errors.push('Invalid house_points.total');
    }
  }

  return { valid: errors.length === 0, errors };
}

// --- Core Operations ---

function ensureDirectories() {
  if (!fs.existsSync(PROGRESS_DIR)) fs.mkdirSync(PROGRESS_DIR, { recursive: true });
  if (!fs.existsSync(EXERCISES_DIR)) fs.mkdirSync(EXERCISES_DIR, { recursive: true });
}

function migrateIfNeeded() {
  if (!fs.existsSync(PROFILE_PATH) && fs.existsSync(LEGACY_PROFILE_PATH)) {
    ensureDirectories();
    fs.copyFileSync(LEGACY_PROFILE_PATH, PROFILE_PATH);
    // Migrate exercises directory if it exists
    const legacyExercises = path.join(LEGACY_PROGRESS_DIR, 'exercises');
    if (fs.existsSync(legacyExercises)) {
      if (!fs.existsSync(EXERCISES_DIR)) fs.mkdirSync(EXERCISES_DIR, { recursive: true });
      for (const file of fs.readdirSync(legacyExercises)) {
        fs.copyFileSync(path.join(legacyExercises, file), path.join(EXERCISES_DIR, file));
      }
    }
    console.log(`Migrated student data from ${LEGACY_PROGRESS_DIR} to ${PROGRESS_DIR}`);
  }
}

function profileExists() {
  migrateIfNeeded();
  return fs.existsSync(PROFILE_PATH);
}

function loadProgress() {
  if (!profileExists()) return null;
  const raw = fs.readFileSync(PROFILE_PATH, 'utf8');
  return JSON.parse(raw);
}

function saveProgress(data) {
  const validation = validateProgress(data);
  if (!validation.valid) {
    console.error('Validation errors:', validation.errors);
    throw new Error(`Progress data failed validation: ${validation.errors.join(', ')}`);
  }
  ensureDirectories();
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  return true;
}

// --- Student Initialization ---

function createEmptyModules() {
  const modules = {};
  for (let i = 0; i <= 8; i++) {
    modules[String(i)] = {
      status: 'not_started',
      started_at: null,
      completed_at: null,
      lessons_completed: [],
      quiz: { passed: false, attempts: 0, best_score: 0 },
      exercises: { completed: [], skipped: [] }
    };
  }
  return modules;
}

function initializeStudent(nickname, house, humor_level, experience_level) {
  ensureDirectories();
  const now = new Date().toISOString();
  const data = {
    student: {
      nickname,
      house,
      sorting_date: now,
      humor_level,
      experience_level
    },
    progress: {
      current_module: 0,
      current_lesson: 1,
      modules: createEmptyModules()
    },
    settings: {
      play_cached_audio: true,
      dynamic_voice_api: false
    },
    house_points: {
      total: 0,
      breakdown: {
        quiz_correct: 0,
        quiz_perfect: 0,
        exercises: 0,
        module_completion: 0
      }
    },
    achievements: [],
    session_history: [],
    statistics: {
      total_sessions: 0,
      graduation_date: null
    }
  };

  // Mark module 0 as in_progress
  data.progress.modules['0'].status = 'in_progress';
  data.progress.modules['0'].started_at = now;

  saveProgress(data);
  return data;
}

// --- Lesson Tracking ---

function completeLesson(moduleId, lessonId) {
  const data = loadProgress();
  if (!data) throw new Error('No student profile found. Run Sorting Ceremony first.');

  const mod = data.progress.modules[String(moduleId)];
  if (!mod) throw new Error(`Invalid module: ${moduleId}`);

  if (mod.status === 'not_started') {
    mod.status = 'in_progress';
    mod.started_at = new Date().toISOString();
  }

  if (!mod.lessons_completed.includes(lessonId)) {
    mod.lessons_completed.push(lessonId);
    mod.lessons_completed.sort((a, b) => a - b);
  }

  data.progress.current_module = moduleId;
  data.progress.current_lesson = lessonId + 1;

  saveProgress(data);
  return data;
}

// --- Quiz Tracking ---

function recordQuizAttempt(moduleId, score, passed) {
  const data = loadProgress();
  if (!data) throw new Error('No student profile found.');

  const mod = data.progress.modules[String(moduleId)];
  if (!mod) throw new Error(`Invalid module: ${moduleId}`);

  mod.quiz.attempts += 1;
  if (score > mod.quiz.best_score) mod.quiz.best_score = score;

  if (passed && !mod.quiz.passed) {
    mod.quiz.passed = true;
    mod.completed_at = new Date().toISOString();
    mod.status = 'completed';

    // Award house points
    addHousePoints(data, score * 10, 'quiz_correct');

    // First-try bonus
    if (mod.quiz.attempts === 1) {
      addHousePoints(data, 50, 'quiz_perfect');
    }

    // Module completion bonus
    addHousePoints(data, 100, 'module_completion');

    // Unlock next module (except module 8 which unlocks after module 3)
    if (moduleId < 7) {
      const nextMod = data.progress.modules[String(moduleId + 1)];
      if (nextMod && nextMod.status === 'not_started') {
        // Don't auto-start it, just allow it to be started
      }
    }
    // Module 8 unlocks after module 3
    if (moduleId === 3) {
      // Module 8 is now available
    }
  }

  saveProgress(data);
  return data;
}

// --- Exercise Tracking ---

function completeExercise(moduleId, exerciseId) {
  const data = loadProgress();
  if (!data) throw new Error('No student profile found.');

  const mod = data.progress.modules[String(moduleId)];
  if (!mod) throw new Error(`Invalid module: ${moduleId}`);

  if (!mod.exercises.completed.includes(exerciseId)) {
    mod.exercises.completed.push(exerciseId);
    addHousePoints(data, 25, 'exercises');
  }

  saveProgress(data);
  return data;
}

function skipExercise(moduleId, exerciseId) {
  const data = loadProgress();
  if (!data) throw new Error('No student profile found.');

  const mod = data.progress.modules[String(moduleId)];
  if (!mod) throw new Error(`Invalid module: ${moduleId}`);

  if (!mod.exercises.skipped.includes(exerciseId)) {
    mod.exercises.skipped.push(exerciseId);
  }

  saveProgress(data);
  return data;
}

// --- House Points ---

function addHousePoints(data, amount, category) {
  data.house_points.total += amount;
  if (category && data.house_points.breakdown[category] !== undefined) {
    data.house_points.breakdown[category] += amount;
  }

  // Check for milestone achievements
  checkPointMilestones(data);
  return data;
}

function checkPointMilestones(data) {
  const total = data.house_points.total;
  const milestones = [
    { threshold: 100, id: 'prefect' },
    { threshold: 500, id: 'head_of_house' },
    { threshold: 1000, id: 'order_of_merlin' }
  ];

  for (const m of milestones) {
    if (total >= m.threshold && !data.achievements.find(a => a.id === m.id)) {
      data.achievements.push({ id: m.id, unlocked_at: new Date().toISOString() });
    }
  }
}

// --- Achievements ---

function unlockAchievement(achievementId) {
  const data = loadProgress();
  if (!data) throw new Error('No student profile found.');

  if (!data.achievements.find(a => a.id === achievementId)) {
    data.achievements.push({ id: achievementId, unlocked_at: new Date().toISOString() });
    saveProgress(data);
  }

  return data;
}

// --- Session Tracking ---

function recordSession(durationMinutes, modulesTouched) {
  const data = loadProgress();
  if (!data) throw new Error('No student profile found.');

  data.session_history.push({
    date: new Date().toISOString(),
    duration_minutes: durationMinutes,
    modules_touched: modulesTouched
  });
  data.statistics.total_sessions += 1;

  saveProgress(data);
  return data;
}

// --- Progress Summary ---

function getProgressSummary() {
  const data = loadProgress();
  if (!data) return null;

  const { student, progress, house_points, achievements, statistics } = data;

  const completedModules = Object.entries(progress.modules)
    .filter(([, m]) => m.status === 'completed')
    .map(([id]) => parseInt(id));

  const inProgressModules = Object.entries(progress.modules)
    .filter(([, m]) => m.status === 'in_progress')
    .map(([id]) => parseInt(id));

  const totalLessons = Object.values(progress.modules)
    .reduce((sum, m) => sum + m.lessons_completed.length, 0);

  const totalExercises = Object.values(progress.modules)
    .reduce((sum, m) => sum + m.exercises.completed.length, 0);

  // Module unlock check
  const availableModules = [0]; // Module 0 always available
  for (let i = 1; i <= 7; i++) {
    const prev = progress.modules[String(i - 1)];
    if (prev && prev.quiz.passed) availableModules.push(i);
    else break;
  }
  // Module 8 available after module 3
  if (progress.modules['3'] && progress.modules['3'].quiz.passed) {
    availableModules.push(8);
  }

  // Point rank
  let rank = 'First Year';
  if (house_points.total >= 1000) rank = 'Order of Merlin, First Class';
  else if (house_points.total >= 500) rank = 'Head of House';
  else if (house_points.total >= 100) rank = 'Prefect';

  return {
    nickname: student.nickname,
    house: student.house,
    humor_level: student.humor_level,
    experience_level: student.experience_level,
    rank,
    current_module: progress.current_module,
    current_lesson: progress.current_lesson,
    completed_modules: completedModules,
    in_progress_modules: inProgressModules,
    available_modules: availableModules,
    total_lessons_completed: totalLessons,
    total_exercises_completed: totalExercises,
    house_points: house_points.total,
    achievements: achievements.map(a => a.id),
    total_sessions: statistics.total_sessions,
    graduation_date: statistics.graduation_date
  };
}

// --- Graduation ---

function graduate() {
  const data = loadProgress();
  if (!data) throw new Error('No student profile found.');

  data.statistics.graduation_date = new Date().toISOString();
  unlockAchievementDirect(data, 'graduate');
  unlockAchievementDirect(data, 'order_of_merlin_first_class');

  saveProgress(data);
  return data;
}

function unlockAchievementDirect(data, achievementId) {
  if (!data.achievements.find(a => a.id === achievementId)) {
    data.achievements.push({ id: achievementId, unlocked_at: new Date().toISOString() });
  }
}

// --- Audio Hooks ---
// Plays cached audio as a side-effect of progress events.
// This is the RELIABLE path — Claude calls progress commands consistently.

function tryPlayAudio(cacheId) {
  try {
    const voiceScript = require.resolve('./hogwarts-voice.js');
    const { execFile } = require('child_process');
    // Fire and forget — audio plays in the background, never blocks progress
    execFile(process.execPath, [voiceScript, 'play-cached', cacheId], { timeout: 180000 }, () => {});
  } catch (e) {
    // Voice not available — silently continue
  }
}

// --- CLI Interface ---

if (require.main === module) {
  const [,, command, ...args] = process.argv;

  const commands = {
    exists: () => console.log(profileExists()),
    'audio-on': () => {
      // Enable voice globally + in student settings
      try {
        const voiceConfig = JSON.parse(fs.readFileSync(path.join(SKILL_DIR, 'assets', 'voice-config.json'), 'utf8'));
        voiceConfig.enabled = true;
        fs.writeFileSync(path.join(SKILL_DIR, 'assets', 'voice-config.json'), JSON.stringify(voiceConfig, null, 2), 'utf8');
      } catch (e) {}
      const data = loadProgress();
      if (data) {
        if (!data.settings) data.settings = {};
        data.settings.play_cached_audio = true;
        saveProgress(data);
      }
      console.log('Audio ENABLED. Voice narrations will play at key moments.');
    },
    'audio-off': () => {
      // Disable voice globally + in student settings
      try {
        const voiceConfig = JSON.parse(fs.readFileSync(path.join(SKILL_DIR, 'assets', 'voice-config.json'), 'utf8'));
        voiceConfig.enabled = false;
        fs.writeFileSync(path.join(SKILL_DIR, 'assets', 'voice-config.json'), JSON.stringify(voiceConfig, null, 2), 'utf8');
      } catch (e) {}
      const data = loadProgress();
      if (data) {
        if (!data.settings) data.settings = {};
        data.settings.play_cached_audio = false;
        saveProgress(data);
      }
      console.log('Audio DISABLED. All narrations will be silent.');
    },
    'audio-status': () => {
      let voiceEnabled = false;
      try {
        const voiceConfig = JSON.parse(fs.readFileSync(path.join(SKILL_DIR, 'assets', 'voice-config.json'), 'utf8'));
        voiceEnabled = voiceConfig.enabled === true;
      } catch (e) {}
      const data = loadProgress();
      const cachedAudio = data?.settings?.play_cached_audio !== false;
      const dynamicApi = data?.settings?.dynamic_voice_api === true;
      console.log(JSON.stringify({ voice_enabled: voiceEnabled, play_cached_audio: cachedAudio, dynamic_voice_api: dynamicApi }));
    },
    'voice-settings': () => {
      const data = loadProgress();
      if (!data) { console.error('No student profile found.'); process.exit(1); }
      if (!data.settings) data.settings = {};
      const s = data.settings;
      console.log('Voice Settings:');
      console.log(`  play_cached_audio: ${s.play_cached_audio !== false} (pre-cached MP3 files)`);
      console.log(`  dynamic_voice_api: ${s.dynamic_voice_api === true} (live API for dynamic text)`);
      console.log('');
      console.log('Toggle with: node hogwarts-progress.js voice-set <setting> <true|false>');
    },
    'voice-set': () => {
      const [setting, value] = args;
      if (!setting || !['play_cached_audio', 'dynamic_voice_api'].includes(setting)) {
        console.error('Usage: node hogwarts-progress.js voice-set <play_cached_audio|dynamic_voice_api> <true|false>');
        process.exit(1);
      }
      const data = loadProgress();
      if (!data) { console.error('No student profile found.'); process.exit(1); }
      if (!data.settings) data.settings = {};
      data.settings[setting] = value === 'true';
      saveProgress(data);
      console.log(`${setting} set to ${data.settings[setting]}`);
    },
    load: () => console.log(JSON.stringify(loadProgress(), null, 2)),
    summary: () => console.log(JSON.stringify(getProgressSummary(), null, 2)),
    init: () => {
      const [nickname, house, humor, level] = args;
      if (!nickname || !house) {
        console.error('Usage: node hogwarts-progress.js init <nickname> <house> <humor> <level>');
        process.exit(1);
      }
      const data = initializeStudent(nickname, house, humor || 'medium', level || 'muggle');
      console.log(JSON.stringify(data, null, 2));
      // Auto-play house reveal audio
      const houseLower = house.toLowerCase();
      tryPlayAudio(`house_speech_${houseLower}`);
    },
    lesson: () => {
      const [moduleId, lessonId] = args.map(Number);
      const data = completeLesson(moduleId, lessonId);
      console.log(`Lesson ${lessonId} of Module ${moduleId} completed.`);
    },
    quiz: () => {
      const [moduleId, score, passed] = args;
      const data = recordQuizAttempt(Number(moduleId), Number(score), passed === 'true');
      console.log(`Quiz recorded: Module ${moduleId}, Score ${score}, Passed: ${passed}`);
      // Auto-play quiz result audio
      if (passed === 'true') {
        tryPlayAudio('quiz_pass');
        // Slight delay then play module_complete
        setTimeout(() => tryPlayAudio('module_complete'), 3000);
      } else {
        tryPlayAudio('quiz_fail');
      }
    },
    exercise: () => {
      const [moduleId, exerciseId] = args;
      const data = completeExercise(Number(moduleId), exerciseId);
      console.log(`Exercise ${exerciseId} of Module ${moduleId} completed.`);
    },
    points: () => {
      const [amount, category] = args;
      const data = loadProgress();
      addHousePoints(data, Number(amount), category);
      saveProgress(data);
      console.log(`Added ${amount} points (${category}). Total: ${data.house_points.total}`);
    },
    play: () => {
      const [cacheId] = args;
      if (!cacheId) {
        console.error('Usage: node hogwarts-progress.js play <cache_id>');
        process.exit(1);
      }
      // Synchronous play — blocks until audio finishes
      try {
        const { execFileSync } = require('child_process');
        const voiceScript = require.resolve('./hogwarts-voice.js');
        execFileSync(process.execPath, [voiceScript, 'play-cached', cacheId], {
          stdio: 'inherit',
          timeout: 180000
        });
      } catch (e) {
        // Voice not available — silently continue
        console.log(JSON.stringify({ skipped: true, reason: e.message }));
      }
    },
    achieve: () => {
      const [id] = args;
      unlockAchievement(id);
      console.log(`Achievement unlocked: ${id}`);
    },
    graduate: () => {
      const data = graduate();
      console.log('Graduated! Congratulations!');
      tryPlayAudio('graduation_intro');
      setTimeout(() => tryPlayAudio('graduation_award'), 5000);
    }
  };

  if (!command || !commands[command]) {
    console.log('Hogwarts Progress Manager');
    console.log('Commands: exists, load, summary, init, lesson, quiz, exercise, points, achieve, play, graduate, audio-on, audio-off, audio-status, voice-settings, voice-set');
    process.exit(0);
  }

  commands[command]();
}

module.exports = {
  profileExists,
  loadProgress,
  saveProgress,
  initializeStudent,
  completeLesson,
  recordQuizAttempt,
  completeExercise,
  skipExercise,
  addHousePoints,
  unlockAchievement,
  recordSession,
  getProgressSummary,
  graduate,
  PROGRESS_DIR,
  PROFILE_PATH,
  EXERCISES_DIR
};
