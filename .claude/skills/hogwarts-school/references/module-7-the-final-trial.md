<!-- Author: Kevin Dubon -->

# Module 7: The Final Trial — Building Your First Automation

> *"The third task is very straightforward. The Triwizard Cup will be placed inside the maze. The first champion to touch the Cup will receive full marks."*
> — Ludo Bagman, who vastly underestimated maze difficulty

---

## Module Overview

**Theme:** The Triwizard Tournament's Final Task — The Maze
**Tone:** EPIC. This is the climax of the entire course. Dramatic stakes, triumphant payoffs.
**Prerequisite:** Module 6 quiz passed

This is it. Everything the student has learned — automation fundamentals, data structures, APIs, workspace setup, MCPs, and Claude Skills — converges here. They will build a complete, end-to-end automation from scratch and package it as a reusable Claude Skill.

**The Project:** The Hogwarts House Report Generator
- Fetch live character data from the HP-API for all four houses
- Transform raw data into meaningful statistics
- Save results to structured files
- Generate a formatted markdown report
- Package the entire pipeline as a Claude Skill

**Lessons build sequentially:**
- Lesson 2's output feeds into Lesson 3
- Lesson 3's output feeds into Lesson 4
- Lesson 5 wraps everything together

**By the end of this module, the student will have built something REAL. Not a toy exercise. Not a guided walkthrough. A complete automation they designed, coded, tested, and packaged themselves.**

---

## Lesson 1: Planning Your Automation (Studying the Maze)

**Exercise ID:** `m7_planning`
**Exercise Type:** DO (25 points)

### HOOK

*The night before the third task, the smart champions didn't sleep. They studied. Cedric Diggory reviewed every defensive spell he knew. Fleur Delacour mapped out contingency plans. Viktor Krum practiced obstacle-clearing hexes until his wand arm ached.*

*And Harry? Harry had a plan too — mostly "run forward and hope for the best."*

*We're going to be more like Cedric than Harry on this one. (Sorry, Harry. Love you. But your planning skills are objectively terrible.)*

*Before you write a single line of code, you need to know EXACTLY what you're building, what goes in, what comes out, and how the pieces connect. Every great automation starts not with code — but with a plan.*

### TEACH

**Why planning matters more than coding:**

Think about every failed potion Neville ever brewed. Was the problem that he couldn't stir a cauldron? No. The problem was that he skipped steps, misread the recipe, or didn't understand what the potion was supposed to DO before he started throwing ingredients in.

Automation is the same. The number one reason automations fail isn't bad code — it's bad planning. Building the wrong thing perfectly is still building the wrong thing.

**The four questions every automation must answer:**

**1. What problem are you solving?**
This is your "Why." If you can't explain the problem in one sentence, you don't understand it yet. Dumbledore didn't say "We need a complex multi-phase competitive assessment framework." He said "Three tasks. Survive them." Clear problem, clear goal.

**2. What goes in? (Inputs)**
Every automation consumes something — an API response, a file, a user input, a webhook trigger. Define your inputs precisely. What format? What structure? What happens if the input is missing or malformed? This is your "Potion Ingredients List." Miss one ingredient and the cauldron explodes.

**3. What comes out? (Outputs)**
What does success look like? A file on disk? A message sent? A database updated? A report generated? Define the EXACT output. Not "a report" — but "a markdown file with a table showing per-house statistics including total characters, alive/dead counts, patronus percentages, and wand length averages."

**4. What components do you need? (Architecture)**
Break the automation into discrete steps. Each step should do ONE thing well. This is the Modular Magic principle from Module 6 — small, composable pieces that connect into a pipeline.

**The Pipeline Pattern:**

Most automations follow a simple pattern:

```
FETCH → TRANSFORM → SAVE → REPORT
```

- **FETCH:** Get the raw data from somewhere (API, file, database)
- **TRANSFORM:** Clean it, reshape it, compute derived values
- **SAVE:** Persist the results somewhere durable
- **REPORT:** Present the results in a human-readable format

This pattern works for 80% of automations. Learn it. Love it. Tattoo it on your wand arm if you have to.

### SHOW

Here's what a planning document looks like for our project:

```markdown
# Hogwarts House Report Generator — Automation Plan

## Problem Statement
We need a way to quickly generate a comparative analysis of all
four Hogwarts houses based on live character data. Currently this
would require manually visiting the API, copying data, and doing
math by hand. Unacceptable. We have magic.

## Inputs
- HP-API endpoints: /api/characters/house/{house}
- Four houses: gryffindor, slytherin, ravenclaw, hufflepuff
- No authentication required
- Data format: JSON arrays of character objects

## Outputs
1. JSON file: Raw statistics per house (machine-readable)
2. Markdown file: Formatted report with tables (human-readable)

## Pipeline Architecture
┌─────────┐    ┌─────────────┐    ┌──────┐    ┌────────┐
│  FETCH   │───>│  TRANSFORM   │───>│ SAVE  │───>│ REPORT │
│ (API x4) │    │ (Statistics) │    │(JSON) │    │  (MD)  │
└─────────┘    └─────────────┘    └──────┘    └────────┘

## Statistics to Compute (per house)
- total_characters: count of all characters
- alive_count: characters where alive === true
- dead_count: characters where alive === false
- has_patronus: characters with non-empty patronus
- patronus_pct: percentage with patronus
- avg_wand_length: average of wand.length (excluding null)
- most_common_ancestry: mode of ancestry field
- notable_members: top 3 characters (by name recognition)

## Error Handling
- API timeout: retry up to 3 times with 5s delay
- Empty response: log warning, use empty array
- Missing fields: use sensible defaults (null, 0, "unknown")

## File Outputs
- ./hp-house-report/data/house-statistics.json
- ./hp-house-report/reports/house-report.md
```

### TRY

<!-- VOICE: cache_id="exercise_intro" -->
**Exercise: Plan Your Automation (DO — 25 points)**

Your turn. Before we write ANY code, you need to create your own planning document for the Hogwarts House Report Generator. You can use the template above as a starting point, but make it YOURS.

Your plan must include:
1. **Problem statement** — one clear sentence about what this automation does
2. **Inputs** — what data sources, what format, what could go wrong
3. **Outputs** — exactly what files you'll produce and what they'll contain
4. **Pipeline steps** — the sequence of operations from fetch to report
5. **Statistics list** — at minimum: total characters, alive/dead, has_patronus, average wand length, most common ancestry
6. **Error handling** — what happens when things go wrong

Write this as a markdown document or just share it in chat. I want to see YOUR thinking before we start coding.

*Do NOT skip this. I know it's tempting to jump straight to code. But champions who studied the maze beforehand performed better. Every. Single. Time.*

**Completion criteria:** Plan includes all 6 required sections with specific, concrete details (not vague hand-waving).

### CHECKPOINT

Quick check before we enter the maze:

*"What is the FIRST thing you should do before building any automation?"*

(a) Write the code and figure it out as you go
(b) Define what problem you're solving and what the inputs/outputs are
(c) Pick a programming language
(d) Ask Dobby to do it

The answer is (b). Always. Harry would pick (a), and that's why Harry spent seven books nearly dying. Don't be Harry. Be Hermione — she'd have a color-coded plan with footnotes.

---

## Lesson 2: Fetch & Extract (The First Challenge)

**Exercise ID:** `m7_fetch`
**Exercise Type:** BUILD (35 points)

### HOOK

*The maze entrance looms before you. The hedges are twenty feet tall and alive — they shift and close behind you. There's no going back.*

*The first challenge in any automation maze is the same: GET THE DATA. It sounds simple. It is not. APIs time out. Responses come back malformed. Rate limits slam the door in your face. Servers go cold and take 60 seconds to wake up.*

*Your job in this lesson? Get past these obstacles. Reach into the maze and pull out the raw data — all four houses, all their characters. Miss one house and your report is incomplete. Get bad data and everything downstream is poisoned.*

*Wand at the ready. Let's go.*

### TEACH

**Fetching data is deceptively complex.**

When Hagrid says "follow the spiders," it sounds straightforward. But then you're in the Forbidden Forest surrounded by Acromantulas the size of cars. API fetching is the same — the concept is simple, but the reality is full of hairy eight-legged problems.

**The three enemies of reliable data fetching:**

**1. Network Failures**
The HP-API runs on Render's free tier. Cold starts can take 30-60 seconds. If you just fire off a `fetch()` and hope for the best, you'll get timeouts. You need RETRY LOGIC — the Protego of API calls. Try, fail, wait, try again.

**2. Bad Responses**
Even when the API responds, it might give you garbage. A 500 error. An HTML error page instead of JSON. An empty array when you expected data. You need to VALIDATE what comes back before trusting it.

**3. Sequential vs. Parallel**
You need data for four houses. Do you fetch them one at a time (sequential) or all at once (parallel)? Sequential is safer but slower. Parallel is faster but can overwhelm the API. The right answer depends on the API — for HP-API, parallel with `Promise.all` is fine.

**The Fetch Pattern:**

```
For each data source:
  1. Make the request
  2. Check if the response is valid
  3. If not, retry (up to N times)
  4. If still failing, handle the error gracefully
  5. Extract the relevant fields
  6. Return clean data
```

**Extracting relevant fields:**

The HP-API character objects have 15+ fields. You don't need all of them. Grabbing everything is like buying the entire Weasleys' Wizard Wheezes shop when you just need a Decoy Detonator. Extract only what your transform layer needs.

### SHOW

Here's a robust fetch function with retry logic and field extraction:

```javascript
// fetch-houses.js
// Fetches character data for all four Hogwarts houses from HP-API

const BASE_URL = 'https://hp-api.onrender.com';
const HOUSES = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Response is not an array');
      }
      return data;
    } catch (error) {
      console.error(`  Attempt ${attempt}/${retries} failed: ${error.message}`);
      if (attempt === retries) throw error;
      console.log(`  Retrying in ${RETRY_DELAY / 1000}s...`);
      await new Promise(r => setTimeout(r, RETRY_DELAY));
    }
  }
}

function extractFields(character) {
  return {
    name: character.name || 'Unknown',
    alive: character.alive ?? null,
    ancestry: character.ancestry || '',
    patronus: character.patronus || '',
    wand_length: character.wand?.length ?? null,
    wand_wood: character.wand?.wood || '',
    wand_core: character.wand?.core || '',
    hogwartsStudent: character.hogwartsStudent ?? false,
    hogwartsStaff: character.hogwartsStaff ?? false,
    species: character.species || 'unknown',
  };
}

async function fetchAllHouses() {
  console.log('Fetching character data for all houses...\n');
  const results = {};

  // Fetch all houses in parallel
  const promises = HOUSES.map(async (house) => {
    console.log(`Fetching ${house}...`);
    const raw = await fetchWithRetry(
      `${BASE_URL}/api/characters/house/${house}`
    );
    const extracted = raw.map(extractFields);
    console.log(`  ${house}: ${extracted.length} characters fetched`);
    return { house, characters: extracted };
  });

  const houseData = await Promise.all(promises);

  for (const { house, characters } of houseData) {
    results[house] = characters;
  }

  console.log('\nFetch complete!');
  return results;
}

// Run if executed directly
fetchAllHouses()
  .then(data => {
    console.log('\n--- Summary ---');
    for (const [house, chars] of Object.entries(data)) {
      console.log(`${house}: ${chars.length} characters`);
    }
    // Output the full data as JSON (for piping to next step)
    console.log('\n--- DATA OUTPUT ---');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('FATAL: Could not fetch house data:', err.message);
    process.exit(1);
  });
```

Key things to notice:
- **Retry logic** wraps every request — no single failure kills the pipeline
- **Field extraction** strips each character to ONLY the fields we need downstream
- **Parallel fetching** with `Promise.all` — all four houses load simultaneously
- **Error propagation** — if all retries fail, the error bubbles up clearly
- **Clean output** — JSON to stdout so the next step can consume it

### TRY

<!-- VOICE: cache_id="cameo_hagrid" -->
<!-- VOICE: cache_id="exercise_intro" -->
**Exercise: Build the Fetch Layer (BUILD — 35 points)**

Write a script called `fetch-houses.js` that:

1. **Fetches character data** from the HP-API for all four houses (`gryffindor`, `slytherin`, `ravenclaw`, `hufflepuff`)
2. **Implements retry logic** — at least 2 retries with a delay between attempts
3. **Validates responses** — check that you got an array back, handle non-200 status codes
4. **Extracts relevant fields** from each character. At minimum extract: `name`, `alive`, `ancestry`, `patronus`, `wand_length` (from `wand.length`)
5. **Returns a data structure** where each house maps to its array of extracted characters

**Requirements:**
- The script must handle the API being slow (cold start) without crashing
- The script must log what it's doing (which house it's fetching, how many characters returned)
- The script must output the final data structure as JSON

**How to test it:**
```bash
node fetch-houses.js
```

You should see output showing all four houses with character counts, followed by the JSON data.

**Do NOT copy the SHOW example verbatim.** Use it as inspiration, but write your own version. Change the structure, add your own touches, handle an edge case I didn't mention. Make it yours.

*This is the first real challenge of the maze. The hedges are watching. Show them what you've got.*

**Completion criteria:** Script successfully fetches all four houses with retry logic, extracts fields, and outputs valid JSON.

### CHECKPOINT

*"Why do we extract only the fields we need instead of keeping the entire API response?"*

(a) To save disk space
(b) Because downstream steps only need specific fields, and extra data adds complexity and confusion
(c) The API charges per field
(d) It makes the JSON look prettier

The answer is (b). Lean data flows are clean data flows. Every extra field is a potential source of bugs in your transform logic. Extract what you need. Leave the rest.

---

## Lesson 3: Transform & Enrich (The Second Challenge)

**Exercise ID:** `m7_transform`
**Exercise Type:** BUILD (35 points)

### HOOK

*You've gotten past the first obstacle. The raw data is in your hands — four arrays of character objects, freshly plucked from the API like mandrakes from their pots.*

*But raw data is useless. Nobody wants to read through hundreds of character objects to figure out which house has the most survivors. That's like handing the Minister of Magic a stack of unprocessed owl post and saying "the answer's in there somewhere."*

*The second challenge of the maze is transformation. You have the raw ingredients. Now brew the potion.*

### TEACH

**Transformation is where data becomes information.**

Remember Potions class? You don't serve someone a pile of crushed beetles, shredded boomslang skin, and raw lacewing flies and call it a Polyjuice Potion. You TRANSFORM the ingredients — measure, combine, heat, stir, wait, stir again — until something useful emerges.

Data transformation works the same way. You take messy, raw, verbose data and produce clean, computed, meaningful results.

**The core transformation operations:**

**1. Counting**
The simplest transformation. How many characters per house? How many are alive? Dead? These are just `.filter().length` operations, but they turn raw arrays into actual insights.

**2. Percentages**
Counts are good. Percentages are better. "5 characters have a patronus" means nothing without context. "31% of the house has a patronus" tells a story.

**3. Aggregations**
Averages, sums, min/max. What's the average wand length? The longest? The shortest? Aggregations compress many values into one meaningful number.

**4. Mode / Most Common**
What's the most common ancestry in Slytherin? (Spoiler: you can probably guess.) Finding the mode requires grouping values and counting occurrences — a slightly more complex transformation, but incredibly useful.

**5. Handling Missing Data**
This is the one that trips up most beginners. Real data is MESSY. Wand lengths are null. Ancestries are empty strings. Patronuses are missing. Your transform logic must handle these gracefully — skip nulls in averages, count empty strings as "unknown," and never let a single missing value crash your entire pipeline.

**The Transform Pattern:**

```
For each group of data:
  1. Count totals and subgroups
  2. Compute percentages from counts
  3. Calculate aggregations (avg, min, max)
  4. Find categorical modes (most common values)
  5. Handle nulls and missing data at EVERY step
```

### SHOW

Here's what a transform function looks like for our house data:

```javascript
// transform-houses.js
// Transforms raw house character data into statistics

function computeHouseStats(houseName, characters) {
  const total = characters.length;
  if (total === 0) {
    return { house: houseName, total: 0, error: 'No characters found' };
  }

  // Counts
  const alive = characters.filter(c => c.alive === true).length;
  const dead = characters.filter(c => c.alive === false).length;
  const hasPatronus = characters.filter(c => c.patronus && c.patronus.length > 0).length;

  // Average wand length (exclude nulls)
  const wandLengths = characters
    .map(c => c.wand_length)
    .filter(l => l !== null && l !== undefined && typeof l === 'number');
  const avgWandLength = wandLengths.length > 0
    ? Math.round((wandLengths.reduce((a, b) => a + b, 0) / wandLengths.length) * 100) / 100
    : null;

  // Most common ancestry
  const ancestryCounts = {};
  characters.forEach(c => {
    const ancestry = c.ancestry && c.ancestry.length > 0 ? c.ancestry : 'unknown';
    ancestryCounts[ancestry] = (ancestryCounts[ancestry] || 0) + 1;
  });
  const mostCommonAncestry = Object.entries(ancestryCounts)
    .sort((a, b) => b[1] - a[1])[0];

  return {
    house: houseName,
    total_characters: total,
    alive_count: alive,
    dead_count: dead,
    alive_pct: Math.round((alive / total) * 100),
    has_patronus: hasPatronus,
    patronus_pct: Math.round((hasPatronus / total) * 100),
    avg_wand_length: avgWandLength,
    wands_measured: wandLengths.length,
    most_common_ancestry: mostCommonAncestry
      ? { value: mostCommonAncestry[0], count: mostCommonAncestry[1] }
      : null,
  };
}

function transformAllHouses(houseData) {
  const stats = {};
  for (const [house, characters] of Object.entries(houseData)) {
    stats[house] = computeHouseStats(house, characters);
  }
  return stats;
}
```

Key things to notice:
- **Every computation handles the empty/null case** — no division by zero, no crashes on missing data
- **Percentages are rounded** — nobody needs "31.578947368421%" in a report
- **The mode calculation** sorts by count descending and takes the first — simple and effective
- **Wand lengths are filtered** before averaging — nulls are excluded, not treated as zero

### TRY

**Exercise: Build the Transform Layer (BUILD — 35 points)**

Write a script called `transform-houses.js` that takes the output from your fetch script (the house data object) and produces statistics for each house.

**Required statistics per house:**
1. `total_characters` — total count
2. `alive_count` — number alive
3. `dead_count` — number dead
4. `has_patronus` — number with a non-empty patronus string
5. `patronus_pct` — percentage with patronus (rounded to whole number)
6. `avg_wand_length` — average of `wand_length` field, EXCLUDING null values (rounded to 2 decimal places)
7. `most_common_ancestry` — the ancestry value that appears most often (with its count)

**Requirements:**
- Must accept house data as input (either by importing the fetch script, reading from a JSON file, or accepting piped input)
- Must handle missing/null data without crashing — no `NaN`, no `undefined` in outputs
- Must output the transformed statistics as JSON

**Hint for connecting the scripts:** You can either:
- Have the transform script import and call the fetch function directly
- Save the fetch output to a file and have the transform script read it
- Pipe the output: `node fetch-houses.js | node transform-houses.js`

Choose whichever approach makes sense to you. There's no single right answer — but you DO need to make a choice and make it work.

*The raw ingredients are in your cauldron. Stir carefully. One wrong computation and the whole potion turns to sludge.*

**Completion criteria:** Script produces correct statistics for all four houses with no NaN/undefined values, and handles null wand lengths properly.

### CHECKPOINT

*"When calculating average wand length, what should you do with characters whose wand length is null?"*

(a) Treat null as 0 and include it in the average
(b) Exclude null values entirely and average only the known lengths
(c) Replace null with the house average
(d) Throw an error and refuse to continue

The answer is (b). Including nulls as zero would drag down the average — that's not missing data, that's WRONG data. Excluding them gives you an honest average of the wands you actually know about. Always be honest with your data. Fudging numbers is a Ministry of Magic move, and look how that turned out.

---

<!-- VOICE: cache_id="peeves_interrupt" -->
## Lesson 4: Save & Report (The Third Challenge)

**Exercise ID:** `m7_save_report`
**Exercise Type:** BUILD (35 points)

### HOOK

*You've fought through the maze. You've retrieved the raw data. You've transformed it into meaningful statistics. The Triwizard Cup is glowing at the center of the maze — you can SEE it.*

*But here's the thing about the Cup: it's not enough to just REACH it. You have to GRAB it. And in our world, "grabbing the Cup" means producing tangible output. Files on disk. Reports that humans can read. Artifacts that persist after your script stops running.*

*A script that computes beautiful statistics and then prints them to the console and vanishes? That's like winning the Triwizard Tournament but forgetting to pick up the prize money. The work is DONE — but where's the proof?*

### TEACH

**Persistence is what separates a script from an automation.**

Any first-year can `console.log()` a result. But real automations produce ARTIFACTS — files, reports, database records, messages — things that exist independently of the code that created them.

**Two audiences, two formats:**

**1. Machine-readable output (JSON)**
This is for other programs, future scripts, and your transform layer's permanent record. JSON is the lingua franca of automation — structured, parseable, and universally understood. When you save JSON, you're creating data that can be consumed by the next automation in the chain.

**2. Human-readable output (Markdown)**
This is for the people who actually need to USE the information. Nobody wants to read raw JSON (except Ravenclaws, and even they prefer it formatted). A markdown report with headers, tables, and summaries turns data into communication.

**The Report Pattern:**

```
1. Create a directory structure for outputs
2. Write the raw statistics to a JSON file
3. Generate a markdown report with:
   - Title and generation timestamp
   - Summary section (high-level findings)
   - Detailed tables (per-house breakdowns)
   - Notable insights or highlights
4. Write the markdown to a file
5. Confirm both files were written successfully
```

**Why markdown?**

Markdown renders beautifully in GitHub, Notion, VS Code, and most documentation tools. It's lightweight, version-controllable, and readable even as plain text. When the Ministry demands a report, you hand them markdown. They can render it however they like.

**Directory creation:**

Always create your output directories programmatically. Never assume they exist. Use `fs.mkdirSync(path, { recursive: true })` — the `recursive: true` flag is your Alohomora for nested directories. It creates the entire path if it doesn't exist, and does nothing if it does. No errors. No drama.

### SHOW

Here's the output layer:

```javascript
// save-report.js
// Saves statistics to JSON and generates a markdown report

const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function saveJson(stats, outputPath) {
  ensureDir(path.dirname(outputPath));
  const content = JSON.stringify(stats, null, 2);
  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`JSON saved: ${outputPath}`);
}

function generateMarkdownReport(stats) {
  const timestamp = new Date().toISOString();
  const houses = Object.values(stats);

  let md = '';
  md += `# Hogwarts House Report\n\n`;
  md += `**Generated:** ${timestamp}\n\n`;
  md += `---\n\n`;

  // Summary
  const totalChars = houses.reduce((sum, h) => sum + h.total_characters, 0);
  const totalAlive = houses.reduce((sum, h) => sum + h.alive_count, 0);
  md += `## Summary\n\n`;
  md += `- **Total characters across all houses:** ${totalChars}\n`;
  md += `- **Total alive:** ${totalAlive}\n`;
  md += `- **Total dead:** ${totalChars - totalAlive}\n\n`;

  // Comparison table
  md += `## House Comparison\n\n`;
  md += `| Statistic | Gryffindor | Slytherin | Ravenclaw | Hufflepuff |\n`;
  md += `|-----------|-----------|-----------|-----------|------------|\n`;

  const g = stats.gryffindor || {};
  const s = stats.slytherin || {};
  const r = stats.ravenclaw || {};
  const h = stats.hufflepuff || {};

  md += `| Total Characters | ${g.total_characters} | ${s.total_characters} | ${r.total_characters} | ${h.total_characters} |\n`;
  md += `| Alive | ${g.alive_count} | ${s.alive_count} | ${r.alive_count} | ${h.alive_count} |\n`;
  md += `| Dead | ${g.dead_count} | ${s.dead_count} | ${r.dead_count} | ${h.dead_count} |\n`;
  md += `| Has Patronus | ${g.has_patronus} | ${s.has_patronus} | ${r.has_patronus} | ${h.has_patronus} |\n`;
  md += `| Patronus % | ${g.patronus_pct}% | ${s.patronus_pct}% | ${r.patronus_pct}% | ${h.patronus_pct}% |\n`;
  md += `| Avg Wand Length | ${g.avg_wand_length ?? 'N/A'} | ${s.avg_wand_length ?? 'N/A'} | ${r.avg_wand_length ?? 'N/A'} | ${h.avg_wand_length ?? 'N/A'} |\n`;
  md += `| Most Common Ancestry | ${g.most_common_ancestry?.value ?? 'N/A'} | ${s.most_common_ancestry?.value ?? 'N/A'} | ${r.most_common_ancestry?.value ?? 'N/A'} | ${h.most_common_ancestry?.value ?? 'N/A'} |\n`;

  md += `\n---\n\n`;
  md += `*Report generated by the Hogwarts House Report Generator*\n`;

  return md;
}

function saveMarkdown(stats, outputPath) {
  ensureDir(path.dirname(outputPath));
  const report = generateMarkdownReport(stats);
  fs.writeFileSync(outputPath, report, 'utf-8');
  console.log(`Report saved: ${outputPath}`);
}
```

Key things to notice:
- **`ensureDir`** creates output directories automatically — never fails on missing folders
- **JSON output** is human-readable with 2-space indentation (for debugging)
- **Markdown table** compares all four houses side by side — instantly scannable
- **Null handling** with `??` operators — missing values show "N/A" instead of crashing
- **Timestamp** in the report — always know WHEN data was generated

### TRY

<!-- VOICE: cache_id="exercise_intro" -->
**Exercise: Build the Output Layer (BUILD — 35 points)**

Write a script called `save-report.js` that takes your transformed house statistics and produces TWO outputs:

**Output 1: JSON file**
- Path: `./hp-house-report/data/house-statistics.json`
- Contains: The complete statistics object from your transform step
- Format: Pretty-printed JSON (2-space indentation)

**Output 2: Markdown report**
- Path: `./hp-house-report/reports/house-report.md`
- Must include:
  - A title
  - A generation timestamp
  - A summary section with cross-house totals
  - A comparison table showing ALL computed statistics for each house
  - Clean formatting that renders properly in any markdown viewer

**Requirements:**
- Must create the output directories if they don't exist
- Must handle the case where stats might be missing for a house
- Must confirm (via console output) that both files were saved and their paths
- The markdown must be readable as plain text AND render properly as formatted markdown

**Stretch goals (optional but impressive):**
- Add a "House Rankings" section that ranks houses by different metrics
- Add a "Notable Findings" section highlighting interesting data points
- Add an ASCII art Hogwarts crest at the top (yes, really — go for it)

*The Cup is RIGHT THERE. Reach out and grab it.*

**Completion criteria:** Both files are created in the correct locations. JSON is valid and parseable. Markdown renders correctly with table alignment.

### CHECKPOINT

*"Why do we save BOTH JSON and Markdown instead of just one?"*

(a) To waste disk space
(b) JSON is for machines/future automations, Markdown is for humans — different audiences need different formats
(c) Markdown can't store numbers
(d) JSON is faster to read

The answer is (b). This is a fundamental automation principle: produce output for every audience that needs it. Machines consume JSON. Humans consume formatted reports. Serve both. It's like how Hogwarts offers both regular food AND vegetarian options — not everyone consumes data the same way. (Okay, that metaphor was a stretch. But you get it.)

---

## Lesson 5: Document as a Skill (Claiming the Cup)

**Exercise ID:** `m7_skill_package`
**Exercise Type:** BUILD (35 points)

### HOOK

*The maze falls silent. The hedges stop moving. The enchanted fog lifts.*

*You're standing at the center, hand outstretched. The Triwizard Cup pulses with blue light. You've battled through planning, fetching, transforming, and saving. Every lesson in this module has been building to this moment.*

*But here's the twist — one that even the Triwizard Tournament didn't have.*

*The REAL final challenge isn't just touching the Cup. It's making the Cup REUSABLE. It's packaging your entire automation so that ANYONE — or any AI agent — can invoke it with a single command and get the full result.*

*That's what a Claude Skill is. It's not just code. It's codified magic — a spell that anyone can cast.*

*True mastery isn't just DOING the magic. It's teaching it to others.*

### TEACH

**What makes a Skill different from a script?**

You've written three scripts: fetch, transform, save. They work. They produce results. But right now, using them requires knowing which script to run first, what to pipe where, and how the pieces connect. That knowledge lives in YOUR head.

A Claude Skill moves that knowledge from your head into a `SKILL.md` file that an AI agent can read and execute. It's the difference between a handwritten spell on a napkin and a proper entry in the Standard Book of Spells.

**The anatomy of a Skill:**

```
skill-directory/
├── SKILL.md          # The orchestration brain — tells the AI what to do
├── scripts/          # The actual code that does the work
│   ├── fetch.js
│   ├── transform.js
│   └── report.js
└── output/           # Where results land (gitignored or transient)
```

**The SKILL.md is the conductor of the orchestra.** It doesn't play every instrument — it tells each instrument WHEN to play and HOW to play together. A good SKILL.md:

1. **Describes the purpose** — what does this skill do, in plain English?
2. **Lists the steps** — in order, what scripts to run and what they produce
3. **Defines the inputs** — what does the user need to provide (if anything)?
4. **Defines the outputs** — what will the user get back?
5. **Handles errors** — what to do if a step fails
6. **Is self-contained** — the AI should need NOTHING beyond this file and the scripts to run the full automation

**The Pipeline Orchestration Pattern:**

```markdown
## Steps
1. Run `scripts/fetch.js` → produces raw house data
2. Pass raw data to `scripts/transform.js` → produces statistics
3. Pass statistics to `scripts/save-report.js` → produces JSON + Markdown files
4. Confirm both output files exist
5. Display the markdown report contents to the user
```

Each step feeds the next. If step 1 fails, don't attempt step 2. If step 3 fails, the user still has the data from steps 1-2. Always degrade gracefully.

### SHOW

Here's what a well-structured SKILL.md looks like for our automation:

```markdown
---
name: hp-house-report
description: Generates a comparative report of all four Hogwarts houses
  using live data from the HP-API. Fetches character data, computes
  statistics, and produces both JSON and Markdown outputs.
---

# Hogwarts House Report Generator

## Purpose
Fetch live character data from the HP-API for all four Hogwarts
houses, compute comparative statistics, and generate a formatted
report.

## Prerequisites
- Node.js (for running scripts)
- Internet connection (for HP-API access)

## Inputs
- None required — the skill is fully self-contained

## Outputs
- `data/house-statistics.json` — Machine-readable statistics
- `reports/house-report.md` — Human-readable formatted report

## Execution Steps

### Step 1: Fetch House Data
Run the fetch script to retrieve character data from the HP-API:
\```bash
node scripts/fetch-houses.js > data/raw-houses.json
\```
Verify: The file should contain a JSON object with four keys
(gryffindor, slytherin, ravenclaw, hufflepuff), each mapping
to an array of character objects.

### Step 2: Transform Data
Run the transform script on the fetched data:
\```bash
node scripts/transform-houses.js data/raw-houses.json > data/house-statistics.json
\```
Verify: The output should contain statistics for each house
with no NaN or undefined values.

### Step 3: Generate Report
Run the report generator on the transformed statistics:
\```bash
node scripts/save-report.js data/house-statistics.json
\```
Verify: Both output files exist at their expected paths.

### Step 4: Present Results
Read and display `reports/house-report.md` to the user.

## Error Handling
- If the HP-API is unreachable, the fetch script will retry
  3 times. If all retries fail, report the error and stop.
- If transform produces NaN values, check the raw data for
  unexpected null fields.
- If file writes fail, check directory permissions.
```

Note how the SKILL.md doesn't contain any JavaScript. It ORCHESTRATES the JavaScript. It's the Dumbledore of the operation — directing the action, not casting every spell personally.

### TRY

<!-- VOICE: cache_id="cameo_mcgonagall" -->
**FINAL EXERCISE: Package the Complete Automation as a Skill (BUILD — 35 points)**

This is it. The graduation exercise. The Triwizard Cup.

**Create the complete `hp-house-report` skill with the following structure:**

```
.claude/skills/hp-house-report/
├── SKILL.md
├── scripts/
│   ├── fetch-houses.js
│   ├── transform-houses.js
│   └── save-report.js
├── data/                  (created by scripts at runtime)
│   ├── raw-houses.json
│   └── house-statistics.json
└── reports/               (created by scripts at runtime)
    └── house-report.md
```

**What you need to do:**

**1. Move your scripts** from Lessons 2-4 into the `scripts/` directory. Adjust any file paths so they write to the correct `data/` and `reports/` directories relative to the skill root.

**2. Wire the scripts together** so they form a complete pipeline. You can either:
   - Have each script read/write files as intermediary steps
   - Have a single "runner" script that imports and calls all three in sequence
   - Design the SKILL.md to orchestrate running them in order

Choose the approach that makes most sense to you.

**3. Write the SKILL.md** that orchestrates the full pipeline. It must include:
   - Skill name and description (in the frontmatter)
   - Purpose statement
   - Execution steps (in order, with the exact commands to run)
   - Expected outputs (file paths and what they contain)
   - Error handling guidance
   - Verification steps (how to confirm each step succeeded)

**4. Test end-to-end.** Run the skill from scratch:
   - Delete any existing output files
   - Follow the SKILL.md steps exactly as written
   - Verify that `data/house-statistics.json` exists and contains valid statistics
   - Verify that `reports/house-report.md` exists and renders correctly
   - The markdown report should show a comparison table of all four houses

**If the report generates successfully, YOU HAVE COMPLETED THE TRIWIZARD TOURNAMENT.**

*The Cup is yours. Grab it.*

**Completion criteria:**
- [ ] Skill directory structure exists with all files
- [ ] SKILL.md has frontmatter, purpose, steps, outputs, and error handling
- [ ] Scripts run without errors when executed in sequence
- [ ] `house-statistics.json` contains valid statistics for all four houses
- [ ] `house-report.md` contains a formatted comparison table
- [ ] The entire pipeline can be run from scratch following only the SKILL.md instructions

### CHECKPOINT

*"What is the PRIMARY purpose of a SKILL.md file?"*

(a) To store JavaScript code
(b) To orchestrate a pipeline — telling an AI agent what steps to run, in what order, and how to verify results
(c) To document the project for GitHub
(d) To replace the actual scripts

The answer is (b). The SKILL.md is the brain of the automation. It doesn't DO the work — it DIRECTS the work. The scripts are the wand. The SKILL.md is the wizard wielding it. And now YOU are the wizard who created BOTH.

---

<!-- VOICE: cache_id="module_complete" -->
## Module Completion

**When the student completes Lesson 5's final exercise, this module is DONE.**

Record progress:
```bash
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js lesson 7 1
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js lesson 7 2
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js lesson 7 3
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js lesson 7 4
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js lesson 7 5
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js exercise 7 "m7_planning"
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js exercise 7 "m7_fetch"
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js exercise 7 "m7_transform"
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js exercise 7 "m7_save_report"
node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js exercise 7 "m7_skill_package"
```

**Do NOT offer the Module 7 quiz.** Module 7 has no quiz. The final exercise IS the assessment. Building a working automation that passes all completion criteria is a far more meaningful test than answering multiple choice questions.

**Instead, proceed DIRECTLY to the Graduation Ceremony** (defined in SKILL.md Section 12).

This student has earned it. They planned an automation. They fetched live data from an API. They transformed raw data into insights. They saved structured output and generated human-readable reports. And they packaged the entire thing as a reusable skill.

They didn't just learn automation. They BUILT one. From nothing. And it works.

<!-- VOICE: cache_id="rank_up" -->
**TRIGGER GRADUATION.**

---

## Exercise Summary

| Lesson | Exercise ID | Type | Points | Description |
|--------|-------------|------|--------|-------------|
| 1 | `m7_planning` | DO | 25 | Define the automation plan with all 6 required sections |
| 2 | `m7_fetch` | BUILD | 35 | Write the fetch layer with retry logic and field extraction |
| 3 | `m7_transform` | BUILD | 35 | Write the transform layer computing all required statistics |
| 4 | `m7_save_report` | BUILD | 35 | Write the output layer producing JSON and Markdown files |
| 5 | `m7_skill_package` | BUILD | 35 | Package everything as a complete Claude Skill |

**Total possible points from exercises:** 165
**Total possible points including module completion bonus:** 265

---

## Teaching Notes

**Pacing:** This module is significantly longer than previous modules. Each lesson involves real coding and testing. Expect 2-3 sessions to complete the full module. Offer Butterbeer Breaks liberally.

**Difficulty escalation:** Lesson 1 is easy (planning). Lessons 2-4 are medium (each is a focused coding task). Lesson 5 is the hardest (integration, orchestration, and polish). This is intentional — the maze gets harder as you approach the center.

**Common failure points:**
- Lesson 2: Forgetting to handle API cold starts (timeouts on first request)
- Lesson 3: Not filtering null values before computing averages (produces NaN)
- Lesson 4: Hardcoding file paths instead of using relative paths from the skill root
- Lesson 5: Writing a SKILL.md that's too vague to actually follow

**If the student gets stuck:** Offer ONE specific hint. If they're still stuck, show them the relevant part of the SHOW example. Never write their code for them — that defeats the entire purpose of this module.

**When they finish:** Make it EPIC. This is their graduation moment. They built a real automation. Celebrate accordingly. Then trigger the graduation ceremony from SKILL.md Section 12. They've earned every word of it.
