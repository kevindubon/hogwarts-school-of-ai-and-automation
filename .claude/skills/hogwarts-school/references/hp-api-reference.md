# HP-API Reference Guide
<!-- Author: Kevin Dubon -->

## Overview

The HP-API is a free, open-source Harry Potter API with no authentication required. It serves as the live data source for Module 3 exercises and is referenced throughout the course.

**Base URL:** `https://hp-api.onrender.com`

> **Note:** This API runs on Render's free tier. Cold starts may take 30-60 seconds. If a request times out, wait and retry. The cached sample data below can be used as fallback for offline exercises.

---

## Endpoints

### GET /api/characters
Returns all 403 characters from the Harry Potter universe.

**Response:** Array of character objects

### GET /api/characters/house/:house
Returns characters filtered by Hogwarts house.

**Valid houses:** `gryffindor`, `slytherin`, `ravenclaw`, `hufflepuff` (lowercase)

### GET /api/characters/students
Returns all Hogwarts students.

### GET /api/characters/staff
Returns all Hogwarts staff members.

### GET /api/spells
Returns all 77 spells.

### GET /api/character/:id
Returns a single character by ID.

---

## Character Object Schema

```json
{
  "id": "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
  "name": "Harry Potter",
  "alternate_names": ["The Boy Who Lived", "The Chosen One"],
  "species": "human",
  "gender": "male",
  "house": "Gryffindor",
  "dateOfBirth": "31-07-1980",
  "yearOfBirth": 1980,
  "wizard": true,
  "ancestry": "half-blood",
  "eyeColour": "green",
  "hairColour": "black",
  "wand": {
    "wood": "holly",
    "core": "phoenix feather",
    "length": 11
  },
  "patronus": "stag",
  "hogwartsStudent": true,
  "hogwartsStaff": false,
  "actor": "Daniel Radcliffe",
  "alternate_actors": [],
  "alive": true,
  "image": "https://ik.imagekit.io/hpapi/harry.jpg"
}
```

### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | UUID identifier |
| `name` | string | Character name |
| `alternate_names` | string[] | Other names/titles |
| `species` | string | human, half-giant, werewolf, ghost, etc. |
| `gender` | string | male, female |
| `house` | string | Gryffindor, Slytherin, Ravenclaw, Hufflepuff, or "" |
| `dateOfBirth` | string | DD-MM-YYYY format or "" |
| `yearOfBirth` | number | Year or null |
| `wizard` | boolean | Is a wizard/witch |
| `ancestry` | string | pure-blood, half-blood, muggle-born, squib, etc. |
| `eyeColour` | string | Eye color or "" |
| `hairColour` | string | Hair color or "" |
| `wand` | object | { wood, core, length } or empty fields |
| `patronus` | string | Patronus animal or "" |
| `hogwartsStudent` | boolean | Current student |
| `hogwartsStaff` | boolean | Current staff |
| `actor` | string | Film actor name |
| `alive` | boolean | Currently alive |
| `image` | string | Image URL or "" |

---

## Spell Object Schema

```json
{
  "id": "c76a2922-ba4c-4278-baab-44defb631236",
  "name": "Expelliarmus",
  "description": "Disarming Charm"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | UUID identifier |
| `name` | string | Spell name |
| `description` | string | What the spell does |

---

## Cached Sample Data (Offline Fallback)

### Sample Characters (5 per house)

#### Gryffindor
```json
[
  {"name": "Harry Potter", "species": "human", "ancestry": "half-blood", "patronus": "stag", "alive": true, "wand": {"wood": "holly", "core": "phoenix feather", "length": 11}},
  {"name": "Hermione Granger", "species": "human", "ancestry": "muggle-born", "patronus": "otter", "alive": true, "wand": {"wood": "vine", "core": "dragon heartstring", "length": 10.75}},
  {"name": "Ron Weasley", "species": "human", "ancestry": "pure-blood", "patronus": "Jack Russell terrier", "alive": true, "wand": {"wood": "willow", "core": "unicorn tail-hair", "length": 14}},
  {"name": "Neville Longbottom", "species": "human", "ancestry": "pure-blood", "patronus": "", "alive": true, "wand": {"wood": "cherry", "core": "unicorn tail-hair", "length": 13}},
  {"name": "Ginny Weasley", "species": "human", "ancestry": "pure-blood", "patronus": "horse", "alive": true, "wand": {"wood": "", "core": "", "length": null}}
]
```

#### Slytherin
```json
[
  {"name": "Draco Malfoy", "species": "human", "ancestry": "pure-blood", "patronus": "", "alive": true, "wand": {"wood": "hawthorn", "core": "unicorn tail-hair", "length": 10}},
  {"name": "Severus Snape", "species": "human", "ancestry": "half-blood", "patronus": "doe", "alive": false, "wand": {"wood": "", "core": "", "length": null}},
  {"name": "Tom Riddle", "species": "human", "ancestry": "half-blood", "patronus": "", "alive": false, "wand": {"wood": "yew", "core": "phoenix feather", "length": 13.5}},
  {"name": "Bellatrix Lestrange", "species": "human", "ancestry": "pure-blood", "patronus": "", "alive": false, "wand": {"wood": "walnut", "core": "dragon heartstring", "length": 12.75}},
  {"name": "Horace Slughorn", "species": "human", "ancestry": "pure-blood", "patronus": "", "alive": true, "wand": {"wood": "cedar", "core": "dragon heartstring", "length": 10.25}}
]
```

#### Ravenclaw
```json
[
  {"name": "Luna Lovegood", "species": "human", "ancestry": "", "patronus": "hare", "alive": true, "wand": {"wood": "", "core": "", "length": null}},
  {"name": "Cho Chang", "species": "human", "ancestry": "", "patronus": "swan", "alive": true, "wand": {"wood": "", "core": "", "length": null}},
  {"name": "Filius Flitwick", "species": "human", "ancestry": "", "patronus": "", "alive": true, "wand": {"wood": "", "core": "", "length": null}},
  {"name": "Sybill Trelawney", "species": "human", "ancestry": "half-blood", "patronus": "", "alive": true, "wand": {"wood": "hazel", "core": "unicorn tail-hair", "length": 9.5}},
  {"name": "Gilderoy Lockhart", "species": "human", "ancestry": "half-blood", "patronus": "", "alive": true, "wand": {"wood": "cherry", "core": "dragon heartstring", "length": 9}}
]
```

#### Hufflepuff
```json
[
  {"name": "Cedric Diggory", "species": "human", "ancestry": "", "patronus": "", "alive": false, "wand": {"wood": "ash", "core": "unicorn tail-hair", "length": 12.25}},
  {"name": "Nymphadora Tonks", "species": "human", "ancestry": "half-blood", "patronus": "wolf", "alive": false, "wand": {"wood": "", "core": "", "length": null}},
  {"name": "Pomona Sprout", "species": "human", "ancestry": "", "patronus": "", "alive": true, "wand": {"wood": "", "core": "", "length": null}},
  {"name": "Newton Scamander", "species": "human", "ancestry": "", "patronus": "", "alive": true, "wand": {"wood": "", "core": "", "length": null}},
  {"name": "Hannah Abbott", "species": "human", "ancestry": "half-blood", "patronus": "", "alive": true, "wand": {"wood": "", "core": "", "length": null}}
]
```

### Sample Spells (10)
```json
[
  {"name": "Expelliarmus", "description": "Disarming Charm"},
  {"name": "Lumos", "description": "Creates a narrow beam of light from the wand tip"},
  {"name": "Expecto Patronum", "description": "Conjures a Patronus"},
  {"name": "Accio", "description": "Summoning Charm"},
  {"name": "Wingardium Leviosa", "description": "Levitation Charm"},
  {"name": "Stupefy", "description": "Stunning Spell"},
  {"name": "Protego", "description": "Shield Charm"},
  {"name": "Obliviate", "description": "Memory Charm"},
  {"name": "Avada Kedavra", "description": "The Killing Curse"},
  {"name": "Crucio", "description": "Torture Curse"}
]
```

---

## Common Exercise Patterns

### Fetch and Count
```bash
# Fetch all characters from a house, count them
curl -s https://hp-api.onrender.com/api/characters/house/gryffindor | node -e "
  const data = require('fs').readFileSync('/dev/stdin','utf8');
  const chars = JSON.parse(data);
  console.log('Total Gryffindors:', chars.length);
"
```

### Filter by Property
```javascript
// Fetch characters and filter alive ones
const response = await fetch('https://hp-api.onrender.com/api/characters/house/slytherin');
const characters = await response.json();
const alive = characters.filter(c => c.alive);
const dead = characters.filter(c => !c.alive);
console.log(`Alive: ${alive.length}, Dead: ${dead.length}`);
```

### Extract Wand Data
```javascript
// Get all wand woods used by a house
const response = await fetch('https://hp-api.onrender.com/api/characters/house/ravenclaw');
const characters = await response.json();
const wands = characters
  .filter(c => c.wand && c.wand.wood)
  .map(c => ({ name: c.name, wand: c.wand }));
console.log(JSON.stringify(wands, null, 2));
```

### Spell Search
```javascript
// Find spells containing a keyword
const response = await fetch('https://hp-api.onrender.com/api/spells');
const spells = await response.json();
const charm = spells.filter(s => s.description.toLowerCase().includes('charm'));
console.log(`Found ${charm.length} charms:`, charm.map(s => s.name));
```

### Aggregation Report
```javascript
// Build a house comparison report
const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
const report = {};
for (const house of houses) {
  const res = await fetch(`https://hp-api.onrender.com/api/characters/house/${house}`);
  const chars = await res.json();
  report[house] = {
    total: chars.length,
    alive: chars.filter(c => c.alive).length,
    dead: chars.filter(c => !c.alive).length,
    wizards: chars.filter(c => c.wizard).length,
    with_patronus: chars.filter(c => c.patronus).length
  };
}
console.table(report);
```

---

## Rate Limits & Best Practices

- **No authentication required** -- completely open
- **No official rate limits** -- but be respectful (free tier)
- **Cold start delay** -- first request after inactivity may take 30-60 seconds
- **Retry on timeout** -- if you get a timeout, wait 10 seconds and try again
- **Cache results** -- for exercises, fetch once and work with the cached data
- **Fallback data** -- use the sample data above if the API is down
