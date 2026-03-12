<!-- Author: Kevin Dubon -->

# Module 3: The Owl Post Network -- Working with APIs

---

## Module Overview

**Theme:** APIs are the Owl Post system of the wizarding world. You write an address (URL), send an owl (request), and get a reply (response). The Hogwarts Owl Post Office handles thousands of messages a day -- and so do modern APIs.

**Why this module matters:** APIs are the connective tissue of every automation you will ever build. Without APIs, your tools are isolated islands -- wands locked in Ollivander's shop, never reaching a wizard's hand. This module takes you from "what's an API?" to building a real data report using live API calls against the Harry Potter API.

**Prerequisites:** Module 2 (Potion Ingredients -- Data & JSON) quiz passed.

**Lessons:**

| # | Title | Type | Exercises |
|---|-------|------|-----------|
| 1 | What Is an API? (The Owl Post Office) | Concept | -- |
| 2 | HTTP Methods & Status Codes (Owl Instructions) | Concept | -- |
| 3 | Making Your First API Call (Sending Your First Owl) | Hands-on | DO: Fetch all characters |
| 4 | Query Parameters & Filtering (Addressing Your Owl) | Hands-on | DO: Fetch your house, count alive vs dead |
| 5 | Working with API Responses (Reading the Reply) | Hands-on | BUILD: Filter spells, BUILD: Extract wand data |
| 6 | Building an API Report (The Daily Prophet) | Capstone | BUILD: House Comparison Report |

**Live API Used:** [HP-API](https://hp-api.onrender.com) -- a free, open-source Harry Potter API.

---

> **IMPORTANT -- API Cold Start Warning**
>
> The HP-API runs on Render's free tier. If the API has been idle, your first request may take **30-60 seconds** while the server "wakes up." This is normal -- think of it as the owls stretching their wings after a nap.
>
> **If a request times out:**
> 1. Wait 30 seconds and try again.
> 2. If it fails three times, the API may be temporarily down.
> 3. Use the cached fallback data in `references/hp-api-reference.md` to continue exercises offline.
>
> The helper script at `scripts/hp-api-exercises.js` has built-in retry logic (3 attempts, 5-second delay). Use it when available.

---

## Lesson 1: What Is an API? (The Owl Post Office)

**Exercise ID:** `m3_l1`

---

### HOOK

Picture this: You're sitting in the Gryffindor common room and you need to know what's on the Hogwarts lunch menu. You could walk all the way down to the kitchens, tickle the pear painting, and ask the house-elves yourself. Or -- you could send an owl.

You scribble a note: *"What's for lunch?"* You tie it to Hedwig's leg. She flies to the kitchens. A house-elf reads your note, scribbles back *"Shepherd's pie, treacle tart, and pumpkin juice,"* and Hedwig brings the reply right back to you.

Congratulations. You just made an API call.

---

### TEACH

**API** stands for **Application Programming Interface**. Strip away the jargon and it means one thing: *a way for two programs to talk to each other.*

Here is the Owl Post metaphor, and it maps perfectly:

| Owl Post Concept | API Concept | What It Means |
|-----------------|-------------|---------------|
| The Owl Post Office | The API Server | The system that receives and processes requests |
| Your letter | The Request | What you're asking for |
| The address on the envelope | The URL (endpoint) | Where your request goes |
| The reply tied to the owl's leg | The Response | What comes back |
| Hedwig (the owl) | HTTP (the protocol) | The delivery mechanism |
| "What's for lunch?" | GET request | Asking for information |
| "Please add me to the Quidditch roster" | POST request | Sending new information |

**The Request/Response Cycle:**

```
YOU (Client)                              API SERVER
    |                                         |
    |  --- "GET /api/characters" ---------->  |
    |       (Send owl with request)           |
    |                                         |  [Server processes request]
    |  <-- 200 OK + JSON data -------------  |
    |       (Owl returns with response)       |
    |                                         |
```

Every API interaction follows this same cycle: **request out, response back.** Always. Even the most complex automation you will ever build is just a series of these exchanges, chained together.

**URLs as Addresses:**

Just like every owl needs an address to deliver a letter, every API call needs a URL. Let's break one down:

```
https://hp-api.onrender.com/api/characters/house/gryffindor
|____| |__________________| |________________________________|
  |           |                           |
Protocol    Host                        Path (endpoint)
(how)     (where)                    (what you want)
```

- **Protocol** (`https://`): The language the owl speaks. HTTPS means it's encrypted -- like a Fidelius Charm for your data.
- **Host** (`hp-api.onrender.com`): The building where the Owl Post Office is located.
- **Path** (`/api/characters/house/gryffindor`): The specific mailbox you're addressing. This tells the server exactly what data you want.

**Why APIs matter for automation:**

Every tool you will connect in your automation career -- Slack, Google Sheets, Notion, Bullhorn, Deel -- they all expose APIs. When you connect two tools in n8n or Zapier, you are not performing magic. You are sending owls back and forth between their Owl Post Offices. Understanding how this works at the fundamental level is the difference between copying someone else's workflow and building your own from scratch.

---

### SHOW

Here is the simplest possible API call, shown two ways:

**In your browser (yes, really):**
Open a new tab and paste this URL:
```
https://hp-api.onrender.com/api/spells
```

That's it. Your browser just made a GET request. The JSON you see is the response. You just sent an owl and got a reply. Every character, every spell, right there.

**In JavaScript:**
```javascript
// The simplest API call in JavaScript
const response = await fetch('https://hp-api.onrender.com/api/spells');
const spells = await response.json();
console.log(spells[0]);
// Output: { id: "...", name: "Expelliarmus", description: "Disarming Charm" }
```

Two lines. That's all it takes to reach across the internet and pull data from another system.

---

### TRY

<!-- VOICE: cache_id="exercise_intro" -->
Think about this before we move on:

Name three real-world situations where you interact with something that works like an API (request/response pattern) -- but not on a computer. Think about restaurants, libraries, vending machines, anything.

For each one, identify:
1. What is the **request**?
2. What is the **response**?
3. What is the **"server"** that processes it?

Share your three examples and we will see how they map to API concepts.

---

### CHECKPOINT

Quick check before we proceed:

**An API is best described as:**
- (A) A programming language for building websites
- (B) A way for two programs to communicate with each other
- (C) A database that stores information
- (D) A type of web browser

---

## Lesson 2: HTTP Methods & Status Codes (Owl Instructions)

**Exercise ID:** `m3_l2`

---

### HOOK

Not all owl post is created equal. Some letters ask for information ("Dear Flourish & Blotts, do you have Advanced Potion-Making in stock?"). Some letters send information ("Dear Ministry, enclosed please find my Apparition license application"). Some letters say "update my address" and some -- well, some are Howlers that destroy things.

HTTP methods are the instructions tied to the owl's leg that tell the recipient what kind of message this is and what to do with it.

---

### TEACH

**The Four Main HTTP Methods:**

Think of these as four different colored owls, each trained for a specific type of delivery:

| HTTP Method | Owl Color | Purpose | Real Example |
|------------|-----------|---------|-------------|
| **GET** | White Owl (Hedwig) | Fetch/retrieve data | "Show me all Gryffindor students" |
| **POST** | Brown Owl | Send/create new data | "Add this new student to the roster" |
| **PUT** | Tawny Owl | Update existing data | "Change Harry's status from student to Auror" |
| **DELETE** | Black Owl (ominous) | Remove data | "Remove this student's enrollment" (Howler energy) |

**GET** is by far the most common. Every time you load a webpage, your browser sends dozens of GET requests. In automation, most of what you do starts with GET -- fetching data from one system to send to another.

**POST** is the second most common. When you fill out a form and hit submit, that's a POST. When your automation creates a new record in a database, that's a POST.

**PUT** and **DELETE** round out the set. Together, these four methods give you **CRUD** -- Create (POST), Read (GET), Update (PUT), Delete (DELETE). Every data operation in existence falls into one of these categories.

**Status Codes -- The Owl's Return Message:**

When your owl comes back, it carries a number that tells you what happened. You do not need to memorize hundreds of codes. You need to know five:

| Status Code | Meaning | Owl Post Translation |
|------------|---------|---------------------|
| **200** | OK -- Success | Owl delivered the letter and brought back a reply. Everything worked. |
| **201** | Created | Owl delivered your application and a new record was created. Welcome to Hogwarts! |
| **400** | Bad Request | Owl returned confused. Your letter didn't make sense. Check your request format. |
| **404** | Not Found | Owl couldn't find the address. The endpoint doesn't exist. |
| **500** | Internal Server Error | The owl made it there, but the Owl Post Office caught fire. Server-side problem, not your fault. |

**The pattern is simple:**
- **2xx** = Success (owls flying smoothly)
- **4xx** = Client error (YOU made a mistake -- bad address, bad format, unauthorized)
- **5xx** = Server error (THEY have a problem -- the server is down or broken)

**Headers -- Instructions Tied to the Owl's Leg:**

Beyond the letter itself, you can attach instructions to the owl. These are **headers** -- metadata about the request:

```
Content-Type: application/json      → "This letter is written in JSON format"
Authorization: Bearer abc123        → "Here's my ID badge -- I'm allowed to read this"
Accept: application/json            → "Please write the reply in JSON format"
```

The HP-API doesn't require authorization (it's an open Owl Post Office -- anyone can send a letter), but most production APIs do. We will cover authentication in later modules.

---

### SHOW

Let's see status codes in action:

```javascript
// A successful request -- 200 OK
const goodResponse = await fetch('https://hp-api.onrender.com/api/spells');
console.log('Status:', goodResponse.status);       // 200
console.log('Status Text:', goodResponse.statusText); // "OK"

// A request to a non-existent endpoint -- 404 Not Found
const badResponse = await fetch('https://hp-api.onrender.com/api/broomsticks');
console.log('Status:', badResponse.status);       // 404
console.log('Status Text:', badResponse.statusText); // "Not Found"
```

**Reading the response properly:**
```javascript
const response = await fetch('https://hp-api.onrender.com/api/characters/students');

// Always check if the request succeeded before parsing
if (response.ok) {  // response.ok is true for any 2xx status
  const students = await response.json();
  console.log(`Found ${students.length} students!`);
} else {
  console.error(`Request failed with status ${response.status}: ${response.statusText}`);
}
```

That `if (response.ok)` check is the wizarding equivalent of making sure the owl actually came back alive before reading the letter. You would be surprised how many people skip this step and then wonder why their automation blows up at 3am.

---

### TRY

Match each scenario to the correct HTTP method and predict the status code:

1. You ask the Hogwarts library API for all books about dragons.
2. You submit a new student enrollment form to the Ministry API, but you forgot to include the student's name.
3. You send a request to update Neville's Herbology grade, and it works.
4. You try to access the secret Auror files API but you do not have permission.
5. You ask for the Quidditch schedule, but the server is undergoing maintenance.

For each, state: **Method** (GET/POST/PUT/DELETE) and **Expected Status Code**.

---

### CHECKPOINT

**A 404 status code means:**
- (A) The server crashed
- (B) You are not authorized
- (C) The endpoint/resource was not found
- (D) The request was successful

---

<!-- VOICE: cache_id="peeves_interrupt" -->
## Lesson 3: Making Your First API Call (Sending Your First Owl)

**Exercise ID:** `m3_l3`

---

### HOOK

Enough theory. It is time to send your first owl.

You have been studying the Owl Post handbook, you have memorized the addresses, you have learned about the different colored owls. But none of that matters until you actually tie a letter to an owl's leg and let it fly.

Right now, there are 403 characters from the Harry Potter universe sitting in a database, waiting for you to ask for them. Let's go get them.

---

### TEACH

**Two Ways to Make API Calls:**

**1. `fetch()` in JavaScript** -- This is the modern standard. It is built into Node.js (v18+) and every browser. It is what you will use in n8n Code nodes, Supabase Edge Functions, and most automation scripts.

```javascript
// The anatomy of a fetch call
const response = await fetch('https://hp-api.onrender.com/api/characters');
//                     ^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                     The     The URL -- where you're sending the owl
//                     function

const data = await response.json();
//                 ^^^^^^^^^^^^^^^^
//                 Parse the response from raw text into a JavaScript object
//                 (Like translating the owl's reply from Parseltongue into English)

console.log(data.length);  // How many characters came back?
```

**Important:** `fetch()` is asynchronous. The `await` keyword means "wait for the owl to come back before continuing." Without `await`, your code would try to read the reply before the owl has returned -- like ripping open an empty envelope.

**2. `curl` from the command line** -- This is the quick-and-dirty way. Great for testing endpoints before writing code:

```bash
# Fetch all spells and pretty-print the JSON
curl -s https://hp-api.onrender.com/api/spells | head -20
```

The `-s` flag means "silent" -- it suppresses the progress bar. Think of it as telling the owl to fly quietly.

**Reading a JSON Response:**

When the owl comes back, it carries JSON. You already know JSON from Module 2. Here is what a single character looks like:

```json
{
  "id": "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
  "name": "Harry Potter",
  "species": "human",
  "house": "Gryffindor",
  "wizard": true,
  "alive": true,
  "wand": {
    "wood": "holly",
    "core": "phoenix feather",
    "length": 11
  },
  "patronus": "stag"
}
```

The full response from `/api/characters` is an **array** of 403 of these objects. That is 403 owls arriving at once. Your job is to catch them all and make sense of the data.

---

### SHOW

Here is a complete, runnable script that fetches all characters and reports basic statistics:

```javascript
// Sending your first owl -- fetch all HP characters
const response = await fetch('https://hp-api.onrender.com/api/characters');

// Check the owl came back successfully
if (!response.ok) {
  console.error(`Owl crashed! Status: ${response.status}`);
} else {
  const characters = await response.json();

  console.log(`Total characters received: ${characters.length}`);
  console.log(`First character: ${characters[0].name}`);
  console.log(`Last character: ${characters[characters.length - 1].name}`);

  // Quick breakdown
  const wizards = characters.filter(c => c.wizard);
  const humans = characters.filter(c => c.species === 'human');
  console.log(`Wizards: ${wizards.length}`);
  console.log(`Humans: ${humans.length}`);
}
```

**Using curl:**
```bash
# Count all characters (pipe JSON into node for counting)
curl -s https://hp-api.onrender.com/api/characters | node -e "
  let data = '';
  process.stdin.on('data', chunk => data += chunk);
  process.stdin.on('end', () => {
    const chars = JSON.parse(data);
    console.log('Total characters:', chars.length);
  });
"
```

---

### TRY

<!-- VOICE: cache_id="cameo_hagrid" -->
**Exercise: Send Your First Owl (DO -- 25 points)**

**Exercise ID:** `m3_e1_first_owl`

This is your first live API exercise. You are going to reach across the internet and pull data from the Harry Potter API.

**Your mission:**
1. Use `fetch()` to call `https://hp-api.onrender.com/api/characters`
2. Parse the JSON response
3. Count the total number of characters
4. Print the count to the console
5. **Bonus:** Print the names of the first 5 characters

Write and run your code. Tell me:
- How many characters did the API return?
- What are the first 5 names?

**Hints (only if you need them):**
- Remember: `await fetch(url)` gets the response, `.json()` parses it
- The response is an array -- use `.length` to count
- Use `.slice(0, 5)` and `.map(c => c.name)` for the first 5 names

> **Cold start note:** If the request hangs for 30+ seconds, the API server is waking up. This is normal. Wait for it -- your owl is just flying through a storm.

---

### CHECKPOINT

**What does `await response.json()` do?**
- (A) Sends the request to the server
- (B) Converts the response body from raw text into a JavaScript object
- (C) Checks if the response status is 200
- (D) Formats the output as a JSON string

---

## Lesson 4: Query Parameters & Filtering (Addressing Your Owl)

**Exercise ID:** `m3_l4`

---

### HOOK

Imagine shouting into the Hogwarts Owlery: "BRING ME EVERY LETTER EVER SENT!" and 10,000 owls descend on you at once. Feathers everywhere. Parchment chaos. Errol is in the corner having a breakdown.

That is what happens when you call `/api/characters` with no filtering. You get everything. All 403 characters. Sometimes you want that, but usually you want something more specific: "Just the Slytherins, please."

This is where path parameters and query parameters come in -- they let you address your owl with precision.

---

### TEACH

**Path Parameters -- The Street Address:**

Some APIs let you filter by putting values directly in the URL path:

```
https://hp-api.onrender.com/api/characters/house/gryffindor
                                                  ^^^^^^^^^^
                                                  This is a path parameter
```

The HP-API uses path parameters for house filtering. The structure is:
```
/api/characters/house/{houseName}
```

Where `{houseName}` is one of: `gryffindor`, `slytherin`, `ravenclaw`, `hufflepuff` (always lowercase).

**Path parameters vs Query parameters:**

| Type | Syntax | Example | Use Case |
|------|--------|---------|----------|
| **Path** | Part of the URL | `/house/gryffindor` | Identifying a specific resource |
| **Query** | After `?`, key=value pairs | `?species=human&alive=true` | Filtering, sorting, pagination |

**Query parameters** use `?` to start and `&` to chain multiple filters:
```
https://api.example.com/characters?house=gryffindor&alive=true&sort=name
                                  ^                 ^          ^
                                  First param       Second     Third
```

The HP-API does not support query parameters for filtering (it uses path-based routing instead), but you will encounter query parameters constantly in production APIs like Slack, Notion, and Google Sheets. The concept is the same: you are narrowing your request to get exactly the data you need instead of everything.

**Client-Side Filtering:**

When an API does not offer server-side filtering (or when you need more complex logic), you filter the response yourself using JavaScript:

```javascript
const response = await fetch('https://hp-api.onrender.com/api/characters');
const everyone = await response.json();

// Client-side filtering
const gryffindors = everyone.filter(c => c.house === 'Gryffindor');
const aliveWizards = everyone.filter(c => c.alive && c.wizard);
const withPatronus = everyone.filter(c => c.patronus !== '');
```

**Server-side filtering** (path/query params) is faster because the server does the work. **Client-side filtering** is more flexible because you control the logic. In practice, you use both.

---

### SHOW

Here is how to fetch characters from a specific house and analyze them:

```javascript
// Fetch only Slytherin characters using path parameter
const response = await fetch('https://hp-api.onrender.com/api/characters/house/slytherin');
const slytherins = await response.json();

console.log(`Total Slytherins: ${slytherins.length}`);

// Now filter client-side for more specific analysis
const alive = slytherins.filter(c => c.alive);
const dead = slytherins.filter(c => !c.alive);
const pureBlood = slytherins.filter(c => c.ancestry === 'pure-blood');

console.log(`Alive: ${alive.length}`);
console.log(`Dead: ${dead.length}`);
console.log(`Pure-blood: ${pureBlood.length}`);

// List the dead Slytherins (it's a long list)
console.log('Fallen Slytherins:', dead.map(c => c.name).join(', '));
```

**Multiple filter conditions:**
```javascript
// Characters who are alive, wizards, AND have a patronus
const response = await fetch('https://hp-api.onrender.com/api/characters');
const all = await response.json();

const eliteWizards = all.filter(c =>
  c.alive &&
  c.wizard &&
  c.patronus !== '' &&
  c.house !== ''
);

console.log(`Elite wizards (alive, magical, with patronus, sorted): ${eliteWizards.length}`);
eliteWizards.forEach(c => {
  console.log(`  ${c.name} (${c.house}) -- Patronus: ${c.patronus}`);
});
```

---

### TRY

<!-- VOICE: cache_id="exercise_intro" -->
**Exercise: Your House Census (DO -- 25 points)**

**Exercise ID:** `m3_e2_house_census`

Time to investigate your own house. (If you have not been sorted yet, pick whichever house speaks to you -- or use `gryffindor` as default.)

**Your mission:**
1. Fetch all characters from YOUR house: `https://hp-api.onrender.com/api/characters/house/{your_house}`
2. Count the total number of characters in your house
3. Filter and count how many are **alive** vs **dead**
4. Print the results in this format:

```
House Census: {House}
Total members: {X}
Alive: {X}
Dead: {X}
Survival rate: {X}%
```

**Expected code pattern:**
```javascript
const response = await fetch('https://hp-api.onrender.com/api/characters/house/{your_house}');
const characters = await response.json();
const alive = characters.filter(c => c.alive);
const dead = characters.filter(c => !c.alive);
// ... calculate and print
```

Tell me your house, the counts, and the survival rate when you are done.

---

### CHECKPOINT

**What is the difference between a path parameter and a query parameter?**
- (A) Path parameters are faster, query parameters are slower
- (B) Path parameters are part of the URL path, query parameters come after `?`
- (C) Path parameters are for POST, query parameters are for GET
- (D) There is no difference, they are the same thing

---

## Lesson 5: Working with API Responses (Reading the Reply)

**Exercise ID:** `m3_l5`

---

### HOOK

Your owl is back. It is carrying a scroll that is three feet long, covered in tiny handwriting, with nested bullet points and sub-lists and a diagram in the margin that might be a Hippogriff or might be a data structure. You squint at it. "What am I supposed to do with all this?"

Welcome to the reality of working with API responses. The data comes back structured, but it is up to you to navigate it, dig out what you need, and reshape it into something useful. This is where Module 2's JSON knowledge pays off.

---

### TEACH

**Navigating Nested Data:**

API responses are rarely flat. The HP-API character object has nested data -- most notably the `wand` object:

```javascript
const harry = characters[0];

// Top-level access -- simple
console.log(harry.name);        // "Harry Potter"
console.log(harry.house);       // "Gryffindor"
console.log(harry.alive);       // true

// Nested access -- one level deeper
console.log(harry.wand.wood);   // "holly"
console.log(harry.wand.core);   // "phoenix feather"
console.log(harry.wand.length); // 11

// Array access
console.log(harry.alternate_names[0]); // "The Boy Who Lived"
```

**The dot notation chain:** `harry.wand.core` means "start at `harry`, go into `wand`, then get `core`." Each dot goes one level deeper. It is like navigating Hogwarts: castle (harry) > dungeon corridor (wand) > specific room (core).

**Handling Missing Data:**

Not every character has complete data. Some wands have empty strings, some patronuses are blank, some fields are null. If you try to access a property on undefined, your code explodes:

```javascript
// DANGEROUS -- if wand.wood is empty string or null
const wandInfo = character.wand.wood; // Could be ""

// SAFER -- check before accessing
const wandWood = character.wand?.wood || 'unknown';
//                              ^
//                    Optional chaining -- returns undefined
//                    instead of crashing if wand is null
```

**Extracting Specific Fields with `.map()`:**

When you have an array of complex objects but only need certain fields, `.map()` creates a new array with just what you want:

```javascript
// Full character objects are huge -- extract just what you need
const roster = characters.map(c => ({
  name: c.name,
  house: c.house,
  alive: c.alive
}));
// Now you have a clean array of {name, house, alive} objects
```

**Chaining `.filter()` and `.map()`:**

This is where it gets powerful. Chain them together to filter first, then reshape:

```javascript
// Get names and wands of living Gryffindors who have wand data
const wandReport = characters
  .filter(c => c.house === 'Gryffindor' && c.alive)
  .filter(c => c.wand && c.wand.wood !== '')
  .map(c => ({
    name: c.name,
    wand: `${c.wand.wood} wood, ${c.wand.core}, ${c.wand.length}"`
  }));
```

Filter narrows the list. Map reshapes what remains. Together, they are the Reducto + Accio combo of data manipulation.

---

### SHOW

**Example 1: Navigating nested spell data**

```javascript
const response = await fetch('https://hp-api.onrender.com/api/spells');
const spells = await response.json();

// Find all spells that are "charms" based on description
const charms = spells.filter(s =>
  s.description.toLowerCase().includes('charm')
);

console.log(`Total spells: ${spells.length}`);
console.log(`Charms found: ${charms.length}`);
console.log('Charm list:');
charms.forEach(s => {
  console.log(`  ${s.name} -- ${s.description}`);
});
```

**Example 2: Building structured output from nested data**

```javascript
const response = await fetch('https://hp-api.onrender.com/api/characters/house/ravenclaw');
const ravenclaws = await response.json();

// Extract wand data, handling missing values
const wandData = ravenclaws
  .filter(c => c.wand && c.wand.wood && c.wand.wood !== '')
  .map(c => ({
    name: c.name,
    wand: {
      wood: c.wand.wood,
      core: c.wand.core || 'unknown core',
      length: c.wand.length || 'unknown length'
    }
  }));

console.log(`Ravenclaws with known wands: ${wandData.length}/${ravenclaws.length}`);
console.log(JSON.stringify(wandData, null, 2));
```

---

### TRY

This lesson has TWO exercises. Both use the live HP-API.

---

**Exercise 1: Charm Finder (BUILD -- 35 points)**

**Exercise ID:** `m3_e3_charm_finder`

**Your mission:**
1. Fetch all spells from `https://hp-api.onrender.com/api/spells`
2. Filter for spells whose **description** contains the word "charm" (case-insensitive)
3. Print each matching spell's name and description
4. Print the total count of charms found

**Expected output format:**
```
=== Charm Finder ===
Found X charms out of Y total spells:

1. Alohomora -- Unlocking Charm
2. Expelliarmus -- Disarming Charm
... (etc)
```

**Hints (only if stuck):**
- Use `.toLowerCase().includes('charm')` for case-insensitive matching
- Filter first, then iterate with `.forEach()` or `.map()`
- The `description` field is where you search, not `name`

---

**Exercise 2: Ollivander's Inventory (BUILD -- 35 points)**

**Exercise ID:** `m3_e4_wand_data`

**Your mission:**
1. Fetch characters from any house (your choice): `https://hp-api.onrender.com/api/characters/house/{house}`
2. Filter to only characters who have wand data (where `wand.wood` is NOT an empty string)
3. Build an array of objects with this shape: `{ name: "...", wand: { wood: "...", core: "...", length: ... } }`
4. Print the results as formatted JSON

**Expected output format:**
```
=== Ollivander's Inventory: {House} ===
{X} wands catalogued out of {Y} house members:

[
  {
    "name": "Harry Potter",
    "wand": {
      "wood": "holly",
      "core": "phoenix feather",
      "length": 11
    }
  },
  ...
]
```

**Hints (only if stuck):**
- `c.wand.wood !== ''` filters for characters with known wand wood
- `.map()` to reshape each character into the target format
- `JSON.stringify(result, null, 2)` for pretty printing

---

### CHECKPOINT

**What does `.filter(c => c.alive).map(c => c.name)` produce?**
- (A) An array of character objects that are alive
- (B) An array of names of characters that are alive
- (C) A single character name
- (D) An error, because you cannot chain filter and map

---

## Lesson 6: Building an API Report (The Daily Prophet)

**Exercise ID:** `m3_l6`

---

### HOOK

*EXTRA! EXTRA! Read all about it!*

The Daily Prophet does not just print raw owl post on its pages. Reporters take information from dozens of sources, cross-reference it, aggregate the numbers, and turn it into a story that means something. That is what you are about to do.

You have spent five lessons learning to send individual owls and read individual replies. Now you are going to become a journalist -- pulling data from multiple endpoints, crunching the numbers, and producing something that tells a complete story.

This is the capstone of Module 3. Everything you have learned comes together here.

---

### TEACH

**Combining Multiple API Calls:**

Real automation rarely involves a single API call. You fetch data from System A, cross-reference it with System B, transform it, and push it to System C. It starts with knowing how to make multiple calls and combine the results.

```javascript
// Sequential calls -- one after another
const charsResponse = await fetch('https://hp-api.onrender.com/api/characters');
const characters = await charsResponse.json();

const spellsResponse = await fetch('https://hp-api.onrender.com/api/spells');
const spells = await spellsResponse.json();

// Now you have both datasets in memory
console.log(`${characters.length} characters and ${spells.length} spells loaded.`);
```

**Parallel calls with `Promise.all()`:**

When calls do not depend on each other, run them simultaneously. Why send owls one at a time when you can release a whole flock?

```javascript
// Parallel calls -- all four houses at once
const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];

const responses = await Promise.all(
  houses.map(house =>
    fetch(`https://hp-api.onrender.com/api/characters/house/${house}`)
  )
);

const houseData = await Promise.all(
  responses.map(res => res.json())
);

// houseData[0] = gryffindor, [1] = slytherin, [2] = ravenclaw, [3] = hufflepuff
```

This is significantly faster than sequential calls -- like sending four owls simultaneously instead of waiting for each one to return before sending the next.

**Aggregating Data:**

Once you have raw data, you need to compute meaningful metrics:

```javascript
function analyzeHouse(characters) {
  return {
    total: characters.length,
    alive: characters.filter(c => c.alive).length,
    dead: characters.filter(c => !c.alive).length,
    wizards: characters.filter(c => c.wizard).length,
    withPatronus: characters.filter(c => c.patronus && c.patronus !== '').length,
    withWand: characters.filter(c => c.wand && c.wand.wood && c.wand.wood !== '').length
  };
}
```

**Formatting Output:**

Raw numbers are not a report. A report tells a story:

```javascript
function formatReport(houseName, stats) {
  const survivalRate = ((stats.alive / stats.total) * 100).toFixed(1);
  const patronusRate = ((stats.withPatronus / stats.total) * 100).toFixed(1);

  return `
  ${houseName.toUpperCase()}
  ${'='.repeat(30)}
  Total Members:     ${stats.total}
  Alive:             ${stats.alive} (${survivalRate}% survival)
  Dead:              ${stats.dead}
  Wizards:           ${stats.wizards}
  Have Patronus:     ${stats.withPatronus} (${patronusRate}%)
  Have Known Wand:   ${stats.withWand}
  `;
}
```

---

### SHOW

Here is a complete report-building script that pulls everything together:

```javascript
// The Daily Prophet -- House Comparison Report
// Fetches data from all four houses and builds a comparative analysis

const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];

// Fetch all houses in parallel
const responses = await Promise.all(
  houses.map(house =>
    fetch(`https://hp-api.onrender.com/api/characters/house/${house}`)
  )
);

const houseData = await Promise.all(
  responses.map(res => res.json())
);

// Build report
console.log('=============================================');
console.log('   THE DAILY PROPHET -- HOUSE CENSUS REPORT  ');
console.log('=============================================\n');

const report = {};

houses.forEach((house, index) => {
  const chars = houseData[index];
  const stats = {
    total: chars.length,
    alive: chars.filter(c => c.alive).length,
    dead: chars.filter(c => !c.alive).length,
    wizards: chars.filter(c => c.wizard).length,
    withPatronus: chars.filter(c => c.patronus && c.patronus !== '').length
  };

  report[house] = stats;

  const survivalRate = ((stats.alive / stats.total) * 100).toFixed(1);

  console.log(`  ${house.toUpperCase()}`);
  console.log(`  ${'-'.repeat(25)}`);
  console.log(`  Total:      ${stats.total}`);
  console.log(`  Alive:      ${stats.alive} (${survivalRate}%)`);
  console.log(`  Dead:       ${stats.dead}`);
  console.log(`  Wizards:    ${stats.wizards}`);
  console.log(`  Patronus:   ${stats.withPatronus}`);
  console.log('');
});

// Summary comparison
console.log('=============================================');
console.log('   COMPARATIVE ANALYSIS');
console.log('=============================================\n');

const mostPopulous = houses.reduce((a, b) =>
  report[a].total > report[b].total ? a : b
);
const highestSurvival = houses.reduce((a, b) =>
  (report[a].alive / report[a].total) > (report[b].alive / report[b].total) ? a : b
);
const mostPatronus = houses.reduce((a, b) =>
  report[a].withPatronus > report[b].withPatronus ? a : b
);

console.log(`  Largest House:          ${mostPopulous} (${report[mostPopulous].total} members)`);
console.log(`  Highest Survival Rate:  ${highestSurvival} (${((report[highestSurvival].alive / report[highestSurvival].total) * 100).toFixed(1)}%)`);
console.log(`  Most Patronuses:        ${mostPatronus} (${report[mostPatronus].withPatronus})`);
console.log('\n=============================================');
console.log('  End of Report -- Ministry File #HP-403');
console.log('=============================================');
```

Notice the structure: **Fetch -> Analyze -> Format -> Present.** This is the pattern for every data automation you will ever build. The tools change (n8n instead of raw fetch, Google Sheets instead of console.log), but the pattern is eternal.

---

### TRY

<!-- VOICE: cache_id="exercise_intro" -->
**Exercise: The Daily Prophet -- House Comparison Report (BUILD -- 35 points)**

**Exercise ID:** `m3_e5_daily_prophet`

This is the capstone exercise for Module 3. You are going to build a complete report that would make Rita Skeeter jealous (though hopefully more accurate).

**Your mission:**

Build a "House Comparison Report" that does the following:

1. **Fetch** character data from ALL four houses (gryffindor, slytherin, ravenclaw, hufflepuff)
2. **For each house, calculate:**
   - Total number of characters
   - Number alive
   - Number dead
   - Number who are wizards (`wizard === true`)
   - Number with a patronus (`patronus` is not empty string)
3. **Format** the output as a readable report with a header, per-house breakdown, and a summary section
4. **Include at least one comparative insight** (e.g., which house has the highest survival rate, which has the most patronuses)

**Requirements:**
- Use `Promise.all()` for parallel fetching (do NOT fetch sequentially)
- Calculate survival rate as a percentage
- The report should be readable and formatted -- not just raw numbers

**Your output should look something like this (your formatting can differ):**

```
===============================================
    THE DAILY PROPHET -- HOUSE CENSUS REPORT
===============================================

GRYFFINDOR
  Members: ??  |  Alive: ??  |  Dead: ??
  Wizards: ??  |  Patronus: ??
  Survival Rate: ??%

SLYTHERIN
  Members: ??  |  Alive: ??  |  Dead: ??
  Wizards: ??  |  Patronus: ??
  Survival Rate: ??%

... (Ravenclaw and Hufflepuff)

SUMMARY
  Largest House: ??
  Most Dangerous House: ?? (lowest survival rate)
  Best at Patronus Charm: ??

===============================================
```

**Grading criteria:**
- Fetches all four houses: required
- Uses `Promise.all()`: required
- Calculates all five metrics per house: required
- Formatted output (not raw JSON dump): required
- Comparative summary section: required
- Creative presentation or additional insights: bonus style points

**Hints (only if truly stuck):**
- Start by getting one house working, then expand to all four
- `Promise.all()` takes an array of promises and returns when all complete
- `.reduce()` is helpful for finding the max/min across houses
- You can use `console.table()` for a quick tabular format, but a custom format is more impressive

Take your time on this one. This is a BUILD exercise -- the whole point is for you to construct it yourself. When you are done, share your code and output.

---

### CHECKPOINT

<!-- VOICE: cache_id="cameo_mcgonagall" -->
**Why use `Promise.all()` instead of four sequential `fetch()` calls?**
- (A) `Promise.all()` is required by the API
- (B) Sequential calls would return different data
- (C) `Promise.all()` runs the requests in parallel, making it significantly faster
- (D) There is no advantage, it is just a stylistic preference

---

<!-- VOICE: cache_id="module_complete" -->
## Module Summary

You have graduated from the Owl Post Office. Here is what you now know:

| Lesson | Key Concept | Skill Unlocked |
|--------|------------|----------------|
| 1 | APIs are request/response systems | Understand the mental model |
| 2 | HTTP methods (GET/POST/PUT/DELETE) and status codes | Read and interpret API behavior |
| 3 | Making API calls with `fetch()` | Send requests and receive data |
| 4 | Path parameters and client-side filtering | Request specific data and narrow results |
| 5 | Navigating nested JSON and chaining filter/map | Extract and reshape complex responses |
| 6 | Combining multiple API calls into reports | Build real data products from API sources |

**Skills earned this module:**
- Live API interaction using `fetch()` and `curl`
- JSON response parsing and navigation
- Data filtering with `.filter()` and reshaping with `.map()`
- Parallel API calls with `Promise.all()`
- Data aggregation and report generation

**How this connects to automation:**

Every automation workflow you will build in Modules 4-7 relies on these exact skills. When you connect Bullhorn to Slack in n8n, you are making API calls. When you sync Notion with Google Sheets, you are parsing JSON responses. When you pull data from Deel and generate a report, you are doing exactly what you did in Lesson 6 -- just with different endpoints.

The owls are the same. Only the addresses change.

---

## Exercise Reference Table

| Exercise ID | Lesson | Type | Points | Description |
|------------|--------|------|--------|-------------|
| `m3_e1_first_owl` | 3 | DO | 25 | Fetch all characters, count them |
| `m3_e2_house_census` | 4 | DO | 25 | Fetch your house, count alive vs dead |
| `m3_e3_charm_finder` | 5 | BUILD | 35 | Filter spells containing "charm" |
| `m3_e4_wand_data` | 5 | BUILD | 35 | Extract wand data from a house |
| `m3_e5_daily_prophet` | 6 | BUILD | 35 | Full house comparison report |

**Total available points this module:** 155 (exercises) + 50 (quiz) + 50 (first-try bonus) + 100 (module completion) = **355 points**

---

## API Quick Reference

**Base URL:** `https://hp-api.onrender.com`

| Endpoint | Returns | Count |
|----------|---------|-------|
| `/api/characters` | All characters | ~403 |
| `/api/characters/house/gryffindor` | Gryffindor characters | varies |
| `/api/characters/house/slytherin` | Slytherin characters | varies |
| `/api/characters/house/ravenclaw` | Ravenclaw characters | varies |
| `/api/characters/house/hufflepuff` | Hufflepuff characters | varies |
| `/api/characters/students` | All students | varies |
| `/api/characters/staff` | All staff | varies |
| `/api/spells` | All spells | ~77 |
| `/api/character/:id` | Single character by UUID | 1 |

> **If the API is down:** Use cached sample data from `references/hp-api-reference.md`. The exercises can be completed with cached data -- just replace the `fetch()` calls with hardcoded arrays from the reference file. The learning is in the filtering, mapping, and aggregation -- not in the fetching itself.

---

<!-- VOICE: cache_id="prophecy_tease" -->
*"The owls are flying. Your wand is steady. And you've just proven you can reach across the network and pull back exactly what you need. That, dear student, is real magic." -- Professor Dumbledore, after his fourth Butterbeer*
