# Module 2: Potion Ingredients -- Data Structures & JSON
<!-- Author: Kevin Dubon -->

> **Prerequisite:** Module 1 quiz passed
> **Lessons:** 5
> **Exercises:** 3 (1 DO, 2 BUILD)
> **Theme:** Data types are potion ingredients. JSON is a universal recipe format. Transformation is the brewing process.

---

## Module Introduction

*Read this to the student before starting Lesson 1:*

"Welcome to the Potions classroom. Yes, I know -- it's damp, it smells vaguely of sulfur, and Snape left passive-aggressive notes on every surface. But this is where the REAL magic happens.

In Module 1 you learned what automation is. Now we need to talk about the **stuff** that flows through automations -- DATA. Every workflow you'll ever build moves data around: names, numbers, lists, true/false flags, and complex nested structures. If automation is the spell, data is the magical energy that powers it.

Think of it this way: you can't brew a potion without ingredients. And you can't automate anything without understanding data. By the end of this module, you'll know every ingredient type, how to organize them on shelves, how to write recipes, and how to brew raw ingredients into something useful.

Let's begin."

---

## Lesson 1: Data Types (Basic Ingredients)

### HOOK

"Picture this: Neville Longbottom is in Potions class. The recipe says 'add 3 drops of Essence of Dittany.' Neville adds the word 'three' instead of the number 3. The cauldron explodes. Snape deducts 50 points.

This isn't just a Harry Potter gag -- this is EXACTLY what happens in programming when you mix up your data types. A computer is basically Snape: precise, unforgiving, and absolutely will punish you for using a string where it expected a number."

### TEACH

Every piece of data in programming has a **type** -- just like every potion ingredient has a category. You wouldn't confuse a liquid with a powder, and you shouldn't confuse a string with a number. Here are the four basic ingredient types every wizard needs to know:

**Strings -- Labels on Potion Bottles**
A string is text. It's always wrapped in quotes -- think of the quotes as the label on a potion bottle. Without them, the computer doesn't know it's text.

```javascript
"Felix Felicis"     // A string -- text in double quotes
'Polyjuice Potion'  // Also a string -- single quotes work too
`Amortentia`        // Template literal -- backticks, fancier bottle
```

The label tells you what's inside. Without quotes? The computer thinks it's a variable name, not text. Chaos ensues.

**Numbers -- Measurements**
Numbers are your measurements -- how many drops, what temperature, how many minutes to stir. They come in two flavors:

```javascript
3          // Integer -- whole number. "Add 3 drops."
7.5        // Decimal (float) -- precise measurement. "Stir for 7.5 minutes."
-10        // Negative -- "Cool to -10 degrees." Yes, some potions are cold.
```

No quotes around numbers. The moment you put quotes around a number (`"3"`), it becomes a string. It looks like a number, smells like a number, but it's actually a label that says "3" -- and math won't work on it.

**Booleans -- Active or Not**
Booleans are the simplest ingredient: they're either `true` or `false`. That's it. Think of them as potions that are either active or inactive -- there's no middle ground.

```javascript
true       // The potion is active. The spell worked. The condition is met.
false      // The potion is inert. The spell fizzled. The condition failed.
```

You'll use booleans constantly in automation: Is this task complete? Is the user logged in? Should we send the email? Yes or no. True or false.

**Null -- An Empty Cauldron**
`null` means "intentionally nothing." It's not zero (that's a number). It's not an empty string `""` (that's still a string, just a blank one). It's the deliberate absence of value -- an empty cauldron that you haven't put anything in yet.

```javascript
null       // "This cauldron is empty ON PURPOSE."
```

Why does this matter? Because in automation, you often need to say "this field has no value yet" -- a candidate who hasn't been assigned a recruiter, a deal with no close date, a form field the user skipped. That's `null`.

**The Golden Rule of Ingredients:**
Every potion recipe needs the right type of ingredient. Use the wrong type and BOOM -- runtime errors. Try to do math on a string? Error. Try to get the `.length` of `null`? Error. Snape -- I mean JavaScript -- does not forgive type confusion.

```javascript
// RIGHT -- matching types
"Harry" + " " + "Potter"   // String + String = "Harry Potter"
10 + 5                      // Number + Number = 15

// WRONG -- type confusion
"10" + 5                    // String + Number = "105" (WAT.)
null.length                 // TypeError: Cannot read property 'length' of null (BOOM)
```

That `"10" + 5 = "105"` is one of JavaScript's most infamous quirks. Instead of doing math, it converts the number to a string and glues them together. Neville's cauldron, meet explosion.

### SHOW

```javascript
// The Four Basic Ingredients -- all in one place
const potionName = "Wolfsbane Potion";     // String
const brewingMinutes = 45;                  // Number
const isRestricted = true;                  // Boolean
const antidote = null;                      // Null (no antidote exists)

// Checking types -- the "typeof" spell
console.log(typeof potionName);      // "string"
console.log(typeof brewingMinutes);  // "number"
console.log(typeof isRestricted);    // "boolean"
console.log(typeof antidote);        // "object" (yes, this is a famous JS bug -- null reports as "object")

// Type confusion in action
console.log(brewingMinutes + 10);    // 55 -- correct, number math
console.log(potionName + 10);        // "Wolfsbane Potion10" -- string concatenation, not math
console.log(isRestricted + 1);       // 2 -- true becomes 1, because JavaScript is unhinged
```

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
"Quick drill -- tell me the type of each of these values. Don't overthink it, just identify the ingredient:

1. `"Dumbledore"`
2. `42`
3. `false`
4. `null`
5. `"99"`
6. `3.14`
7. `"true"`
8. `""`

Careful with 5, 7, and 8 -- they're trick questions. Snape would be proud."

### CHECKPOINT

"Pop question: What's the output of `"7" + 3` in JavaScript?

(a) `10`
(b) `"73"`
(c) `NaN`
(d) A howler from Professor McGonagall"

**Answer:** (b) -- JavaScript sees a string on the left side, so it converts the number 3 to a string and concatenates. `"7" + "3"` = `"73"`. Welcome to the most confusing feature of JavaScript. Yes, it's always been like this. No, nobody likes it.

---

## Lesson 2: Arrays (Ingredient Shelves)

### HOOK

"You know that scene in the movies where the camera pans across Snape's office and there's this enormous shelf of potion ingredients? Hundreds of jars, all in a row, each in a specific position?

That's an array. Congratulations, you already understand the concept. The rest is just syntax."

### TEACH

An **array** is an ordered list of items -- like a shelf where every jar has a specific position. You create one with square brackets:

```javascript
const shelf = ["Boomslang Skin", "Lacewing Flies", "Bicorn Horn", "Knotgrass"];
```

**Indexing -- Position on the Shelf**
Here's where it gets weird: positions start at **0**, not 1. The first item is at index 0, the second at index 1, and so on. Why? Because wizards -- I mean computer scientists -- decided this decades ago and we're all just living with it.

```javascript
const shelf = ["Boomslang Skin", "Lacewing Flies", "Bicorn Horn", "Knotgrass"];
//              Index 0            Index 1           Index 2       Index 3

shelf[0]  // "Boomslang Skin" -- first item
shelf[2]  // "Bicorn Horn" -- third item (NOT index 3!)
shelf[4]  // undefined -- nothing at this position, the shelf ends at index 3
```

Think of it like this: the index is how many steps you take FROM the start. Zero steps = you're still at the first item.

**Common Operations -- Shelf Management**

Arrays aren't static. You can add, remove, search, and transform items:

```javascript
const ingredients = ["Mandrake Root", "Gillyweed"];

// PUSH -- Add to the end of the shelf
ingredients.push("Phoenix Feather");
// ["Mandrake Root", "Gillyweed", "Phoenix Feather"]

// POP -- Remove the last item
const removed = ingredients.pop();
// removed = "Phoenix Feather"
// ingredients = ["Mandrake Root", "Gillyweed"]

// FILTER -- Find items matching a condition
const allIngredients = ["Mandrake Root", "Gillyweed", "Muggle Repellent", "Moonstone"];
const mItems = allIngredients.filter(item => item.startsWith("M"));
// ["Mandrake Root", "Muggle Repellent", "Moonstone"]

// MAP -- Transform every item on the shelf
const upperCase = allIngredients.map(item => item.toUpperCase());
// ["MANDRAKE ROOT", "GILLYWEED", "MUGGLE REPELLENT", "MOONSTONE"]

// LENGTH -- How many jars on the shelf?
console.log(allIngredients.length);  // 4
```

**Key mental model:** `push` and `pop` work from the END of the shelf. `filter` creates a NEW shelf with only matching items (the original stays unchanged). `map` creates a NEW shelf where every item has been transformed.

**Arrays can hold ANYTHING -- even other arrays:**

```javascript
const mixedShelf = [
  "Felix Felicis",     // String
  3,                    // Number
  true,                 // Boolean
  null,                 // Null
  ["sub", "array"]      // Another array (nested!)
];
```

### SHOW

```javascript
// Snape's Ingredient Inventory System
const potionsClass = ["Harry", "Hermione", "Ron", "Draco", "Neville"];

// Roll call -- access by index
console.log(`First student: ${potionsClass[0]}`);   // "Harry"
console.log(`Last student: ${potionsClass[potionsClass.length - 1]}`);  // "Neville"

// Neville blew up his cauldron -- remove him (sorry, Neville)
const expelled = potionsClass.pop();
console.log(`${expelled} has been removed from class.`);  // "Neville has been removed from class."

// New student arrives
potionsClass.push("Luna");
console.log(potionsClass);  // ["Harry", "Hermione", "Ron", "Draco", "Luna"]

// Find all students whose names start with a letter after 'H'
const laterNames = potionsClass.filter(name => name > "H");
console.log(laterNames);  // ["Harry", "Hermione", "Ron", "Luna"]

// Create name tags (transform each name)
const nameTags = potionsClass.map(name => `[${name.toUpperCase()}]`);
console.log(nameTags);  // ["[HARRY]", "[HERMIONE]", "[RON]", "[DRACO]", "[LUNA]"]
```

### TRY

**[PLAY AUDIO: play-cached cameo_hagrid]**
**Exercise 2A: The Student Roster (DO -- 25 points)**

"Your turn. Here's what I need you to do:

1. Create an array called `hogwartsStudents` with exactly 5 student names (your choice -- pick any HP characters)
2. Access the 3rd student using the correct index (remember, indexing starts at 0!)
3. Add a 6th student to the end using `push`
4. Use `filter` to find all students whose names are longer than 5 characters
5. Log the total number of students using `.length`

Write the code and show me the output. I'll wait. And no, you can't just copy my example above -- make it your own."

### CHECKPOINT

"What index do you use to access the FIRST item in an array?

(a) `1`
(b) `0`
(c) `-1`
(d) `first`"

**Answer:** (b) -- Arrays are zero-indexed. The first item is always at index `0`. If you said 1, Snape deducts 10 points from your house.

---

**[PLAY AUDIO: play-cached peeves_interrupt]**
## Lesson 3: Objects (Potion Recipes)

### HOOK

"Arrays are great for lists, but what happens when you need to describe something COMPLEX? Imagine if a potion recipe was just an array:

```javascript
['Polyjuice Potion', 'Lacewing Flies', 21, 'clockwise', true]
```

What's `21`? Days? Drops? Minutes? What's `true`? Is it legal? Is it finished? Is it Snape-approved?

Without labels, data is meaningless. And THAT is why we need objects."

### TEACH

An **object** is a collection of **key-value pairs** -- like a potion recipe card where every piece of information has a name:

```javascript
const recipe = {
  name: "Polyjuice Potion",
  difficulty: "Advanced",
  brewingDays: 21,
  stirDirection: "clockwise",
  restricted: true
};
```

Each **key** is a label (like `name`, `difficulty`), and each **value** is the data (like `"Polyjuice Potion"`, `21`). Together, they form a complete description of something.

**Accessing Properties -- Two Ways to Read the Recipe Card**

```javascript
// Dot notation -- clean and simple (use this most of the time)
recipe.name           // "Polyjuice Potion"
recipe.brewingDays    // 21

// Bracket notation -- for dynamic keys or keys with special characters
recipe["difficulty"]  // "Advanced"
recipe["stirDirection"]  // "clockwise"

// When you NEED bracket notation:
const field = "name";
recipe[field]         // "Polyjuice Potion" -- dynamic! The variable holds the key name
recipe.field          // undefined -- this looks for a key literally called "field"
```

**Rule of thumb:** Use dot notation by default. Use bracket notation when the key name is stored in a variable, or when the key has spaces/special characters.

**Nested Objects -- Recipes Within Recipes**

Objects can contain other objects. This is where things get powerful (and occasionally confusing):

```javascript
const student = {
  name: "Harry Potter",
  house: "Gryffindor",
  year: 5,
  wand: {
    wood: "holly",
    core: "phoenix feather",
    length: 11
  },
  grades: {
    potions: "P",
    defense: "O",
    charms: "E"
  }
};

// Accessing nested properties -- chain the dots
student.wand.wood        // "holly"
student.grades.defense   // "O"
student.wand.length      // 11
```

Think of it as a recipe card that references ANOTHER recipe card. Harry's student record points to a separate wand card, which has its own fields.

**Objects + Arrays -- The Power Combo**

In the real world, data structures combine objects and arrays constantly:

```javascript
const potion = {
  name: "Felix Felicis",
  ingredients: ["Ashwinder Egg", "Squill Bulb", "Murtlap Tentacle", "Tincture of Thyme", "Occamy Eggshell"],
  brewingTime: "6 months",
  steps: [
    { order: 1, instruction: "Add Ashwinder Egg", duration: "5 min" },
    { order: 2, instruction: "Heat to 150 degrees", duration: "10 min" },
    { order: 3, instruction: "Stir 7 times clockwise", duration: "2 min" }
  ]
};

// Access the second ingredient
potion.ingredients[1]              // "Squill Bulb"

// Access the instruction of the first step
potion.steps[0].instruction        // "Add Ashwinder Egg"

// How many ingredients?
potion.ingredients.length           // 5
```

This is the shape of REAL data you'll encounter in APIs and automation. Get comfortable navigating nested structures -- it's the difference between a competent wizard and Neville's first year.

### SHOW

```javascript
// A complete potion recipe object
const amortentia = {
  name: "Amortentia",
  classification: "Love Potion",
  difficulty: "Advanced",
  restricted: true,
  brewingTime: {
    value: 14,
    unit: "days"
  },
  ingredients: [
    { name: "Ashwinder Eggs", quantity: 3, unit: "pieces" },
    { name: "Rose Thorns", quantity: 12, unit: "pieces" },
    { name: "Peppermint", quantity: 5, unit: "sprigs" },
    { name: "Moonstone", quantity: 1, unit: "powdered cup" }
  ],
  warnings: ["Smells different to each person", "Does not create real love", "Banned at Hogwarts"]
};

// Navigate the structure
console.log(amortentia.name);                          // "Amortentia"
console.log(amortentia.brewingTime.value);             // 14
console.log(amortentia.ingredients[0].name);           // "Ashwinder Eggs"
console.log(amortentia.ingredients.length);            // 4
console.log(amortentia.warnings[2]);                   // "Banned at Hogwarts"

// Check all ingredient names
const ingredientList = amortentia.ingredients.map(i => i.name);
console.log(ingredientList);
// ["Ashwinder Eggs", "Rose Thorns", "Peppermint", "Moonstone"]
```

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise 2B: The Potion Recipe Card (BUILD -- 35 points)**

"Time to brew. Create a potion recipe object with ALL of the following properties:

1. `name` -- the potion's name (string, pick any HP potion or invent one)
2. `ingredients` -- an array of at least 3 ingredient strings
3. `brewingTime` -- a number (in minutes)
4. `difficulty` -- a string: `'Beginner'`, `'Intermediate'`, or `'Advanced'`
5. `inventor` -- a nested object with `name` (string) and `year` (number)

Then write code that:
- Logs the potion name
- Logs the second ingredient
- Logs the inventor's name
- Logs how many ingredients there are

Show me the full code and output. Make Snape proud -- or at least make him slightly less disappointed."

### CHECKPOINT

"Given this object:
```javascript
const wand = { wood: 'elder', core: 'thestral hair', length: 15 };
```

What does `wand.core` return?

(a) `undefined`
(b) `'core'`
(c) `'thestral hair'`
(d) `{ core: 'thestral hair' }`"

**Answer:** (c) -- Dot notation accesses the VALUE associated with the key. `wand.core` reads "go to the `wand` object, find the key called `core`, give me its value." That value is `'thestral hair'`.

---

## Lesson 4: JSON (The Universal Recipe Book)

### HOOK

"Imagine Hogwarts needs to share potion recipes with Beauxbatons and Durmstrang. Problem: Beauxbatons writes recipes in French. Durmstrang uses a completely different format. Every school's system is different.

What if there was ONE universal format that ANY wizarding school -- in ANY country -- could read and write? A standard recipe book format that every system understands?

That's JSON. And in the non-magical world, it's literally how every API, every database, and every automation tool communicates. If data is the ingredient, JSON is the universal recipe book that lets completely different systems share information."

### TEACH

**JSON** stands for **JavaScript Object Notation**. Despite the name, it's not JavaScript-specific -- it's THE standard format for exchanging data between systems. When an API sends you data, it's almost always JSON. When an automation tool passes data between steps, it's JSON. When a database stores a document, it's often JSON.

**What JSON looks like:**

```json
{
  "name": "Polyjuice Potion",
  "difficulty": "Advanced",
  "brewingDays": 21,
  "restricted": true,
  "inventor": null,
  "ingredients": ["Lacewing Flies", "Leeches", "Fluxweed", "Knotgrass"]
}
```

Looks familiar? That's because JSON was BASED on JavaScript objects. But there are critical differences.

**JSON Syntax Rules -- The Laws of the Universal Recipe Book:**

1. **Keys MUST be in double quotes.** Not single quotes. Not no quotes. Double quotes or nothing.
   ```json
   { "name": "Harry" }     ✅ Correct
   { name: "Harry" }       ❌ Invalid JSON (no quotes on key)
   { 'name': 'Harry' }     ❌ Invalid JSON (single quotes)
   ```

2. **Strings MUST use double quotes.** Single quotes are forbidden in JSON.
   ```json
   { "house": "Gryffindor" }   ✅ Correct
   { "house": 'Gryffindor' }   ❌ Invalid JSON
   ```

3. **No trailing commas.** That comma after the last item? Illegal.
   ```json
   { "name": "Harry", "house": "Gryffindor" }    ✅ Correct
   { "name": "Harry", "house": "Gryffindor", }   ❌ Invalid JSON (trailing comma)
   ```

4. **No comments.** JSON doesn't support `//` or `/* */` comments. At all. Ever.
   ```json
   {
     "name": "Harry"  // this is the name    ❌ INVALID
   }
   ```

5. **Allowed value types:** strings, numbers, booleans (`true`/`false`), `null`, objects, arrays. That's it. No functions, no `undefined`, no dates as special types.

**JSON vs JavaScript Objects -- Subtle But Important:**

| Feature | JavaScript Object | JSON |
|---------|------------------|------|
| Key quotes | Optional | **Required** (double only) |
| String quotes | Single or double | **Double only** |
| Trailing commas | Allowed | **Forbidden** |
| Comments | Allowed | **Forbidden** |
| Functions as values | Allowed | **Forbidden** |
| `undefined` | Allowed | **Forbidden** |

Think of it this way: a JavaScript object is your personal recipe notebook -- informal, flexible, notes in the margins. JSON is the PUBLISHED cookbook -- strict formatting so ANYONE can read it.

**Converting Between the Two:**

```javascript
// JavaScript object → JSON string (for sending/saving)
const student = { name: "Hermione", house: "Gryffindor", year: 5 };
const jsonString = JSON.stringify(student);
// '{"name":"Hermione","house":"Gryffindor","year":5}'

// JSON string → JavaScript object (for using/reading)
const parsed = JSON.parse(jsonString);
console.log(parsed.name);  // "Hermione"

// Pretty-print JSON (the third argument = indentation spaces)
const pretty = JSON.stringify(student, null, 2);
console.log(pretty);
// {
//   "name": "Hermione",
//   "house": "Gryffindor",
//   "year": 5
// }
```

**Common JSON Errors and How to Spot Them:**

```json
// ERROR 1: Missing quotes on key
{ name: "Harry" }
// Fix: { "name": "Harry" }

// ERROR 2: Single quotes
{ 'name': 'Harry' }
// Fix: { "name": "Harry" }

// ERROR 3: Trailing comma
{ "name": "Harry", "house": "Gryffindor", }
// Fix: { "name": "Harry", "house": "Gryffindor" }

// ERROR 4: Using undefined
{ "name": "Harry", "patronus": undefined }
// Fix: { "name": "Harry", "patronus": null }

// ERROR 5: Comments
{ "name": "Harry" /* the chosen one */ }
// Fix: Just remove the comment. JSON doesn't do comments. Deal with it.
```

When JSON parsing fails, JavaScript throws a `SyntaxError` with a position number. That position is your clue -- count characters from the start of the string to find the offending spot.

### SHOW

```javascript
// Real-world scenario: Working with JSON data (like you would from an API)

// This is what an API response looks like -- a JSON string
const apiResponse = `{
  "status": "success",
  "data": {
    "student": {
      "name": "Luna Lovegood",
      "house": "Ravenclaw",
      "year": 4,
      "wand": {
        "wood": "unknown",
        "core": "unknown",
        "length": null
      },
      "favorite_spells": ["Expecto Patronum", "Reducto"],
      "hogwartsStudent": true
    }
  }
}`;

// Step 1: Parse the JSON string into a usable object
const response = JSON.parse(apiResponse);

// Step 2: Navigate the structure
console.log(response.status);                        // "success"
console.log(response.data.student.name);             // "Luna Lovegood"
console.log(response.data.student.favorite_spells[0]); // "Expecto Patronum"
console.log(response.data.student.wand.length);      // null

// Step 3: Modify and convert back to JSON
response.data.student.year = 5;  // Luna got promoted
response.data.student.favorite_spells.push("Stupefy");

const updatedJson = JSON.stringify(response.data.student, null, 2);
console.log(updatedJson);
// {
//   "name": "Luna Lovegood",
//   "house": "Ravenclaw",
//   "year": 5,
//   "wand": {
//     "wood": "unknown",
//     "core": "unknown",
//     "length": null
//   },
//   "favorite_spells": [
//     "Expecto Patronum",
//     "Reducto",
//     "Stupefy"
//   ],
//   "hogwartsStudent": true
// }
```

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise 2C: Your Hogwarts Student Card (DO -- 25 points)**

"Write yourself as a Hogwarts student in valid JSON. Not a JavaScript object -- proper, strict, publishable JSON. Include:

1. `name` -- your name (or a character name, your call)
2. `house` -- your Hogwarts house
3. `year` -- a number (1-7)
4. `wand` -- a nested object with `wood`, `core`, and `length`
5. `favorite_spells` -- an array of at least 3 spell names
6. `prefect` -- a boolean

Make sure it passes JSON validation. Remember:
- Double quotes on ALL keys and string values
- No trailing commas
- No comments
- No single quotes

Paste your JSON and I'll validate it. If it's invalid, I'll tell you exactly where you messed up -- just like Snape, but I'll explain WHY."

### CHECKPOINT

**[PLAY AUDIO: play-cached cameo_mcgonagall]**
"Which of these is valid JSON?

(a) `{ name: 'Harry', age: 15 }`
(b) `{ \"name\": \"Harry\", \"age\": 15, }`
(c) `{ \"name\": \"Harry\", \"age\": 15 }`
(d) `{ \"name\": \"Harry\", \"age\": 15 } // The Boy Who Lived`"

**Answer:** (c) -- The only one that follows all the rules: double-quoted keys, double-quoted strings, no trailing comma, no comments. Option (a) has no quotes on the key and uses single quotes. Option (b) has a trailing comma. Option (d) has a comment.

---

## Lesson 5: Data Transformation (Potion Brewing)

### HOOK

"You've got your ingredients (data types), your shelves (arrays), your recipe cards (objects), and your universal recipe format (JSON). But here's the thing -- raw ingredients aren't a potion. You don't just dump mandrake root, lacewing flies, and boomslang skin into a cauldron and hope for the best. (That's how you get what happened to Goyle's face in Chamber of Secrets.)

Brewing is a PROCESS. You chop, you measure, you heat, you stir, you strain. Data transformation is the same thing: taking raw data from one shape and turning it into something useful. And in automation? This is the skill that separates the Hermiones from the Crabbes."

### TEACH

Data transformation is taking data in one structure and reshaping it into another. This happens CONSTANTLY in automation:

- An API returns 50 fields per record, but you only need 3
- A spreadsheet has names as "Last, First" but you need "First Last"
- A webhook sends nested data but the next step expects a flat list

The three core brewing techniques are **map**, **filter**, and **reduce**:

**Map -- Transform Every Ingredient**
`map` takes every item in an array and applies a transformation, producing a new array of the same length:

```javascript
const students = [
  { name: "Harry Potter", house: "Gryffindor", year: 5 },
  { name: "Draco Malfoy", house: "Slytherin", year: 5 },
  { name: "Luna Lovegood", house: "Ravenclaw", year: 4 }
];

// Extract just the names -- like straining a potion to get only the liquid
const names = students.map(s => s.name);
// ["Harry Potter", "Draco Malfoy", "Luna Lovegood"]

// Create a new shape -- like decanting into different bottles
const roster = students.map(s => ({
  fullName: s.name,
  houseBadge: `[${s.house}]`
}));
// [
//   { fullName: "Harry Potter", houseBadge: "[Gryffindor]" },
//   { fullName: "Draco Malfoy", houseBadge: "[Slytherin]" },
//   { fullName: "Luna Lovegood", houseBadge: "[Ravenclaw]" }
// ]
```

**Filter -- Remove What You Don't Need**
`filter` keeps only the items that pass a test. Like straining out the solid chunks -- you keep what matters and discard the rest:

```javascript
const allStudents = [
  { name: "Harry Potter", house: "Gryffindor", year: 5 },
  { name: "Draco Malfoy", house: "Slytherin", year: 5 },
  { name: "Luna Lovegood", house: "Ravenclaw", year: 4 },
  { name: "Cedric Diggory", house: "Hufflepuff", year: 6 },
  { name: "Hermione Granger", house: "Gryffindor", year: 5 }
];

// Only Gryffindors
const gryffindors = allStudents.filter(s => s.house === "Gryffindor");
// [{ name: "Harry Potter"... }, { name: "Hermione Granger"... }]

// Only year 5 and above
const upperYears = allStudents.filter(s => s.year >= 5);
// 4 students (everyone except Luna)
```

**Reduce -- Condense Into a Single Result**
`reduce` takes an entire array and boils it down to one value. Like brewing a potion down to its concentrated essence:

```javascript
const scores = [10, 25, 15, 30, 20];

// Sum all scores -- boil the array down to one number
const total = scores.reduce((sum, score) => sum + score, 0);
// 100

// Count students per house -- boil an array into a summary object
const students = [
  { name: "Harry", house: "Gryffindor" },
  { name: "Draco", house: "Slytherin" },
  { name: "Ron", house: "Gryffindor" },
  { name: "Luna", house: "Ravenclaw" },
  { name: "Hermione", house: "Gryffindor" }
];

const houseCounts = students.reduce((counts, s) => {
  counts[s.house] = (counts[s.house] || 0) + 1;
  return counts;
}, {});
// { Gryffindor: 3, Slytherin: 1, Ravenclaw: 1 }
```

**Chaining -- The Full Brewing Process**

The real power comes from chaining these operations together. Filter, then map, then reduce -- like following a multi-step potion recipe:

```javascript
const characters = [
  { name: "Harry Potter", house: "Gryffindor", wizard: true, alive: true },
  { name: "Draco Malfoy", house: "Slytherin", wizard: true, alive: true },
  { name: "Severus Snape", house: "Slytherin", wizard: true, alive: false },
  { name: "Dobby", house: "", wizard: false, alive: false },
  { name: "Hermione Granger", house: "Gryffindor", wizard: true, alive: true }
];

// Pipeline: Get names of living wizards, sorted alphabetically
const result = characters
  .filter(c => c.wizard && c.alive)      // Step 1: Only living wizards
  .map(c => c.name)                       // Step 2: Extract just names
  .sort();                                // Step 3: Alphabetical order

console.log(result);
// ["Draco Malfoy", "Harry Potter", "Hermione Granger"]
```

Raw ingredients (full character objects) went in. A clean, sorted list of names came out. That's data transformation -- that's brewing.

### SHOW

```javascript
// Real-world transformation: API response → Clean output
// Imagine this came from the HP API
const rawApiData = [
  {
    id: "1",
    name: "Harry Potter",
    alternate_names: ["The Boy Who Lived", "The Chosen One"],
    species: "human",
    house: "Gryffindor",
    dateOfBirth: "31-07-1980",
    wizard: true,
    ancestry: "half-blood",
    wand: { wood: "holly", core: "phoenix feather", length: 11 },
    patronus: "stag",
    hogwartsStudent: true,
    alive: true,
    image: "https://example.com/harry.jpg"
  },
  {
    id: "2",
    name: "Hermione Granger",
    alternate_names: [],
    species: "human",
    house: "Gryffindor",
    dateOfBirth: "19-09-1979",
    wizard: true,
    ancestry: "muggle-born",
    wand: { wood: "vine", core: "dragon heartstring", length: 10.75 },
    patronus: "otter",
    hogwartsStudent: true,
    alive: true,
    image: "https://example.com/hermione.jpg"
  },
  {
    id: "3",
    name: "Draco Malfoy",
    alternate_names: [],
    species: "human",
    house: "Slytherin",
    dateOfBirth: "05-06-1980",
    wizard: true,
    ancestry: "pure-blood",
    wand: { wood: "hawthorn", core: "unicorn tail-hair", length: 10 },
    patronus: "",
    hogwartsStudent: true,
    alive: true,
    image: "https://example.com/draco.jpg"
  }
];

// TRANSFORMATION: Extract a simplified student directory
const studentDirectory = rawApiData
  .filter(c => c.hogwartsStudent)
  .map(c => ({
    name: c.name,
    house: c.house,
    wandSummary: `${c.wand.wood} with ${c.wand.core} (${c.wand.length}")`,
    hasPatronus: c.patronus !== ""
  }));

console.log(JSON.stringify(studentDirectory, null, 2));
// [
//   {
//     "name": "Harry Potter",
//     "house": "Gryffindor",
//     "wandSummary": "holly with phoenix feather (11\")",
//     "hasPatronus": true
//   },
//   {
//     "name": "Hermione Granger",
//     "house": "Gryffindor",
//     "wandSummary": "vine with dragon heartstring (10.75\")",
//     "hasPatronus": true
//   },
//   {
//     "name": "Draco Malfoy",
//     "house": "Slytherin",
//     "wandSummary": "hawthorn with unicorn tail-hair (10\")",
//     "hasPatronus": false
//   }
// ]
```

The raw API data had 13+ fields per character. The transformed output has 4. That's the power of data transformation: take the messy, verbose, overwhelming raw data and brew it down into exactly what you need.

### TRY

**Exercise 2D: The Student Simplifier (BUILD -- 35 points)**

"Here's your raw data -- a messy array of character objects straight from the HP API:

```javascript
const rawCharacters = [
  { name: 'Harry Potter', house: 'Gryffindor', ancestry: 'half-blood', patronus: 'stag', alive: true, wizard: true },
  { name: 'Hermione Granger', house: 'Gryffindor', ancestry: 'muggle-born', patronus: 'otter', alive: true, wizard: true },
  { name: 'Draco Malfoy', house: 'Slytherin', ancestry: 'pure-blood', patronus: '', alive: true, wizard: true },
  { name: 'Luna Lovegood', house: 'Ravenclaw', ancestry: '', patronus: 'hare', alive: true, wizard: true },
  { name: 'Cedric Diggory', house: 'Hufflepuff', ancestry: '', patronus: '', alive: false, wizard: true },
  { name: 'Severus Snape', house: 'Slytherin', ancestry: 'half-blood', patronus: 'doe', alive: false, wizard: true },
  { name: 'Dobby', house: '', ancestry: '', patronus: '', alive: false, wizard: false }
];
```

Your mission:

1. **Filter** to keep only characters who are alive AND are wizards
2. **Map** the filtered results into a simpler format with ONLY `name` and `house`
3. **Log** the final result as pretty-printed JSON

Expected output shape:
```json
[
  { \"name\": \"...\", \"house\": \"...\" },
  ...
]
```

How many characters should be in your final array? Think about it before you code it. Then show me the code and the output."

### CHECKPOINT

"What does `.map()` return?

(a) The original array, modified
(b) A new array with the same number of items, each transformed
(c) A single value
(d) Only the items that matched a condition"

**Answer:** (b) -- `map` always returns a NEW array with the same length as the original, but with each element transformed by the function you provide. It does NOT modify the original array. Option (c) describes `reduce`, and option (d) describes `filter`.

---

**[PLAY AUDIO: play-cached module_complete]**
## Module Summary

"You've just completed the Potions fundamentals. Let's recap what's now in your ingredient cabinet:

| Concept | HP Metaphor | What It Really Is |
|---------|-------------|-------------------|
| **Data Types** | Basic ingredients | Strings, numbers, booleans, null |
| **Arrays** | Ingredient shelves | Ordered lists `[a, b, c]` |
| **Objects** | Potion recipe cards | Key-value pairs `{ key: value }` |
| **JSON** | Universal recipe book | Standard data exchange format |
| **Transformation** | The brewing process | map, filter, reduce |

These aren't just abstract concepts -- they're the building blocks of EVERY automation you'll ever build. Every API response is JSON. Every data manipulation uses map/filter/reduce. Every webhook payload is objects and arrays.

You now speak the language of data. In Module 3, we'll put this knowledge to work by actually CALLING APIs and working with live data from the Owl Post Network.

Ready for the quiz? Five questions stand between you and Module 3."

---

## Exercise Reference

| ID | Lesson | Type | Points | Description |
|----|--------|------|--------|-------------|
| `2A` | 2 | DO | 25 | Create student array, access by index, push, filter, count |
| `2B` | 3 | BUILD | 35 | Create a potion recipe object with nested properties |
| `2C` | 4 | DO | 25 | Write yourself as a valid JSON Hogwarts student object |
| `2D` | 5 | BUILD | 35 | Filter and map raw character data into simplified format |

**Total exercise points available:** 120

---

## Teaching Notes

**Common stumbling points in this module:**
- Students confusing `"3"` (string) with `3` (number) -- drill this hard in Lesson 1
- Zero-based indexing -- expect confusion, use the "steps from start" mental model
- JSON vs JS objects -- the quotes requirement trips everyone up the first time
- `reduce` is the hardest concept -- if the student struggles, let them master map/filter first and come back to reduce
- Trailing commas in JSON -- students coming from JavaScript will do this constantly

**Progression check:** If a student breezes through Lessons 1-3 but stumbles on JSON or transformation, that's normal. Lessons 4-5 are the real substance of this module. Spend extra time there.

**Connection to Module 3:** Everything in this module feeds directly into API work. When students hit Module 3 and see their first API response, they should think "Oh, that's just a JSON object with nested arrays!" If they don't make that connection, the module didn't land.
