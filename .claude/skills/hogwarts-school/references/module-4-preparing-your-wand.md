<!-- Author: Kevin Dubon -->

# Module 4: Preparing Your Wand — Setting Up Your Workspace

> *"The wand chooses the wizard, Mr. Potter."*
> — Garrick Ollivander

Every wizard needs a wand before they can cast their first spell. In the world of automation, your **development environment** is your wand. A poorly prepared workspace will misfire, sputter, and leave you frustrated. A well-prepared one will channel your intent into powerful, reliable magic.

In this module, you will set up everything you need to start building real automations. By the end, you will have a fully configured workspace and will cast your very first spell — a complete Node.js script that reads secrets, fetches data from an API, and saves the results to a file.

**This module ties together everything from Modules 1-3.** You learned how APIs work (Module 2) and how data flows through systems (Module 3). Now you will use those concepts hands-on for the first time.

---

## Lesson 1: The Wand Chooses the Developer (Choosing Your Tools)

### HOOK

When Harry walked into Ollivander's shop on Diagon Alley, he did not pick his wand off a shelf. Ollivander brought wand after wand — holly, maple, ebony — until the right one chose Harry. Sparks flew. The air hummed. The match was unmistakable.

Setting up your development environment works the same way. There are many tools out there, but a specific set of core tools will become **your** wand, spellbook, and magical artifacts. Once you have them, everything clicks. Without them, you are just waving a stick.

### TEACH

There are four essential tools every automation developer needs. Think of them as the four components of a proper wizard's kit:

**1. Terminal/CLI = Your Wand**

The terminal (also called the command line or CLI) is where you cast spells. Every command you type is an incantation. This is where you run scripts, install packages, manage files, and interact with servers. It is the single most important tool in your arsenal.

- On macOS: Terminal app or iTerm2
- On Windows: PowerShell, Windows Terminal, or Git Bash
- On Linux: Any terminal emulator

The terminal is not a graphical interface where you click buttons. It is a text-based interface where you type precise commands. This precision is what makes it powerful — there is no ambiguity in a typed command.

**2. Code Editor = Your Spellbook**

A code editor is where you write your scripts, configurations, and automation logic. It is your spellbook — the place where you compose and refine your incantations before casting them in the terminal.

The most common choice today is **Visual Studio Code (VS Code)**. It is free, extensible, and has excellent support for JavaScript, JSON, and every language you will encounter. Other solid options include Cursor, Sublime Text, and Vim (if you are feeling particularly brave — Vim is the Elder Wand of editors: immensely powerful but dangerous for the unprepared).

**3. Node.js/npm = Your Wand Core**

Every wand has a magical core — phoenix feather, dragon heartstring, unicorn hair. Node.js is the core of your development wand. It is the runtime that lets you execute JavaScript outside of a web browser, which means you can use it to write scripts, build servers, and run automations.

**npm** (Node Package Manager) comes bundled with Node.js. It is the system that lets you install packages — pre-written code libraries that other developers have published. Think of npm as a vast catalog of pre-made spells you can add to your spellbook.

**4. Git = The Pensieve**

In the Harry Potter universe, a Pensieve stores memories so you can revisit them. Git does the same thing for your code. It is a **version control system** that tracks every change you make. If you break something, you can go back in time. If you want to see what your code looked like last Tuesday, Git remembers.

Git also enables collaboration. Multiple developers can work on the same project without overwriting each other's changes. For now, the most important thing is that Git gives you a safety net — you can experiment fearlessly because you can always undo.

### SHOW

Here is what each tool looks like in practice:

```bash
# Your wand (terminal) — casting a simple spell
echo "Hello, Wizarding World!"

# Your wand core (Node.js) — checking if it's installed
node --version
# Output: v20.11.0 (or similar)

# npm — the package manager that comes with Node.js
npm --version
# Output: 10.2.4 (or similar)

# The Pensieve (Git) — checking if it remembers
git --version
# Output: git version 2.43.0 (or similar)
```

If any of these commands return "command not found," that tool is not installed yet. Here is how to install them:

| Tool | Installation |
|------|-------------|
| **Node.js + npm** | Download from [nodejs.org](https://nodejs.org/) — choose the LTS (Long Term Support) version |
| **Git** | Download from [git-scm.com](https://git-scm.com/) or install via your package manager |
| **VS Code** | Download from [code.visualstudio.com](https://code.visualstudio.com/) |

### TRY (OBSERVE)

<!-- VOICE: cache_id="exercise_intro" -->
Open your terminal and run these three commands. You are not installing anything — just observing what is already on your machine:

```bash
node --version
npm --version
git --version
```

Write down what each command returns. If you get a version number, that tool is ready. If you get "command not found," you need to install it before continuing.

**Bonus observation:** Try running `which node` (macOS/Linux) or `where node` (Windows). This tells you exactly where the tool lives on your system — its physical location, like finding out which shelf in Ollivander's shop your wand came from.

### CHECKPOINT

You should be able to answer these questions:

- [ ] What are the four core tools and what role does each play?
- [ ] What version of Node.js is installed on your machine?
- [ ] What is the difference between Node.js and npm?
- [ ] Why is Git compared to a Pensieve?

---

## Lesson 2: Your Workspace (The Room of Requirement)

### HOOK

On the seventh floor of Hogwarts, there is a hidden room that only appears when you truly need it. Walk past the blank wall three times while concentrating on what you need, and a door appears. Inside, the Room of Requirement transforms into exactly the space you need — a training room, a hiding place, a storage vault.

Your project workspace works the same way. When you create a new project, you are conjuring a Room of Requirement — a dedicated space that contains everything your automation needs and nothing it does not. The structure you give it determines how useful it will be.

### TEACH

**Creating a Project Folder**

Every project starts with a folder. This is not glamorous, but it is foundational. A well-organized folder structure is the difference between a tidy potions lab and Hagrid's hut (loveable but chaotic).

Here is a standard structure for an automation project:

```
my-automation-project/
├── scripts/          # Your spell scripts
├── data/             # Input/output data files
├── .env              # Secret variables (the Marauder's Map)
├── .gitignore        # What Git should ignore
├── package.json      # Project manifest (spell registry)
└── README.md         # Project description
```

**Initializing with `npm init`**

Running `npm init` in a folder turns it from an ordinary directory into a proper Node.js project. It creates a `package.json` file — think of this as your **spell registry**. It records:

- The project's name and description
- What version it is
- What packages (dependencies) it uses
- What scripts can be run

The `-y` flag (`npm init -y`) accepts all defaults so you do not have to answer questions one by one. You can always edit the file later.

**Understanding package.json**

Here is what a basic `package.json` looks like:

```json
{
  "name": "my-automation-project",
  "version": "1.0.0",
  "description": "My first automation project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"No tests yet\""
  },
  "dependencies": {},
  "devDependencies": {}
}
```

Each field has a purpose:
- `name` — The project's identity
- `version` — Semantic versioning (major.minor.patch)
- `scripts` — Named commands you can run with `npm run <name>`
- `dependencies` — Packages your project needs to run
- `devDependencies` — Packages only needed during development

**The .env File (The Marauder's Map)**

Remember the Marauder's Map? It reveals hidden information, but only to those who know the secret phrase: *"I solemnly swear that I am up to no good."*

A `.env` file works the same way. It stores **secrets** — API keys, passwords, database URLs — that your code needs but that should never be shared publicly. The file sits in your project folder but is **never** committed to Git (you add it to `.gitignore`).

```bash
# .env file — your Marauder's Map
API_KEY=sk-abc123def456
DATABASE_URL=postgres://user:password@host:5432/db
SECRET_PHRASE=i-solemnly-swear-i-am-up-to-no-good
```

Why keep secrets in `.env` instead of directly in your code?

1. **Security** — If your code is shared or stored on GitHub, the secrets stay hidden
2. **Flexibility** — Different environments (development, production) can have different values
3. **Convention** — Every developer expects secrets in `.env`, making collaboration easier

### SHOW

Here is the full sequence of commands to create a project workspace from scratch:

```bash
# Step 1: Create the project folder
mkdir my-first-automation
cd my-first-automation

# Step 2: Initialize the Node.js project
npm init -y

# Step 3: Create the folder structure
mkdir scripts data

# Step 4: Create the .env file with a test secret
echo 'SECRET_SPELL=expelliarmus' > .env

# Step 5: Create .gitignore to protect secrets and node_modules
echo 'node_modules/
.env' > .gitignore

# Step 6: Verify everything was created
ls -la
```

After running these commands, your folder looks like this:

```
my-first-automation/
├── data/
├── scripts/
├── .env              (contains: SECRET_SPELL=expelliarmus)
├── .gitignore        (protects .env and node_modules from Git)
└── package.json      (created by npm init)
```

### TRY (DO)

Create your first project workspace. Open your terminal and run these commands:

```bash
# Navigate to where you keep projects (adjust path as needed)
cd ~/Desktop

# Create and enter your project folder
mkdir hogwarts-automation
cd hogwarts-automation

# Initialize the project
npm init -y

# Create folders
mkdir scripts data

# Create a .env file with a test variable
echo 'WIZARD_NAME=Harry Potter' > .env
echo 'HOUSE=Gryffindor' >> .env

# Create .gitignore
echo 'node_modules/' > .gitignore
echo '.env' >> .gitignore

# Verify your .env file
cat .env

# Verify your package.json
cat package.json
```

After completing this exercise, you should see your `WIZARD_NAME` and `HOUSE` variables when you `cat .env`, and a properly formatted `package.json` when you `cat package.json`.

### CHECKPOINT

You should be able to answer these questions:

- [ ] What does `npm init -y` do?
- [ ] What is the purpose of `package.json`?
- [ ] Why should `.env` files never be committed to Git?
- [ ] What goes in `.gitignore` and why?

---

<!-- VOICE: cache_id="peeves_interrupt" -->
## Lesson 3: Dependencies (Collecting Potion Ingredients)

### HOOK

In Professor Snape's potions class, students do not create ingredients from scratch. They collect pre-prepared ingredients — bezoars, wolfsbane, lacewing flies — and combine them in precise ways to create powerful potions. A skilled potioneer knows which ingredients exist, where to find them, and how to combine them properly.

npm packages work exactly like potion ingredients. Thousands of developers have already solved common problems and published their solutions as packages. Need to read environment variables? There is a package for that. Need to make HTTP requests? There is a package for that. Need to parse dates, validate emails, or connect to a database? Packages exist for all of it.

The skill is not in reinventing these ingredients — it is in knowing which ones to use and how to combine them.

### TEACH

**What Are npm Packages?**

An npm package is a reusable bundle of code that someone else wrote, tested, and published to the npm registry (npmjs.com). When you install a package, you are adding someone else's pre-made spell to your project.

Some packages you will encounter frequently in automation work:

| Package | Purpose | Potion Ingredient Analogy |
|---------|---------|--------------------------|
| `dotenv` | Reads `.env` files | Bezoar (essential safety ingredient) |
| `node-fetch` | Makes HTTP requests | Lacewing flies (enables transformation) |
| `axios` | Makes HTTP requests (alternative) | Boomslang skin (similar to lacewing) |
| `lodash` | Utility functions for data manipulation | Wolfsbane (tames complex data) |
| `dayjs` | Date/time handling | Time-Turner essence |

**Installing Packages**

The `npm install` command downloads a package and adds it to your project:

```bash
# Install a single package
npm install dotenv

# Install multiple packages at once
npm install dotenv node-fetch

# Install a dev-only package (not needed in production)
npm install --save-dev nodemon

# Shorthand for install
npm i dotenv
```

**package.json vs package-lock.json**

When you install a package, two things happen:

1. The package name is added to `package.json` under `dependencies` — this is the **recipe** ("I need lacewing flies")
2. A `package-lock.json` file is created/updated — this is the **exact ingredient list** ("I need lacewing flies, version 2.3.1, from jar #47 on shelf B")

The lock file ensures that everyone working on the project gets the exact same versions. Without it, two developers might get slightly different versions, leading to subtle bugs — like two potions that look identical but one explodes.

**dependencies vs devDependencies**

- `dependencies` — Packages your project needs to **run**. These are the core potion ingredients.
- `devDependencies` — Packages you only need during **development**. These are your testing tools, linters, and helper utilities — like the cauldron stirrer that makes brewing easier but is not part of the potion itself.

```json
{
  "dependencies": {
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

**node_modules = The Forbidden Forest**

When you run `npm install`, the packages are downloaded into a folder called `node_modules`. This folder is **The Forbidden Forest** of your project:

- It can contain thousands of files (packages depend on other packages, which depend on other packages...)
- You should never manually edit anything inside it
- You should never commit it to Git (that is why we added it to `.gitignore`)
- If it gets corrupted, you delete it and run `npm install` again to regenerate it

The `node_modules` folder is always rebuildable from `package.json` and `package-lock.json`. Those two files are the map — `node_modules` is the territory.

### SHOW

Here is the full workflow of installing a package and using it:

```bash
# Install the dotenv package
npm install dotenv
```

After running this, three things change:

```
my-project/
├── node_modules/          # NEW — The Forbidden Forest (auto-created)
│   └── dotenv/            # The package you installed lives here
├── package.json           # UPDATED — dotenv added to dependencies
├── package-lock.json      # NEW — Exact version lock file
└── .env                   # Your secrets file (unchanged)
```

Your `package.json` now includes:

```json
{
  "dependencies": {
    "dotenv": "^16.3.1"
  }
}
```

The `^` symbol means "compatible with" — npm can install minor updates (16.3.2, 16.4.0) but not major ones (17.0.0). This keeps your project stable while allowing bug fixes.

Now you can use the package in your code:

```javascript
// load-secrets.js
// Load the dotenv package — this reads your .env file
require('dotenv').config();

// Now environment variables from .env are available
console.log('Wizard:', process.env.WIZARD_NAME);
console.log('House:', process.env.HOUSE);
```

### TRY (DO)

<!-- VOICE: cache_id="exercise_intro" -->
Navigate to the project you created in Lesson 2 and install your first package:

```bash
# Make sure you're in your project folder
cd ~/Desktop/hogwarts-automation

# Install the dotenv package
npm install dotenv

# Verify it was added to package.json
cat package.json

# Create a script that uses it
cat > scripts/read-secrets.js << 'EOF'
// read-secrets.js — Our first spell using a dependency
require('dotenv').config();

const wizardName = process.env.WIZARD_NAME;
const house = process.env.HOUSE;

if (wizardName && house) {
  console.log(`The Sorting Hat has spoken!`);
  console.log(`${wizardName} has been sorted into ${house}!`);
} else {
  console.log('The Marauder\'s Map is blank — no secrets found.');
  console.log('Make sure your .env file exists with WIZARD_NAME and HOUSE.');
}
EOF

# Run the script
node scripts/read-secrets.js
```

You should see:
```
The Sorting Hat has spoken!
Harry Potter has been sorted into Gryffindor!
```

If you see the "Marauder's Map is blank" message, double-check that your `.env` file exists in the project root (not inside the `scripts` folder) and contains the variables from Lesson 2.

### CHECKPOINT

You should be able to answer these questions:

- [ ] What does `npm install <package>` do?
- [ ] What is the difference between `package.json` and `package-lock.json`?
- [ ] Why should you never edit files inside `node_modules`?
- [ ] What is the difference between `dependencies` and `devDependencies`?
- [ ] How does `require('dotenv').config()` make `.env` variables available?

---

## Lesson 4: Your First Script (First Spell Cast)

### HOOK

Every young wizard remembers their first real spell. Not practicing wand movements in front of a mirror — the first time they pointed their wand and something actually happened. For Harry, it was in Ollivander's shop: warmth in his fingers, gold and red sparks from the wand tip. The wand had chosen him, and magic was real.

This lesson is your Ollivander's moment. You have your tools installed (Lesson 1), your workspace prepared (Lesson 2), and your ingredients collected (Lesson 3). Now you will point your wand and cast a real spell — a complete Node.js script that reads secrets, calls an API, processes data, and saves the results.

This is where everything from Modules 1 through 4 comes together.

### TEACH

**Writing a Node.js Script**

A Node.js script is just a plain text file with a `.js` extension. You write JavaScript in it, and Node.js executes it line by line. No browser needed. No web page. Just your terminal and your code.

```javascript
// hello.js — The simplest possible script
console.log("Lumos!");
```

```bash
# Run it
node hello.js
# Output: Lumos!
```

That is a complete program. One line. But real automation scripts do more. Let us build up the key capabilities:

**Reading Environment Variables**

Environment variables are how your script accesses secrets without hardcoding them:

```javascript
require('dotenv').config();

// process.env contains all environment variables
const apiKey = process.env.API_KEY;
console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
```

**Reading and Writing Files**

Node.js has a built-in module called `fs` (file system) that lets you read and write files. No installation needed — it comes with Node.js:

```javascript
const fs = require('fs');

// Writing a file
fs.writeFileSync('output.json', JSON.stringify({ spell: 'Lumos' }, null, 2));

// Reading a file
const data = fs.readFileSync('output.json', 'utf8');
console.log(data);
```

The `Sync` suffix means the operation happens synchronously — your script waits until the file is fully written or read before moving to the next line. For simple automation scripts, synchronous operations are fine.

**Making HTTP Requests (Fetch)**

Modern versions of Node.js (18+) include a built-in `fetch` function — the same one you learned about in Module 2. This lets you call APIs directly from your scripts:

```javascript
// Fetch data from an API
const response = await fetch('https://hp-api.onrender.com/api/characters');
const characters = await response.json();
console.log(`Found ${characters.length} characters`);
```

The `await` keyword means "wait for this to finish before continuing." Since API calls take time (the request has to travel to a server and back), you need to tell your script to wait for the response.

To use `await` at the top level of a script, you wrap your code in an async function:

```javascript
async function main() {
  const response = await fetch('https://example.com/api');
  const data = await response.json();
  console.log(data);
}

main();
```

**Putting It All Together**

A real automation script combines these capabilities in a logical flow:

1. **Load configuration** — Read secrets and settings from `.env`
2. **Fetch data** — Call an API to get information
3. **Process data** — Filter, transform, or analyze the results
4. **Output results** — Save to a file, log to console, or send to another API

This is the fundamental pattern behind every automation you will ever build. The systems get more complex, but the pattern stays the same: **get data, process it, do something with it.**

### SHOW

Here is a complete script that demonstrates all four capabilities. It fetches Harry Potter characters from the HP API, filters them by house, and saves the results:

```javascript
// fetch-wizards.js — A complete automation script
// Demonstrates: env vars, fetch, data processing, file I/O

const fs = require('fs');
require('dotenv').config();

async function main() {
  // Step 1: Load configuration from .env
  const house = process.env.HOUSE;
  console.log(`\n--- Fetching wizards from ${house} ---\n`);

  // Step 2: Fetch data from the HP API
  const response = await fetch('https://hp-api.onrender.com/api/characters');

  // Check if the request succeeded
  if (!response.ok) {
    console.error(`API request failed with status ${response.status}`);
    process.exit(1);
  }

  const allCharacters = await response.json();
  console.log(`Total characters from API: ${allCharacters.length}`);

  // Step 3: Process the data — filter by house
  const houseMembers = allCharacters.filter(
    (character) => character.house === house
  );

  console.log(`Members of ${house}: ${houseMembers.length}`);

  // Transform the data — extract only what we need
  const simplified = houseMembers.map((character) => ({
    name: character.name,
    house: character.house,
    wizard: character.wizard,
    patronus: character.patronus || 'Unknown',
    actor: character.actor || 'Unknown',
  }));

  // Step 4: Save results to a file
  const output = {
    house: house,
    memberCount: simplified.length,
    fetchedAt: new Date().toISOString(),
    members: simplified,
  };

  const outputPath = `data/${house.toLowerCase()}-members.json`;
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nResults saved to ${outputPath}`);

  // Print a preview
  console.log('\nFirst 3 members:');
  simplified.slice(0, 3).forEach((member) => {
    console.log(`  - ${member.name} (Patronus: ${member.patronus})`);
  });
}

main().catch((error) => {
  console.error('Spell failed:', error.message);
  process.exit(1);
});
```

When you run this script with `HOUSE=Gryffindor` in your `.env` file:

```bash
node fetch-wizards.js
```

Output:
```
--- Fetching wizards from Gryffindor ---

Total characters from API: 402
Members of Gryffindor: 25

Results saved to data/gryffindor-members.json

First 3 members:
  - Harry Potter (Patronus: stag)
  - Hermione Granger (Patronus: otter)
  - Ron Weasley (Patronus: Jack Russell terrier)
```

And it creates a JSON file at `data/gryffindor-members.json` with the full structured results.

<!-- VOICE: cache_id="cameo_hagrid" -->
### TRY (BUILD)

<!-- VOICE: cache_id="exercise_intro" -->
This is the capstone exercise for Modules 1 through 4. You will build a complete script from scratch that ties together everything you have learned:

- **Module 1**: Understanding what code does and how programs work
- **Module 2**: APIs, HTTP requests, and JSON data
- **Module 3**: Data transformation and filtering
- **Module 4**: Environment setup, dependencies, and file I/O

**The Assignment: The Hogwarts Registry**

Build a script called `hogwarts-registry.js` that does the following:

1. Reads a secret house name from your `.env` file
2. Fetches all characters from the HP API (`https://hp-api.onrender.com/api/characters`)
3. Filters characters to only include members of that house who are wizards
4. Sorts them alphabetically by name
5. Saves the results to a JSON file in the `data/` folder
6. Prints a summary to the console

**Step-by-step instructions:**

```bash
# Make sure you're in your project folder
cd ~/Desktop/hogwarts-automation

# Ensure your .env has the HOUSE variable
cat .env
# Should show: HOUSE=Gryffindor (or whichever house you want)

# Create the script file
touch scripts/hogwarts-registry.js
```

Now open `scripts/hogwarts-registry.js` in your code editor and write the script. Here is the skeleton to get you started:

```javascript
// hogwarts-registry.js — The Hogwarts Registry
// Capstone exercise: Modules 1-4

const fs = require('fs');
require('dotenv').config();

async function main() {
  // 1. Read the house from .env
  const house = process.env.HOUSE;
  if (!house) {
    console.error('No HOUSE found in .env — the Sorting Hat is silent.');
    process.exit(1);
  }
  console.log(`Consulting the Hogwarts Registry for ${house}...\n`);

  // 2. Fetch all characters from the HP API
  //    Use: https://hp-api.onrender.com/api/characters
  //    Hint: const response = await fetch(url);
  //    Hint: const characters = await response.json();

  // YOUR CODE HERE

  // 3. Filter: only wizards from the specified house
  //    Hint: .filter() with two conditions — house match AND wizard === true

  // YOUR CODE HERE

  // 4. Sort alphabetically by name
  //    Hint: .sort((a, b) => a.name.localeCompare(b.name))

  // YOUR CODE HERE

  // 5. Transform: extract name, patronus, and ancestry for each character
  //    Hint: .map() to create a new object with only the fields you want

  // YOUR CODE HERE

  // 6. Save to file
  //    Create an output object with: house, count, timestamp, and the member list
  //    Write it to: data/<house>-registry.json

  // YOUR CODE HERE

  // 7. Print a summary
  //    Show: house name, total count, and list each member's name and patronus

  // YOUR CODE HERE
}

main().catch((error) => {
  console.error('The spell backfired:', error.message);
  process.exit(1);
});
```

**Run your completed script:**

```bash
node scripts/hogwarts-registry.js
```

**Expected output** (if HOUSE=Gryffindor):

```
Consulting the Hogwarts Registry for Gryffindor...

Fetched 402 characters from the HP API.
Found 21 wizards in Gryffindor.

--- Gryffindor Wizard Registry ---
  1. Albus Dumbledore — Patronus: phoenix
  2. Angelina Johnson — Patronus: Unknown
  3. Dean Thomas — Patronus: Unknown
  ...

Registry saved to data/gryffindor-registry.json
```

**Bonus challenges (optional):**

- Change the `HOUSE` variable in `.env` to `Slytherin` and run it again — you should get a different output file
- Add a second `.env` variable called `SHOW_ACTORS=true` and conditionally include actor names in the output
- Add error handling for when the API is unreachable (wrap the fetch in a try/catch)

**Validation:** Your script is working correctly if:
- It reads from `.env` without hardcoded values
- It successfully fetches data from the API
- The output file contains only wizards from the specified house
- The members are sorted alphabetically
- The JSON file is properly formatted (not all on one line)

<!-- VOICE: cache_id="cameo_mcgonagall" -->
### CHECKPOINT

You should be able to answer these questions:

- [ ] What is the basic pattern of every automation script? (four steps)
- [ ] Why do you need `async/await` when making API calls?
- [ ] What does `fs.writeFileSync` do?
- [ ] What does `process.exit(1)` signal?
- [ ] Can you modify your script to filter a different house just by changing `.env`?

---

<!-- VOICE: cache_id="module_complete" -->
## Module 4 Summary

You now have a fully prepared wand. Here is what you set up and learned:

| Lesson | What You Learned | HP Metaphor |
|--------|-----------------|-------------|
| **Lesson 1** | Core tools: terminal, editor, Node.js, Git | Ollivander's shop — choosing your wand |
| **Lesson 2** | Project structure, npm init, .env files | Room of Requirement — a workspace that has everything you need |
| **Lesson 3** | npm packages, dependencies, node_modules | Potions ingredients — pre-made spells to combine |
| **Lesson 4** | Writing and running complete scripts | First spell cast — real magic at last |

**Key commands to remember:**

```bash
npm init -y              # Initialize a project (create package.json)
npm install <package>    # Add a dependency
node <script.js>         # Run a script
cat .env                 # View your secrets (locally only!)
```

**The fundamental automation pattern:**

```
Load Config → Fetch Data → Process Data → Output Results
```

Every automation you will ever build — from simple scripts to complex multi-platform workflows — follows this pattern. The tools change, the APIs change, the data changes, but the pattern is always the same.

You have your wand. You have cast your first spell. In Module 5, you will learn to use it for increasingly powerful magic.

---

*Next up: Module 5 — where we move from scripting into building real automation workflows.*
