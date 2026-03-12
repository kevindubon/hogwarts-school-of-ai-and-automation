<!-- Author: Kevin Dubon -->

# Module 6: Advanced Spellcraft — Claude Skills

> *"The creation of a new spell is, in many ways, the highest form of magical achievement. Any wizard can learn an existing incantation. But to craft one from nothing? That requires understanding the very nature of magic itself."*
> — Professor Flitwick, probably after his fourth cup of tea

---

## Module Overview

**Theme:** Creating your OWN spells — advanced magic where you teach Claude new capabilities.

**What the student will learn:**
- What Claude Skills are and why they matter
- The anatomy of a skill (SKILL.md, references, scripts)
- How to write a skill from scratch
- How to add scripts and reference files
- How to test and iterate on a skill

**Key metaphor:** Skills are like inventing new spells. Any wizard can cast *Lumos* — but creating *Sectumsempra* from scratch? That takes a different kind of brilliance (and hopefully better moral judgment than Snape).

**Exercises:**
- Lesson 2: OBSERVE — Read the Hogwarts School skill's own SKILL.md
- Lesson 3: DO — Plan out a skill on paper
- Lesson 4: BUILD — Create an `hp-lookup` skill (KEY exercise)
- Lesson 5: BUILD — Test the skill, find an issue, fix it

**Prerequisites:** Module 5 quiz passed (The Marauder's Map — MCP Universe)

**Tool:** Anthropic's official **skill-creator** skill is auto-installed by the setup script at `.claude/skills/skill-creator/`. Students can use `/skill-creator` to get AI-assisted help building, testing, and iterating on their skills. Mention this when students start the BUILD exercise in Lesson 4.

---

## Lesson 1: What Are Claude Skills? (Inventing New Spells)

### HOOK

Remember the Half-Blood Prince's copy of *Advanced Potion-Making*? The textbook was standard-issue — every student got the same one. But Snape's copy had margin notes everywhere: "crush with flat side of silver dagger, releases juice better than cutting." Suddenly Harry was the best potions student in the class — not because he was smarter, but because someone had written custom instructions that made the standard tools way more powerful.

That's exactly what Claude Skills are. Claude is already powerful out of the box — like the standard textbook. But a skill? A skill is the margin notes. The custom instructions. The secret sauce that turns a general-purpose AI into a specialized expert.

### TEACH

Here's the thing about Claude: it knows a LOT. But it doesn't know everything about YOUR specific work, YOUR tools, YOUR processes. It's like a brand-new professor arriving at Hogwarts — brilliant, but doesn't know where the Room of Requirement is, hasn't memorized the Marauder's Map, and definitely doesn't know that the third-floor corridor staircase moves on Thursdays.

**A Claude Skill is a reusable instruction set that gives Claude specialized knowledge it doesn't have by default.**

Think of it as inventing a brand-new spell. Before Snape created *Sectumsempra*, that spell didn't exist. He identified a need (a terrifyingly effective combat spell), designed the incantation and wand movements, tested it, refined it, and wrote it down so it could be used again. That's the skill creation process.

A skill has three core components:

| Component | What It Is | HP Equivalent |
|-----------|-----------|---------------|
| **SKILL.md** | The main instruction file — tells Claude what the skill does, when to use it, and how to behave | The spell formula — the incantation, intent, and wand movement written in one place |
| **Reference files** | Supporting documentation Claude can load when it needs more context | The spell's research notes — theory, background, data tables |
| **Scripts** | Executable code that does deterministic, repeatable work | The wand movements — the precise physical execution |

Here's why this matters: without a skill, every time you ask Claude to do something specialized, you'd have to explain the whole context from scratch. With a skill, you write those instructions ONCE, and Claude loads them automatically whenever the situation calls for it.

It's the difference between explaining the entire Patronus Charm theory every time someone needs to cast one, versus just saying "Expecto Patronum" and having the whole spell fire off because the knowledge is already encoded.

**The Half-Blood Prince's textbook metaphor goes deep:**
- The textbook = Claude's base knowledge (already pretty good)
- The margin notes = The SKILL.md (custom instructions that make it better)
- The separate parchment notes = Reference files (extra detail when needed)
- The invented spells written in the margins = Scripts (executable code for specific tasks)

### SHOW

Let's look at a real-world example. Say you work with an API called "Tally" for building forms. Without a skill, every time you need to create a form, you'd have to tell Claude:

> "Tally uses these endpoints, authentication works like this, blocks need UUIDs, the payload structure looks like this, oh and PATCH requires the full blocks array or you'll delete everything..."

With a skill, all of that knowledge lives in a SKILL.md file. When you say "create a Tally form," Claude automatically loads the skill and already knows everything. Here's what that looks like in practice:

```
tally-api/
├── SKILL.md              ← The spell formula (endpoints, auth, how to use it)
├── references/
│   └── verified-blocks.md  ← Research notes (all 38 block type schemas)
└── scripts/
    └── (none needed here)  ← No wand movements required for this one
```

The SKILL.md contains the API endpoints, authentication method, critical warnings (like "PATCH requires the complete blocks array"), and working examples. The reference file has detailed block schemas that Claude loads only when it needs to configure a specific block type.

One SKILL.md. Written once. Used every time. Like writing a spell in your personal spellbook.

### TRY

Think about a task you do repeatedly — something where you find yourself explaining the same context to Claude (or any AI tool) over and over again. It could be anything:

- How to format reports for your team
- How to query a specific database
- How to interact with a particular API
- How to follow a company process

Write down in your own words:
1. What's the task?
2. What knowledge does Claude need that it doesn't have by default?
3. How many times have you (or would you) explain this from scratch?

Don't worry about format or structure yet — just identify the problem. We'll turn it into a real skill later.

### CHECKPOINT

Quick check: Which of these best describes a Claude Skill?

**(a)** A plugin that adds new tools Claude can call
**(b)** A reusable instruction set that gives Claude specialized knowledge for specific tasks
**(c)** A way to make Claude remember your previous conversations
**(d)** A programming language for writing Claude extensions

---

## Lesson 2: Skill Anatomy (Spell Components)

### HOOK

Every spell in the wizarding world has three components: the incantation (what you say), the wand movement (what you do), and the intent (what you mean). Get any one wrong and the spell fails — or worse, backfires spectacularly. Ask Seamus Finnigan about that. Actually, don't. He's sensitive about the eyebrow thing.

Skills work the same way. There are specific components, in a specific structure, and if you get them wrong... well, nothing explodes. But Claude won't know what the hell you're talking about, which is arguably worse.

### TEACH

Let's dissect the anatomy of a skill the way Snape would dissect a flobberworm — methodically and with mild disdain for anyone who isn't paying attention.

**The Directory Structure:**

```
skill-name/
├── SKILL.md           ← REQUIRED: The spell formula
├── references/        ← OPTIONAL: Supporting documentation
│   ├── api-docs.md
│   └── data-schema.md
├── scripts/           ← OPTIONAL: Executable code
│   └── helper.js
└── assets/            ← OPTIONAL: Files used in output
    └── template.html
```

**The SKILL.md File — The Core:**

Every SKILL.md starts with frontmatter — metadata in YAML format that tells Claude WHAT this skill is and WHEN to use it:

```yaml
---
name: skill-name
description: This skill should be used when... [specific trigger conditions]
---
```

The `name` and `description` are critical. They're how Claude decides whether to load this skill. Think of the description as the incantation — if it's wrong or vague, the spell won't activate when you need it.

After the frontmatter comes the markdown body — the actual instructions. This is where you tell Claude:
- What the skill does (purpose)
- When to use it (trigger conditions)
- How to use it (step-by-step instructions)
- What resources are available (references, scripts)
- Edge cases and warnings

**How Claude Discovers and Loads Skills:**

This is the "intent" part of our spell metaphor. Skills use a three-level loading system — like progressive levels of spell mastery:

| Level | What Loads | When | Context Cost |
|-------|-----------|------|-------------|
| **1. Metadata** | Just the name + description | Always in context | ~100 words |
| **2. SKILL.md body** | Full instructions | When skill triggers | <5,000 words |
| **3. Bundled resources** | References, scripts | When Claude needs them | As needed |

This is smart design. Claude doesn't load every reference file for every skill every time — that would be like carrying every textbook to every class. Instead, it reads the SKILL.md when the skill triggers, and only pulls in references and scripts when the current task requires them.

**Trigger Conditions — When Should This Skill Activate?**

The description in your frontmatter is the trigger. When a user's request matches what the description says, Claude loads the skill. Good triggers are specific:

- GOOD: "This skill should be used when creating or managing Tally forms via the Tally API"
- BAD: "This skill helps with forms"

The good version tells Claude exactly when to activate — like a well-defined incantation. The bad version is so vague it might activate when someone asks about tax forms. Imagine casting *Accio* and accidentally summoning every object in the room because your intent was too broad. Chaos.

### SHOW

Let's look at a real SKILL.md with all its components. Here's a simplified version of an actual skill:

```markdown
---
name: bullhorn-api
description: This skill provides guidance for interacting with the
  Bullhorn ATS/CRM REST API. Use this skill when querying candidates,
  job orders, placements, or any Bullhorn entity.
---

# Bullhorn API

## Authentication
Run the auth script to get a fresh session token:
`node scripts/test-bullhorn-auth.js`

## Common Operations

### Search for Candidates
GET /search/Candidate?query=lastName:Smith&fields=id,firstName,lastName

### Create a Placement
POST /entity/Placement
Body: { "candidate": {"id": 123}, "jobOrder": {"id": 456}, ... }

## Important Notes
- Tokens expire after 10 minutes
- Always use the auth script — never recreate auth logic manually
- See `references/entity-schemas.md` for full field definitions
```

Notice the structure: purpose up front, instructions in the middle, references pointed to at the end. It's a spell formula — everything Claude needs to know, organized so it can find information quickly.

### TRY

Time to study an actual skill from the inside. You're going to read the SKILL.md for the very course you're taking right now — the Hogwarts School skill.

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: OBSERVE (15 points)**

Read the Hogwarts School SKILL.md file:

```
.claude/skills/hogwarts-school/SKILL.md
```

As you read, identify and write down:

1. **The frontmatter:** What's the name? What does the description say?
2. **The trigger:** When does this skill activate? What user actions would cause Claude to load it?
3. **The structure:** How many major sections are there? What does each one control?
4. **The references:** Does the SKILL.md point to any reference files? Which ones?
5. **The scripts:** What scripts does it use? What does each one do?

Don't just skim it — really read it. You're studying a working spell from the inside. This is the kind of advanced magic most wizards never bother to understand.

**Exercise ID:** `m6_observe_skill_anatomy`

### CHECKPOINT

Quick check: In a skill's SKILL.md, what is the frontmatter used for?

**(a)** Storing the skill's code logic
**(b)** Providing the name and description that Claude uses to decide when to load the skill
**(c)** Listing all the files in the skill directory
**(d)** Configuring which MCP servers the skill can access

---

## Lesson 3: Writing Your First Skill (Your First Original Spell)

### HOOK

Here's a question that probably kept young Severus Snape up at night: how do you invent a spell that doesn't exist yet?

You don't start with the incantation. You don't start with the wand movement. You start with the PROBLEM. Snape didn't wake up one morning thinking "I'd love to create a spell called *Sectumsempra*." He had a problem (he was, shall we say, interpersonally challenged at Hogwarts), and he worked backward from there to create a solution.

Same with skills. You don't start by writing SKILL.md. You start by asking: "What problem am I solving?"

### TEACH

The skill creation process follows a clear sequence. Let's walk through it like a proper spell development methodology:

**Step 1: Define the Problem (The Intent)**

Before you write a single line, answer these questions:
- What task am I trying to help Claude do better?
- What knowledge does Claude lack for this task?
- How often does this task come up?
- What goes wrong when Claude tries this without a skill?

If you can't clearly articulate the problem, you're not ready to write the skill. This is the "intent" of your spell — without clear intent, magic doesn't work. Ask Neville about his early Charms attempts.

**Step 2: Write the Frontmatter (The Incantation)**

The frontmatter is your spell's name and activation phrase:

```yaml
---
name: my-awesome-skill
description: This skill should be used when [specific scenario].
  It provides [what knowledge/capability] for [what purpose].
---
```

Rules for good frontmatter:
- **Name:** Lowercase, hyphenated, descriptive. `hp-lookup` not `mySkill1`
- **Description:** Third person ("This skill should be used when..."). Be specific about when it triggers. Include the key use cases.

**Step 3: Write the Instructions (The Wand Movement)**

This is the body of your SKILL.md. Structure it like this:

1. **Overview:** One paragraph explaining what this skill does
2. **When to use:** Explicit trigger conditions
3. **How to use:** Step-by-step instructions Claude can follow
4. **Key information:** API endpoints, schemas, rules, constraints
5. **Examples:** Show Claude what correct usage looks like
6. **Edge cases and warnings:** What can go wrong and how to handle it

**Step 4: Include Examples (Spell Demonstrations)**

Examples are critically important. They're the difference between a textbook that says "wave your wand" and one that shows you exactly how to wave it. Give Claude concrete examples of:
- Input: What the user might say
- Process: What Claude should do
- Output: What the result should look like

**Step 5: Handle Edge Cases (Counter-Curses)**

Every spell has situations where it might not work as expected. Document them:
- What if the API is down?
- What if the user provides invalid input?
- What if a required field is missing?
- What happens on the first run vs. subsequent runs?

Think of these as counter-curses — you're preparing for the spell to be cast in unexpected conditions.

### SHOW

Let's see the process in action. Suppose you want to create a skill that helps Claude look up weather data:

**Step 1 — The Problem:** "Every time I ask Claude about weather, I have to explain the API endpoint, the API key location, and the response format. I want Claude to just KNOW this."

**Step 2 — The Frontmatter:**
```yaml
---
name: weather-lookup
description: This skill should be used when the user asks about
  current weather conditions, forecasts, or temperature for any
  location. It provides the OpenWeather API integration details.
---
```

**Step 3 — The Instructions:**
```markdown
# Weather Lookup

## Overview
Look up current weather and forecasts using the OpenWeather API.

## API Details
- Base URL: https://api.openweathermap.org/data/2.5
- API Key: stored in `.env` as `OPENWEATHER_API_KEY`
- Endpoint: GET /weather?q={city}&appid={key}&units=metric

## How to Use
1. Extract the location from the user's request
2. Fetch the weather data using the endpoint above
3. Present temperature, conditions, and humidity in a friendly format

## Edge Cases
- If city not found: suggest spelling corrections
- If API key missing: tell user to add it to .env
```

Clear, structured, actionable. Claude can follow this without guessing.

### TRY

**[PLAY AUDIO: play-cached cameo_hagrid]**
**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: DO (25 points)**

Plan out a skill — on paper (or in your head). Don't create any files yet. Just think through the design.

Pick ONE of these scenarios (or use the task you identified in Lesson 1):

**Option A: A skill that helps Claude format data into a specific report template**
**Option B: A skill that helps Claude interact with a specific API you use**
**Option C: A skill related to Harry Potter (we'll build one of these in the next lesson)**

For your chosen scenario, write down:

1. **Name:** What would you call this skill? (lowercase, hyphenated)
2. **Problem:** What problem does it solve? (2-3 sentences)
3. **Trigger:** When should it activate? Write the description frontmatter.
4. **Key instructions:** List 3-5 bullet points of what the SKILL.md body would contain.
5. **References needed?** Would this skill benefit from reference files? What would they contain?
6. **Scripts needed?** Would this skill benefit from scripts? What would they do?

Share your plan and I'll give you feedback before we move to actually building one.

**Exercise ID:** `m6_plan_first_skill`

### CHECKPOINT

Quick check: When creating a skill, what should you do FIRST?

**(a)** Write the SKILL.md frontmatter
**(b)** Create the directory structure
**(c)** Clearly define the problem the skill solves
**(d)** Write the scripts

---

## Lesson 4: Adding Scripts and References (Spell Reinforcement)

### HOOK

Some spells are simple — *Lumos*, point and done, light appears. But some spells need backup. Wolfsbane Potion doesn't just require an incantation — it requires an entire bloody potion brewed alongside it. The Fidelius Charm doesn't just need a spell — it needs a Secret Keeper. Some magic requires more than just instructions; it requires infrastructure.

Same with skills. Sometimes a SKILL.md file is enough. But sometimes you need scripts to do the heavy lifting, and reference files to hold the encyclopedic knowledge. This lesson is about knowing when you need the potion AND the spell — and how to brew both.

### TEACH

**When to Add Reference Files (The Textbook Knowledge)**

Reference files go in the `references/` directory. They contain information that's too large or too detailed for the SKILL.md itself. Think of them as the textbooks in the Hogwarts library — the SKILL.md tells you which book to pull from the shelf and which chapter to read, but the actual content lives in the reference file.

**Add references when:**
- The data is large (API schemas with dozens of fields, entity definitions, data catalogs)
- The content is supplementary — Claude needs it sometimes but not always
- You want to keep SKILL.md lean and focused on instructions
- Multiple types of information serve different purposes (separate into multiple reference files)

**How Claude uses references:** The SKILL.md mentions them ("See `references/schema.md` for full field definitions") and Claude reads them on demand. They don't load into context until Claude determines it needs them. This is like having a library card — you don't carry every book, but you know where to find them.

**Example reference files:**
- `references/api-endpoints.md` — Full API documentation
- `references/data-schema.md` — Database table schemas
- `references/style-guide.md` — Formatting rules and templates
- `references/error-codes.md` — Error code lookup table

**When to Add Scripts (The Wand Movements)**

Scripts go in the `scripts/` directory. They contain executable code — typically JavaScript, Python, or Bash — that performs deterministic, repeatable tasks.

**Add scripts when:**
- The same code would be rewritten by Claude every time
- You need deterministic reliability (the code must run exactly the same way each time)
- Complex logic is involved (calculations, data transformations, API auth flows)
- The task involves multiple steps that should be automated

**How Claude uses scripts:** It runs them via the Bash tool. The SKILL.md tells Claude which script to run and when. The script does the work; Claude interprets the results.

**Example scripts:**
- `scripts/auth.js` — Handle OAuth authentication flow
- `scripts/transform-data.py` — Process and reshape data
- `scripts/validate.sh` — Run validation checks

**The Decision Framework:**

Ask yourself these questions:

| Question | If YES | If NO |
|----------|--------|-------|
| Is the content >500 words of reference data? | Reference file | Keep in SKILL.md |
| Does Claude need this info every time? | Keep in SKILL.md | Reference file |
| Is code being rewritten repeatedly? | Script | Inline instruction |
| Does the task need exact reproducibility? | Script | Inline instruction |

**Key principle:** SKILL.md should be lean and instructional. It's the spell formula, not the encyclopedia. Put the encyclopedia in references and the automation in scripts.

### SHOW

Let's look at a real skill that uses all three components. The Hogwarts School skill you're using RIGHT NOW is a great example:

```
hogwarts-school/
├── SKILL.md                    ← Instructions: voice, lesson format, navigation
├── references/
│   ├── hp-api-reference.md     ← API endpoints and cached sample data
│   ├── module-0-sorting-ceremony.md
│   ├── module-1-automation-spellbook.md
│   ├── ...                     ← One reference file per module
│   └── quiz-bank.md            ← All quiz questions
├── scripts/
│   ├── hogwarts-progress.js    ← Tracks student progress (save/load/update)
│   ├── sorting-hat-quiz.js     ← Runs the sorting ceremony
│   └── hp-api-exercises.js     ← API fetch utilities and exercise validators
└── assets/
    └── progress-schema.json    ← JSON schema for progress data
```

Notice the separation of concerns:
- **SKILL.md** doesn't contain ANY module content — it just tells Claude how to teach and where to find modules
- **References** hold all the course content — loaded only when a student navigates to that module
- **Scripts** handle all the state management — progress tracking, sorting, API exercises

If all of this were crammed into one SKILL.md, it would be tens of thousands of words. Claude would choke on it like Ron trying to eat a whole box of Chocolate Frogs in one sitting. The three-level system keeps everything manageable.

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: BUILD (35 points) — KEY MODULE EXERCISE**

Time to create a real, working skill. You're going to build an `hp-lookup` skill that uses the HP-API to look up Harry Potter character and spell information.

**What the skill should do:**
- When a user says something like "look up Harry Potter" or "find spell Lumos," Claude should fetch data from the HP-API and present it in a formatted, entertaining way
- Handle both character lookups and spell lookups
- Present the data cleanly (not just raw JSON dumped on screen)

**Here's your spec. Build the skill step by step:**

**Step 1: Create the directory structure**

Create the skill at: `.claude/skills/hp-lookup/`

You need:
- A `SKILL.md` file
- Optionally, a `references/` directory if you want to include API documentation

**Step 2: Write the SKILL.md**

Your SKILL.md needs:

*Frontmatter:*
- A clear `name`
- A `description` that tells Claude WHEN to activate this skill — think about what trigger phrases a user would say

*Body — include at minimum:*
- **Overview:** What this skill does (1-2 sentences)
- **API Details:** The HP-API base URL (`https://hp-api.onrender.com`) and the relevant endpoints:
  - `GET /api/characters` — all characters
  - `GET /api/spells` — all spells
  - `GET /api/character/:id` — single character by ID
- **How to handle character lookups:** Tell Claude to search by name (the API doesn't have a search endpoint, so Claude needs to fetch all characters and filter by name match)
- **How to handle spell lookups:** Same approach — fetch all spells, filter by name
- **Presentation format:** How should Claude present the data? Think about what fields are interesting for characters (name, house, wand, patronus, ancestry, alive status) and spells (name, description)
- **Edge cases:** What if no match is found? What if the API is down? What if the name is misspelled?

**Step 3: (Optional) Add a reference file**

If you want, create `references/api-endpoints.md` with the full endpoint documentation. Or you can keep it all in SKILL.md — your call. Think about which approach makes more sense for a skill this size.

**Important rules:**
- I will NOT write this for you. This is YOUR spell to create.
- I WILL review what you create and give feedback.
- Start with Step 1 and Step 2. Share your SKILL.md when you've written it.
- It doesn't need to be perfect — we'll iterate in the next lesson.
- **Pro tip:** Anthropic's official **skill-creator** is installed at `.claude/skills/skill-creator/`. If you want AI-assisted help building and testing your skill, you can use `/skill-creator` — it'll walk you through the process, help you write test cases, and run evals. Think of it as having Ollivander guiding your wand-crafting.

**Hints if you're stuck:**
- Look back at the SKILL.md examples from this lesson and Lesson 2
- The frontmatter description should mention "Harry Potter characters," "spells," "HP-API," and "lookup"
- For the name matching, tell Claude to use case-insensitive partial matching (so "harry" matches "Harry Potter")
- Think about what makes a good presentation — a formatted character card is more useful than a JSON blob

Go build your spell.

**Exercise ID:** `m6_build_hp_lookup`

### CHECKPOINT

**[PLAY AUDIO: play-cached cameo_mcgonagall]**
Quick check: You have a skill that interacts with an API. The API has 40 different entity types, each with its own field schema. Where should those schemas live?

**(a)** All in SKILL.md — Claude needs them every time
**(b)** In a reference file — Claude can load them when needed for a specific entity
**(c)** In a script — schemas should be executable
**(d)** In the frontmatter description

---

**[PLAY AUDIO: play-cached peeves_interrupt]**
## Lesson 5: Testing and Iterating (Spell Practice)

### HOOK

Pop quiz: How many times did Dumbledore cast *Expecto Patronum* before he got a corporeal phoenix Patronus?

Nobody knows. Because even Dumbledore didn't brag about his failures. But you can bet it wasn't the first try. Or the fifth. The greatest wizard of his age still had to practice, fail, adjust, and try again.

Your first skill won't be perfect. And that's not a bug — it's the process. The gap between "version 1" and "actually good" is where real learning happens.

### TEACH

**How to Test a Skill:**

Testing a skill is straightforward — you use it and see what happens. But there's a method to doing this well:

**Test 1: Does it trigger correctly?**
Say something that SHOULD activate the skill. Did Claude load it? If not, your frontmatter description might not match the user's language well enough.

For the `hp-lookup` skill, try:
- "Look up Hermione Granger" — Does the skill activate?
- "Tell me about the spell Lumos" — Does it handle spell lookups?
- "What's the weather today?" — Does it correctly NOT activate?

**Test 2: Does it follow the instructions?**
When the skill activates, does Claude actually do what SKILL.md says? Check:
- Does it hit the right API endpoints?
- Does it present data in the format you specified?
- Does it handle the flow you described?

**Test 3: Do the edge cases work?**
Try to break it:
- Search for a character that doesn't exist ("Gandalf")
- Search with a misspelling ("Hermoine" instead of "Hermione")
- What happens if you give it just a first name ("Harry")?
- What if you ask for a character AND a spell in the same request?

**Common Mistakes and How to Fix Them:**

| Problem | Symptom | Fix |
|---------|---------|-----|
| Vague description | Skill doesn't trigger when expected | Make description more specific with exact trigger phrases |
| Missing instructions | Claude guesses instead of following a process | Add explicit step-by-step instructions to SKILL.md |
| No error handling | Claude crashes or gives unhelpful response on bad input | Add an edge cases section to SKILL.md |
| Too much in SKILL.md | Claude gets overwhelmed, misses key instructions | Move detailed content to reference files |
| Wrong file paths | Scripts fail because Claude can't find them | Use paths relative to the skill directory; verify they exist |
| Overly rigid instructions | Skill works for one case but fails for variations | Add multiple examples covering different input patterns |

**The Iteration Cycle:**

```
1. USE the skill on a real task
        ↓
2. NOTICE what went wrong or could be better
        ↓
3. IDENTIFY the root cause (frontmatter? instructions? missing info?)
        ↓
4. UPDATE the SKILL.md (or references/scripts)
        ↓
5. TEST again → repeat
```

This is the same cycle for spell development. Cast it, see what happens, adjust the wand angle, try again. The Half-Blood Prince's textbook wasn't written in one sitting — those margin notes were accumulated over years of practice and refinement.

**When Is a Skill "Done"?**

A skill is ready when:
- It triggers correctly for its intended use cases
- It does NOT trigger for unrelated requests
- Claude follows the instructions consistently
- Edge cases are handled gracefully
- You'd trust it to work without babysitting it

That said, skills are living documents. You'll keep improving them as you discover new edge cases or better approaches. Even Ollivander is still perfecting wands after centuries.

### SHOW

Here's an example of a testing session and the fixes that came out of it:

**Test:** "Look up Draco Malfoy"

**Problem found:** Claude dumped the entire raw JSON response instead of formatting it nicely.

**Root cause:** SKILL.md said "present the data" but didn't specify HOW.

**Fix:** Added this to SKILL.md:
```markdown
## Presentation Format

For character lookups, present a formatted card:

**[Character Name]**
- House: [house]
- Blood Status: [ancestry]
- Wand: [wood] wood, [core] core, [length] inches
- Patronus: [patronus or "Unknown"]
- Status: [Alive/Deceased]
- Played by: [actor]

Omit fields that are empty or null. Add a brief entertaining comment
about the character in the Hogwarts School voice.
```

**Retest:** "Look up Draco Malfoy" -- Now Claude presents a clean card with a snarky comment. Much better.

That's one iteration cycle. Problem observed, root cause identified, fix applied, improvement verified.

### TRY

**Exercise: BUILD (35 points)**

Time to put your `hp-lookup` skill to the test.

**Part A: Test It**

Try these five lookups with your skill:
1. "Look up Harry Potter" (standard character lookup)
2. "Find the spell Expelliarmus" (standard spell lookup)
3. "Who is Dobby?" (character with less data — no house, no wand)
4. "Look up Gandalf" (character that doesn't exist in HP)
5. "Tell me about Neville" (partial name match)

For each test, note:
- Did the skill trigger?
- Did Claude follow your instructions?
- Was the output what you expected?
- Anything surprising or wrong?

**Part B: Identify and Fix One Issue**

From your testing, pick the ONE biggest issue you found. Then:

1. **Describe the problem** — What went wrong?
2. **Identify the root cause** — Is it the frontmatter, the instructions, a missing edge case?
3. **Fix it** — Edit your SKILL.md to address the issue
4. **Retest** — Run the same test that failed and confirm it's better

Share your findings: what broke, what you changed, and how the retest went.

**Exercise ID:** `m6_test_and_iterate`

### CHECKPOINT

Quick check: You test your skill and discover Claude is using the wrong API endpoint. Where is the most likely place you need to make a fix?

**(a)** The frontmatter description
**(b)** The instruction body of SKILL.md where you documented the endpoints
**(c)** A reference file
**(d)** The scripts directory

---

**[PLAY AUDIO: play-cached module_complete]**
## Module 6 Summary

You've learned the most advanced form of magic in this course — creating your own spells. Let's recap:

| Lesson | Concept | HP Metaphor |
|--------|---------|-------------|
| 1 | Skills are reusable instruction sets for Claude | The Half-Blood Prince's annotated textbook |
| 2 | Skills have structure: SKILL.md + references + scripts | Every spell has incantation, movement, intent |
| 3 | Start with the problem, then design the solution | Snape invented spells by working backward from needs |
| 4 | References for knowledge, scripts for execution | Potions enhance spells, textbooks inform them |
| 5 | Test, find issues, iterate, repeat | Even Dumbledore had to practice |

**What you built:** A working `hp-lookup` skill — your first original spell. It may not be *Sectumsempra*, but it's YOURS. And unlike Snape's spell, yours doesn't cause grievous bodily harm. Probably.

**The real takeaway:** Skills are how you multiply Claude's usefulness. Every skill you create is an investment — the time you spend writing it pays dividends every single time it activates. One hour of skill creation can save hundreds of hours of repeated explanation.

You're no longer just casting other people's spells. You're writing your own.

---

## Module 6 Quiz

When you're ready, say "Take the Module 6 quiz" and I'll pull 5 questions from the quiz bank. You need 4/5 to unlock Module 7: The Final Trial.

*Remember: 10 points per correct answer, +50 bonus for passing on the first try. Your house is counting on you.*
