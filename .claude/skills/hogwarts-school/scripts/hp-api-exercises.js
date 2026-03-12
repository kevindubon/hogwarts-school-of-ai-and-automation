// Author: Kevin Dubon
// Hogwarts School of AI and Automation - HP-API Exercise Helper
// Provides fetch utilities and exercise validation for HP-API exercises

const BASE_URL = 'https://hp-api.onrender.com';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

// --- Fetch Utilities ---

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      if (attempt === retries) {
        console.error(`Failed after ${retries} attempts: ${error.message}`);
        console.error('Tip: The HP-API runs on free tier and may need a cold start. Try again in 30-60 seconds.');
        throw error;
      }
      console.log(`Attempt ${attempt} failed. Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

async function fetchAllCharacters() {
  return fetchWithRetry(`${BASE_URL}/api/characters`);
}

async function fetchCharactersByHouse(house) {
  const validHouses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
  const normalized = house.toLowerCase();
  if (!validHouses.includes(normalized)) {
    throw new Error(`Invalid house: "${house}". Must be one of: ${validHouses.join(', ')}`);
  }
  return fetchWithRetry(`${BASE_URL}/api/characters/house/${normalized}`);
}

async function fetchStudents() {
  return fetchWithRetry(`${BASE_URL}/api/characters/students`);
}

async function fetchStaff() {
  return fetchWithRetry(`${BASE_URL}/api/characters/staff`);
}

async function fetchAllSpells() {
  return fetchWithRetry(`${BASE_URL}/api/spells`);
}

async function fetchCharacterById(id) {
  const data = await fetchWithRetry(`${BASE_URL}/api/character/${id}`);
  return Array.isArray(data) ? data[0] : data;
}

// --- Exercise Validators ---

const VALIDATORS = {
  // Module 3: Count characters in a house
  'm3_count_house': (result, expected) => {
    if (typeof result !== 'number') return { valid: false, message: 'Result should be a number (the count of characters).' };
    // Allow some variance since API data can change
    if (Math.abs(result - expected) <= 5) return { valid: true, message: `Correct! The count is approximately ${expected}.` };
    return { valid: false, message: `Not quite. Expected around ${expected}, got ${result}. Double-check your fetch and count logic.` };
  },

  // Module 3: Alive vs dead count
  'm3_alive_dead': (result) => {
    if (!result || typeof result.alive !== 'number' || typeof result.dead !== 'number') {
      return { valid: false, message: 'Result should be an object with "alive" and "dead" number properties.' };
    }
    if (result.alive > 0 && result.dead > 0) {
      return { valid: true, message: `Nice work! Found ${result.alive} alive and ${result.dead} dead. The wizarding world is brutal.` };
    }
    return { valid: false, message: 'Both alive and dead counts should be greater than 0. Check your filter logic.' };
  },

  // Module 3: Filter spells by keyword
  'm3_spell_filter': (result, keyword) => {
    if (!Array.isArray(result)) return { valid: false, message: 'Result should be an array of spells.' };
    if (result.length === 0) return { valid: false, message: `No spells found for "${keyword}". Try a broader search term.` };
    const allMatch = result.every(s =>
      (s.name && s.name.toLowerCase().includes(keyword.toLowerCase())) ||
      (s.description && s.description.toLowerCase().includes(keyword.toLowerCase()))
    );
    if (allMatch) return { valid: true, message: `Found ${result.length} spells matching "${keyword}". Well done!` };
    return { valid: false, message: 'Some results don\'t match the keyword. Check your filter condition.' };
  },

  // Module 3: Extract wand data
  'm3_wand_data': (result) => {
    if (!Array.isArray(result)) return { valid: false, message: 'Result should be an array of wand objects.' };
    if (result.length === 0) return { valid: false, message: 'No wands found. Make sure you\'re filtering out empty wand data.' };
    const hasStructure = result.every(w => w.name && w.wand && typeof w.wand === 'object');
    if (hasStructure) return { valid: true, message: `Extracted ${result.length} wands. Ollivander would be impressed!` };
    return { valid: false, message: 'Each item should have "name" and "wand" properties. Check your map function.' };
  },

  // Module 3: House comparison report
  'm3_house_report': (result) => {
    if (!result || typeof result !== 'object') return { valid: false, message: 'Result should be an object with house names as keys.' };
    const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
    const hasAllHouses = houses.every(h => result[h] || result[h.charAt(0).toUpperCase() + h.slice(1)]);
    if (!hasAllHouses) return { valid: false, message: 'Report should include all four houses.' };
    return { valid: true, message: 'Complete house report! The Hogwarts Board of Governors approves.' };
  },

  // Module 7: Full automation validation
  'm7_automation': (result) => {
    if (!result) return { valid: false, message: 'No result provided.' };
    const checks = {
      fetched_data: !!result.data,
      transformed: !!result.transformed,
      saved: !!result.saved,
      reported: !!result.report
    };
    const passed = Object.values(checks).filter(Boolean).length;
    if (passed === 4) return { valid: true, message: 'OUTSTANDING! Full automation pipeline working. You are ready for graduation!' };
    const missing = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    return { valid: false, message: `${passed}/4 steps complete. Missing: ${missing.join(', ')}. Keep going!` };
  }
};

function validateExerciseResult(exerciseId, result, extra) {
  const validator = VALIDATORS[exerciseId];
  if (!validator) return { valid: true, message: 'Exercise recorded. (No automated validation for this exercise.)' };
  return validator(result, extra);
}

// --- CLI Interface ---

async function main() {
  const [,, command, ...args] = process.argv;

  const commands = {
    characters: async () => {
      const data = await fetchAllCharacters();
      console.log(`Total characters: ${data.length}`);
      console.log('First 5:', data.slice(0, 5).map(c => c.name));
    },
    house: async () => {
      const [house] = args;
      if (!house) { console.error('Usage: node hp-api-exercises.js house <house>'); return; }
      const data = await fetchCharactersByHouse(house);
      console.log(`${house} characters: ${data.length}`);
      console.log('Names:', data.map(c => c.name).join(', '));
    },
    students: async () => {
      const data = await fetchStudents();
      console.log(`Total students: ${data.length}`);
    },
    spells: async () => {
      const data = await fetchAllSpells();
      console.log(`Total spells: ${data.length}`);
      console.log('Sample:', data.slice(0, 5).map(s => `${s.name}: ${s.description}`));
    },
    validate: async () => {
      const [exerciseId, resultJson, extraJson] = args;
      if (!exerciseId) { console.error('Usage: node hp-api-exercises.js validate <exerciseId> <resultJson> [extraJson]'); return; }
      const result = JSON.parse(resultJson);
      const extra = extraJson ? JSON.parse(extraJson) : undefined;
      console.log(JSON.stringify(validateExerciseResult(exerciseId, result, extra), null, 2));
    },
    test: async () => {
      console.log('Testing HP-API connectivity...');
      try {
        const chars = await fetchAllCharacters();
        console.log(`Characters endpoint: OK (${chars.length} characters)`);
        const spells = await fetchAllSpells();
        console.log(`Spells endpoint: OK (${spells.length} spells)`);
        const gryf = await fetchCharactersByHouse('gryffindor');
        console.log(`House endpoint: OK (${gryf.length} Gryffindors)`);
        console.log('\nAll endpoints working! The owls are flying.');
      } catch (e) {
        console.error('API test failed:', e.message);
        console.log('\nThe API may be cold-starting. Try again in 60 seconds.');
      }
    }
  };

  if (!command || !commands[command]) {
    console.log('HP-API Exercise Helper');
    console.log('Commands: characters, house <name>, students, spells, validate <id> <json>, test');
    return;
  }

  await commands[command]();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  fetchAllCharacters,
  fetchCharactersByHouse,
  fetchStudents,
  fetchStaff,
  fetchAllSpells,
  fetchCharacterById,
  validateExerciseResult,
  BASE_URL
};
