# Module 1: The Automation Spellbook -- Automation Fundamentals
<!-- Author: Kevin Dubon -->

## Module Overview

**Module Title:** The Automation Spellbook
**Theme:** Every great witch or wizard started by learning their first spell. Before you can duel Dark Lords or build enchanted maps, you need to understand the fundamentals of spellcasting -- or in our world, automation.
**Lessons:** 4
**Prerequisite:** Module 0 (Sorting Ceremony) complete
**Unlocks:** Module 2 (Potion Ingredients -- Data & JSON) upon quiz pass (4/5)

**Learning Objectives:**
By the end of this module, the student will be able to:
1. Define automation and identify tasks that can be automated
2. Break down any automation into its three core components: trigger, action, condition
3. Classify automations by type (scheduled, event-driven, webhook, manual)
4. Understand the no-code to full-code spectrum and when to use each level

**Exercises:**
| ID | Lesson | Type | Points | Description |
|----|--------|------|--------|-------------|
| `m1-ex1` | 1 | OBSERVE | 15 | Identify 3 daily tasks that could be automated |
| `m1-ex2` | 2 | DO | 25 | Map out an automation using trigger/action/condition |
| `m1-ex3` | 3 | ANALYZE | 25 | Categorize 5 scenarios into automation types |
| `m1-ex4` | 4 | BUILD | 35 | Write pseudocode for a spreadsheet-to-Slack automation |

---

## Lesson 1: What Is Automation? (The First Spell)

### HOOK

> Picture this: It's your first day at Hogwarts. Professor Flitwick walks in, waves his wand, and every candle in the Great Hall lights itself. Simultaneously. No matches. No lighter fluid. No intern running around with a torch.
>
> Now imagine if Flitwick had to personally light each of those thousand floating candles every single morning. He'd never have time to teach Charms -- he'd be a full-time candle technician.
>
> That, my friend, is automation. Flitwick cast the spell once, set the rules, and now those candles light themselves every morning without him lifting a finger. Today, you're going to learn how to do the same thing -- but with computers instead of candles.

### TEACH

**So what IS automation, really?**

At its simplest: **automation is making computers do repetitive tasks for you.** That's it. That's the whole definition. Everything else is details.

Think about it through the lens of the wizarding world. What do spells actually do? They automate what wizards would otherwise have to do by hand:

- **Lumos** automates carrying a torch
- **Accio** automates walking across the room to grab something
- **Scourgify** automates scrubbing dishes (Mrs. Weasley's personal favorite)
- **Wingardium Leviosa** automates... well, heavy lifting

Every spell follows the same basic pattern. And every automation follows the same pattern too. There are three components to any spell -- sorry, any automation:

**1. The Trigger (The Incantation)**
This is what kicks things off. In magic, it's the words you say. In automation, it's the event that starts the process.
- A wizard says "Lumos!" -- that's the trigger
- In automation: "When a new email arrives" or "Every day at 9 AM" or "When someone fills out a form"

**2. The Action (The Effect)**
This is what actually happens. The spell's result. The thing that gets done.
- "Lumos" makes the wand tip glow -- that's the action
- In automation: "Send a Slack message" or "Create a spreadsheet row" or "Move a file to a folder"

**3. The Condition (The Intent/Aim)**
This is the targeting -- the control that makes sure the spell does the RIGHT thing to the RIGHT target. Without it, magic is chaos.
- You have to point your wand at something specific -- that's the condition
- In automation: "Only if the email is from a client" or "Only on weekdays" or "Only if the amount is over $1,000"

Without a trigger, nothing starts. Without an action, nothing happens. Without a condition... well, you get Neville Longbottom's first Potions class. Explosions everywhere.

**The key insight:** Humans are terrible at repetitive tasks. We get bored, we make mistakes, we forget. Computers are terrible at creative thinking. But repetitive tasks? They'll do the same thing a million times without complaining. Automation is about putting the right work in the right hands (or processors).

### SHOW

Here are three real-world "spells" (automations) you've probably already encountered without realizing it:

```
SPELL 1: The Auto-Reply Charm
================================
Trigger:  New email arrives in your inbox
Condition: You're on vacation (out-of-office is ON)
Action:   Send a reply saying "I'm away until Monday"

Muggle equivalent: Hiring someone to sit at your desk
                   and reply to every email while you're gone.
Wizard equivalent: An enchanted quill that writes responses
                   for you -- like Rita Skeeter's Quick-Quotes Quill,
                   but less libelous.

SPELL 2: The File-Sorting Jinx
================================
Trigger:  New file is added to your Downloads folder
Condition: File type is .pdf
Action:   Move it to the "Documents" folder automatically

Muggle equivalent: Standing by your computer and manually
                   dragging every PDF to the right folder.
Wizard equivalent: The Sorting Hat, but for files.
                   "Better be... DOCUMENTS!"

SPELL 3: The Notification Patronus
================================
Trigger:  A customer leaves a 1-star review
Condition: Review mentions "billing" or "payment"
Action:   Send urgent Slack message to the billing team

Muggle equivalent: Someone reading every single review 24/7
                   and tapping the right person on the shoulder.
Wizard equivalent: A Patronus that flies to the right person
                   with exactly the right message.
```

Notice the pattern? Every single one has the same three parts: **Trigger, Condition, Action.** Just like every spell has an incantation, an intent, and an effect.

**[PLAY AUDIO: play-cached cameo_hagrid]**
### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: The Daily Spell Inventory (OBSERVE -- 15 points)**

Exercise ID: `m1-ex1`

Your mission: Look at your actual daily routine -- work, personal, whatever -- and identify **3 tasks** that you do repeatedly that could be automated. These should be tasks YOU actually do, not hypothetical ones.

For each task, answer:
1. **What do you do?** (Describe the repetitive task)
2. **How often?** (Daily? Weekly? Every time X happens?)
3. **Why is it annoying?** (What makes this a good candidate for automation?)
4. **What would the "spell" look like?** (Describe the trigger, condition, and action -- even if you're not sure about the tech)

**Example to get you started:**

> **Task:** Every morning I check Slack for messages from my team and forward important ones to my manager.
> **How often:** Every weekday morning
> **Why it's annoying:** It takes 15 minutes and I sometimes miss messages
> **The spell:** TRIGGER: New Slack message in #team channel. CONDITION: Message contains "urgent" or "blocker." ACTION: Forward to manager's DM.

Now you try. Share your three tasks and I'll review them.

**Completion criteria:** Student identifies 3 real tasks with reasonable trigger/condition/action breakdowns. They don't need to be technically precise -- this is about developing the automation mindset.

**[PLAY AUDIO: play-cached cameo_mcgonagall]**
### CHECKPOINT

> **Quick wand check before we move on:**
>
> What are the three components of every automation?
>
> (a) Input, Output, Error
> (b) Trigger, Action, Condition
> (c) Start, Middle, End
> (d) Code, Server, Database
>
> **Correct answer: (b)**
> Trigger starts it, Action does the thing, Condition controls when/how it fires. Just like a spell needs an incantation, an effect, and proper aim. If you got this wrong... well, at least you didn't blow up a cauldron. Yet.

---

## Lesson 2: The Anatomy of an Automation (Spell Components)

### HOOK

> Let's talk about Expelliarmus for a second. Harry Potter's signature move. His go-to. The spell he used so often that Death Eaters literally identified him by it in the Battle of the Seven Potters.
>
> But here's the thing -- Expelliarmus isn't just "say the word and stuff happens." If that were true, you could mumble it in your sleep and your cat's wand would go flying. (Cats don't have wands. Usually.)
>
> No, Expelliarmus requires three things working in perfect harmony. And guess what? So does every automation you'll ever build. Last lesson we introduced the three components. This lesson, we're dissecting them like a Potions ingredient -- getting into the guts of how they actually work together.

### TEACH

Let's go deeper into each component and understand how they connect.

**The Trigger (The Incantation) -- What Sets Things in Motion**

In the wizarding world, you must speak the incantation (or cast nonverbally if you're sufficiently advanced -- show-off). The trigger is the "when" of your automation. Without it, nothing begins.

Triggers come in several flavors:
- **Time-based:** "Every day at 9 AM" -- like an alarm clock for your automation
- **Event-based:** "When a new email arrives" -- something happens, and your automation reacts
- **Manual:** "When I click this button" -- you decide when to fire
- **Webhook:** "When another system sends me a signal" -- external systems calling your automation

The most important rule about triggers: **one automation, one trigger.** Just like you say ONE incantation per spell. You don't shout "EXPELLIARMUS LUMOS ACCIO" and hope for the best. (If you do, please let me know what happens.)

**The Action (The Effect) -- What Actually Happens**

The action is the result -- the thing that gets done. In Expelliarmus, the action is "the opponent's wand flies out of their hand." Clear. Specific. Measurable. (You can literally see it happen.)

Good automation actions are the same way:
- **Specific:** "Send a message to #general in Slack" (not "do something in Slack")
- **Measurable:** "Create a row in the spreadsheet" (you can verify it happened)
- **Single-purpose:** Each action does ONE thing well

Most automations chain multiple actions together. Think of it like a spell combo:
1. Action 1: Look up the customer's name in the database
2. Action 2: Create a personalized email draft
3. Action 3: Send the email
4. Action 4: Log that the email was sent

That's four actions in sequence, each depending on the one before it. Like casting Stupefy (stun them), then Incarcerous (bind them), then Obliviate (make them forget). A combo chain.

**The Condition (The Intent/Aim) -- The Logic Gate**

Here's where things get interesting. The condition is what separates a dangerous, uncontrolled spell from a precise, targeted one.

Expelliarmus aimed at Voldemort? Heroic.
Expelliarmus aimed at your own teammate? Problematic.
Expelliarmus with no aim at all? Just reckless wand-waving.

Conditions are the "if" statements of your automation:
- "IF the email is from a VIP client..."
- "IF the order total is over $500..."
- "IF it's a weekday AND between 9 AM and 5 PM..."
- "IF the file is a PDF AND larger than 1MB..."

You can combine conditions with AND / OR logic:
- **AND:** Both must be true. "IF the customer is VIP AND the order is over $500" -- you need BOTH conditions met.
- **OR:** Either can be true. "IF the message says 'urgent' OR 'critical'" -- either word triggers it.

Without conditions, your automation fires on EVERYTHING. Every email. Every file. Every event. That's the automation equivalent of casting Incendio in the Hogwarts library -- technically the spell works, but the results are catastrophic.

### SHOW

Let's dissect Expelliarmus as a formal automation, then map it to a real-world example:

```
EXPELLIARMUS -- SPELL ANATOMY
================================
TRIGGER (Incantation):
  The wizard shouts "Expelliarmus!"
  Type: Manual (the wizard decides when to cast)

CONDITION (Intent/Aim):
  - Wand must be pointed at a specific target
  - Target must be holding a wand or object
  - Caster must have sufficient magical intent
  Logical form: IF target_has_wand AND wand_is_aimed AND intent_is_focused

ACTION (Effect):
  1. Beam of scarlet light shoots from wand
  2. Target's wand (or held object) is ripped from their grip
  3. Object flies toward the caster
  Chain: FIRE_BEAM → DISARM_TARGET → RETRIEVE_OBJECT


REAL-WORLD EQUIVALENT: "Auto-Escalate Support Tickets"
================================
TRIGGER (Incantation):
  New support ticket is created in the help desk
  Type: Event-based (reacts to ticket creation)

CONDITION (Intent/Aim):
  - Ticket priority is marked "High" or "Critical"
  - Customer is on the VIP list
  - It's outside business hours (no one is actively monitoring)
  Logical form: IF priority >= "High" AND customer_is_VIP AND outside_hours

ACTION (Effect):
  1. Send SMS to the on-call manager
  2. Post alert in #urgent-support Slack channel
  3. Auto-assign ticket to senior support agent
  4. Start a 30-minute escalation timer
  Chain: SMS_MANAGER → SLACK_ALERT → ASSIGN_AGENT → START_TIMER
```

See how the structure is identical? The domain changes (magic vs. software), but the anatomy is the same. Trigger kicks it off. Conditions filter and target. Actions execute the result.

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: Spell Mapping (DO -- 25 points)**

Exercise ID: `m1-ex2`

Your mission: Pick ONE of the following scenarios and map it out using the full trigger/condition/action format. Be as specific as you can -- pretend you're writing the spell instructions for a first-year student who needs to cast it perfectly.

**Choose one:**

**Scenario A: The Welcome Owl**
A new employee joins your company. You want to automatically send them a welcome email, add them to the team Slack channel, and create their onboarding checklist.

**Scenario B: The Inventory Alert**
An online store needs to alert the purchasing team whenever a product's stock drops below 10 units, but only for products that are marked as "best sellers."

**Scenario C: The Meeting Scribe**
After every team meeting (Google Calendar event ends), automatically create a summary document in Google Docs and share it with all attendees.

**Format your answer like this:**

```
AUTOMATION NAME: [Your creative name]
================================
TRIGGER:
  What starts it: [specific event]
  Type: [time-based / event-based / manual / webhook]

CONDITION(S):
  - [condition 1]
  - [condition 2]
  Logical form: IF [condition] AND/OR [condition]

ACTION(S):
  1. [First thing that happens]
  2. [Second thing that happens]
  3. [Third thing that happens]
  Chain: [ACTION_1] → [ACTION_2] → [ACTION_3]
```

**Completion criteria:** Student maps out a complete automation with a clear trigger, at least one condition, and at least two chained actions. Actions should be in logical order. Bonus points (figuratively) if they name their automation something fun.

### CHECKPOINT

> **Quick wand check:**
>
> An automation fires every time someone submits a form, even when the form is blank. What component is missing or broken?
>
> (a) The trigger -- it shouldn't fire on form submissions
> (b) The action -- blank forms should still be processed
> (c) The condition -- there's no filter checking if the form has data
> (d) The automation is working correctly
>
> **Correct answer: (c)**
> The trigger is doing its job (form submitted = fire). The actions would work fine IF there was data. The problem is there's no condition saying "only proceed IF the form has actual content." That's an uncontrolled spell -- Expelliarmus with no aim. Everything gets disarmed, even your allies.

---

**[PLAY AUDIO: play-cached peeves_interrupt]**
## Lesson 3: Types of Automations (Schools of Magic)

### HOOK

> At Hogwarts, there are different schools of magic: Transfiguration, Charms, Defense Against the Dark Arts, Potions, Herbology... Each school has its own approach, its own philosophy, its own way of solving problems.
>
> Transfiguration changes the nature of things. Charms add properties. Potions use ingredients over time. They all achieve magical results, but the HOW is completely different.
>
> Automation works the same way. There isn't just one type of automation -- there are different "schools," each suited to different situations. Use the wrong school for the job and you'll end up like someone trying to brew a potion in Defense Against the Dark Arts class. Technically creative. Practically disastrous.

### TEACH

There are four fundamental types of automations, and each one maps perfectly to a magical concept:

**1. Scheduled Automations (The Time-Turner)**

These run on a timer -- every minute, every hour, every day at 3 PM, every Monday at 9 AM. They don't care what's happening in the world. When the clock strikes, they run.

Just like Hermione's Time-Turner: it operates on TIME, not events. You set it, and it reliably ticks along.

**Real examples:**
- Daily report generated every morning at 8 AM
- Weekly database backup every Sunday at midnight
- Hourly check for new inventory data
- Monthly invoice generation on the 1st

**Best for:** Regular maintenance, reports, cleanups, anything that needs to happen "every X."

**Watch out for:** Running too frequently wastes resources. Running too infrequently misses important windows. Finding the right schedule is an art.

**2. Event-Driven Automations (Owl Post)**

These sit quietly, waiting. The moment something specific happens -- a new email, a form submission, a database change, a file upload -- they spring to life.

Like the Owl Post system: owls don't fly on a schedule. They fly when someone has a letter to deliver. The EVENT (letter written) triggers the action (owl flies).

**Real examples:**
- Send welcome email when new user signs up
- Update CRM when a deal status changes
- Notify the team when a customer leaves a review
- Generate a contract when a proposal is accepted

**Best for:** Responding to things in real-time. When the timing of the automation depends on when something HAPPENS, not on the clock.

**Watch out for:** Event storms -- if 1,000 users sign up simultaneously, that's 1,000 automations firing at once. Plan for volume.

**3. Webhook Automations (The Floo Network)**

These are triggered by external systems sending a signal to YOUR system. It's like the Floo Network: someone throws powder into THEIR fireplace and shouts your address, and suddenly they're in YOUR living room.

The key difference from event-driven: with event-driven, YOU are watching for changes. With webhooks, ANOTHER SYSTEM tells you something happened by sending a message to a URL you provide.

**Real examples:**
- Stripe sends a webhook when a payment succeeds → update your database
- GitHub sends a webhook when code is pushed → run your tests
- Slack sends a webhook when someone uses a slash command → process the command
- A form tool sends a webhook on submission → create a record

**Best for:** Integrating with external platforms that support webhooks. Real-time, cross-system communication.

**Watch out for:** Security -- anyone who knows your webhook URL can trigger it. Always validate incoming data. An unprotected webhook is like leaving your Floo Network open to literally anyone. "Oh hello, Death Eater. Come right in."

**4. Manual-Trigger Automations (The Wand Wave)**

Sometimes you just want a button. You press it, the automation runs. No schedule, no event, no external system. Just you, deciding "now is the time."

Like a wizard raising their wand and deliberately casting a spell. Full control. Full intent. Full manual.

**Real examples:**
- "Generate Report" button that pulls data and creates a PDF
- "Onboard Client" button that kicks off a 10-step workflow
- "Send Newsletter" button after you've reviewed the draft
- "Deploy to Production" button (please test first)

**Best for:** Workflows that need human judgment before running. Processes where timing is unpredictable and you want a human in the loop.

**Watch out for:** The whole point of automation is to REDUCE manual work. If you're manually triggering everything, you might be doing it wrong. Reserve manual triggers for processes that genuinely need human decision-making.

### SHOW

Here's a visual comparison of all four types and when each one fires:

```
THE FOUR SCHOOLS OF AUTOMATION MAGIC
=============================================

SCHEDULED (Time-Turner)
  Clock: ⏰ 9:00 AM → AUTOMATION RUNS
  Clock: ⏰ 9:00 AM → AUTOMATION RUNS  (same time, next day)
  Clock: ⏰ 9:00 AM → AUTOMATION RUNS  (same time, next day)
  Pattern: Predictable. Repeating. Like clockwork (literally).

EVENT-DRIVEN (Owl Post)
  ... waiting ... waiting ...
  Event: NEW EMAIL! → AUTOMATION RUNS
  ... waiting ...
  Event: NEW EMAIL! → AUTOMATION RUNS
  ... waiting ... waiting ... waiting ...
  Event: NEW EMAIL! → AUTOMATION RUNS
  Pattern: Unpredictable timing. Reacts when things happen.

WEBHOOK (Floo Network)
  ... listening on URL ...
  External system: POST https://your-url.com/webhook → AUTOMATION RUNS
  ... listening ...
  External system: POST https://your-url.com/webhook → AUTOMATION RUNS
  Pattern: Another system decides when to call you.

MANUAL TRIGGER (Wand Wave)
  ... nothing ...
  Human: *clicks button* → AUTOMATION RUNS
  ... nothing ... nothing ...
  Human: *clicks button* → AUTOMATION RUNS
  Pattern: You decide. Full control. Very manual.

=============================================
```

**Quick decision guide:**

```
Does it need to run at a specific time/interval?
  YES → SCHEDULED (Time-Turner)
  NO ↓

Does it react to something happening in YOUR system?
  YES → EVENT-DRIVEN (Owl Post)
  NO ↓

Does it react to ANOTHER system calling you?
  YES → WEBHOOK (Floo Network)
  NO ↓

Does a human need to decide when to run it?
  YES → MANUAL TRIGGER (Wand Wave)
```

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: The Sorting Hat for Automations (ANALYZE -- 25 points)**

Exercise ID: `m1-ex3`

Your mission: Below are 5 automation scenarios. For each one, classify it into the correct type: **Scheduled**, **Event-Driven**, **Webhook**, or **Manual Trigger**. Then explain WHY in one sentence.

**The scenarios:**

1. **Every Friday at 5 PM**, a summary of the week's sales is emailed to the management team.

2. **When a candidate accepts a job offer** in the recruiting system, an onboarding checklist is automatically created in Notion.

3. A social media manager reviews a batch of drafted posts, then **clicks "Publish All"** to schedule them across platforms.

4. **Stripe processes a payment** and sends a notification to your app's endpoint, which then updates the customer's account status.

5. **Every 15 minutes**, a script checks whether any servers in the monitoring dashboard have crossed 90% CPU usage, and sends an alert if so.

**Format your answer:**

```
1. [Type] -- [One sentence explanation]
2. [Type] -- [One sentence explanation]
3. [Type] -- [One sentence explanation]
4. [Type] -- [One sentence explanation]
5. [Type] -- [One sentence explanation]
```

**Answer key (for validation):**
1. **Scheduled (Time-Turner)** -- Runs at a specific recurring time (every Friday at 5 PM), regardless of events.
2. **Event-Driven (Owl Post)** -- Reacts to something happening inside the system (candidate accepts offer).
3. **Manual Trigger (Wand Wave)** -- A human reviews and decides when to run it (clicks "Publish All").
4. **Webhook (Floo Network)** -- An external system (Stripe) sends a notification to your URL.
5. **Scheduled (Time-Turner)** -- Runs on a fixed interval (every 15 minutes), even though the ACTION is conditional.

**Common mistakes to watch for:**
- Scenario 5: Students may say "Event-Driven" because of the CPU threshold, but the CHECK is scheduled -- the automation runs every 15 minutes regardless. The CPU check is a condition, not a trigger.
- Scenario 4: Students may confuse this with Event-Driven. The distinction is that Stripe (external system) calls YOUR endpoint -- that's a webhook, not your system watching for changes.

**Completion criteria:** Student correctly classifies at least 4 of 5. If they get #4 or #5 wrong, explain the nuance -- those are the tricky ones.

### CHECKPOINT

> **Quick wand check:**
>
> Your automation needs to check a weather API every morning and send you a Slack message if rain is expected. What type of automation is this?
>
> (a) Event-Driven -- because rain is an event
> (b) Webhook -- because you're calling an external API
> (c) Scheduled -- because it runs every morning on a timer
> (d) Manual -- because you want to see the weather yourself
>
> **Correct answer: (c)**
> Tricky one! Even though it involves an external API (weather) and reacts to a condition (rain), the TRIGGER is time-based: "every morning." The weather check is an action that happens after the scheduled trigger fires. The rain check is a condition on the action, not the trigger. Many students confuse what triggers the automation (the schedule) with what happens inside it (the API call and condition check).

---

## Lesson 4: The No-Code to Code Spectrum (Muggle to Wizard)

### HOOK

> Let's talk about wands.
>
> In the Harry Potter universe, not all wands are created equal. First-years get basic wands from Ollivanders. Aurors carry battle-tested wands with powerful cores. And then there's the Elder Wand -- the most powerful wand in existence, capable of spells no other wand can cast.
>
> But here's the thing nobody talks about: the Elder Wand is USELESS if you don't know how to use it. Give it to a first-year and they'll poke themselves in the eye. Give a basic wand to Dumbledore and he'll still duel circles around most wizards.
>
> The tools of automation work exactly the same way. There's a spectrum from "anyone can use it" to "incredible power, steep learning curve." And the right tool isn't always the most powerful one -- it's the one that matches YOUR skill level and the job at hand.

### TEACH

Welcome to the automation power spectrum. Think of it as Ollivanders' wand shop, but for tech tools.

**Level 1: No-Code Tools (Training Wands)**

Tools like **Zapier** and **Make** (formerly Integromat) are the training wands of the automation world. They're designed so that ANYONE can pick them up and get results, even with zero technical background.

**How they work:** Drag-and-drop interfaces. Pre-built connectors to hundreds of apps. Fill in the blanks: "When THIS happens in THIS app, do THAT in THAT app."

**Strengths:**
- Anyone can use them -- literally no coding required
- Fast to set up -- build a working automation in minutes
- Huge app libraries -- thousands of pre-built integrations
- Great for simple, linear workflows

**Limitations:**
- Limited customization -- you're constrained to what the tool offers
- Can get expensive at scale -- pricing is per task/operation
- Complex logic is hard -- branching, loops, and error handling are clunky
- You don't own the infrastructure -- if Zapier goes down, so do your automations

**Wizarding equivalent:** A training wand. Safe, reliable, perfect for learning. But you'll outgrow it.

**Level 2: Low-Code Tools (Standard Wands)**

Tools like **n8n** are standard-issue wands -- powerful enough for real work, with the option to add custom spellwork when you need it.

**How they work:** Visual workflow builder (drag-and-drop nodes), but with the ability to write custom code inside any step. Self-hostable, so you control the infrastructure.

**Strengths:**
- Visual building for most tasks -- still accessible to non-coders
- Custom code nodes when you need more power (JavaScript, Python)
- Self-hostable -- you own your data and infrastructure
- Complex logic is manageable -- branching, loops, error handling all built in
- More cost-effective at scale than no-code tools

**Limitations:**
- Steeper learning curve than pure no-code
- Self-hosting requires some technical knowledge
- Debugging can be more complex
- Smaller community than Zapier/Make (but growing fast)

**Wizarding equivalent:** A proper Ollivanders wand. Versatile, powerful, grows with you. The standard for serious practitioners.

**Level 3: Full Code (The Elder Wand)**

Writing automations in **Python**, **JavaScript**, or other programming languages. Maximum power. Maximum flexibility. Maximum responsibility.

**How they work:** You write every line of code. You control every decision, every data transformation, every error handler. You deploy to your own servers or cloud functions.

**Strengths:**
- Unlimited flexibility -- if you can code it, you can automate it
- Best performance -- no platform overhead
- Complete control over logic, data handling, and error management
- Can build things that no-code/low-code tools simply can't do
- No per-task pricing -- just compute costs

**Limitations:**
- Requires real programming knowledge
- Takes longer to build (you're building everything from scratch)
- Maintenance burden -- you fix every bug, handle every edge case
- No visual interface -- harder to explain to non-technical teammates

**Wizarding equivalent:** The Elder Wand. Unmatched power in the right hands. Dangerous paperweight in the wrong ones.

**Level 4: AI-Assisted Automation (Magic Itself Helping You)**

This is the newest school of automation magic, and it's genuinely changing everything. Tools like **Claude**, **MCPs (Model Context Protocol)**, and AI agents don't just follow your instructions -- they can understand intent, make decisions, and even write automation code FOR you.

**How they work:** You describe what you want in natural language. The AI understands the goal, selects the right tools, writes the code or configures the workflow, and can even test and debug it.

**Strengths:**
- Natural language interface -- describe what you want, not how to build it
- Can bridge the gap between no-code and full-code
- Handles complexity that would take hours to code manually
- Continuously improving -- gets better over time
- Can orchestrate across multiple platforms simultaneously

**Limitations:**
- Requires clear communication (garbage in, garbage out)
- You still need to understand WHAT you're automating (the fundamentals from this module!)
- AI can make mistakes -- you need to verify the output
- Not a replacement for understanding -- it's a force multiplier

**Wizarding equivalent:** This is like having magic itself as your tutor. Not a wand, not a spell -- the actual force of magic guiding your hand. But you still need to know what you want to achieve.

**The Critical Question: When Do You Use Each Level?**

```
DECISION MATRIX: CHOOSING YOUR WAND
=============================================

Use NO-CODE (Training Wand) when:
  - The task is simple and linear
  - Speed of setup matters more than customization
  - Non-technical team members need to maintain it
  - Budget allows for per-task pricing
  - You're prototyping an idea quickly

Use LOW-CODE (Standard Wand) when:
  - You need some custom logic but still want visual building
  - You're connecting multiple systems with complex flows
  - You want to self-host for data control
  - The automation is business-critical and needs reliability
  - You need branching, loops, or error handling

Use FULL CODE (Elder Wand) when:
  - No existing tool does what you need
  - Performance is critical (high volume, low latency)
  - You need deep integration with custom systems
  - The automation involves complex data transformations
  - You have engineering resources to build and maintain it

Use AI-ASSISTED (Magic Itself) when:
  - You need to build something complex but don't have weeks to code
  - You want to accelerate your workflow at any level
  - You need to analyze, debug, or improve existing automations
  - You're exploring possibilities and need rapid prototyping
  - You're learning and want an intelligent tutor (hi, that's me)

=============================================
```

The secret? **Most professionals use a MIX.** Low-code for the main workflow, with custom code nodes for tricky parts, built with AI assistance, and connected to no-code tools where simple integrations exist. The best wand is the one that gets the job done.

### SHOW

Here's the same automation -- "Send a Slack message when a new row is added to a Google Sheet" -- implemented at each level:

```
LEVEL 1: NO-CODE (Zapier)
================================
Step 1: Choose trigger app → Google Sheets
Step 2: Choose trigger event → "New Spreadsheet Row"
Step 3: Connect your Google account (click, click, done)
Step 4: Choose action app → Slack
Step 5: Choose action event → "Send Channel Message"
Step 6: Map fields: Channel = #general, Message = "New entry: {{row data}}"
Step 7: Test → Turn on

Total time: ~5 minutes
Code written: 0 lines
Monthly cost: ~$20/month (Zapier Starter)


LEVEL 2: LOW-CODE (n8n)
================================
- Google Sheets Trigger node (polls for new rows)
  → Set node (format the message)
    → IF node (only if the row has a name field)
      → Slack node (send message to #general)
      → Error handler (log failures)

Total time: ~15 minutes
Code written: Maybe a few lines in the Set node
Monthly cost: Free (self-hosted) or ~$20/month (cloud)


LEVEL 3: FULL CODE (Node.js)
================================
const { google } = require('googleapis');
const { WebClient } = require('@slack/web-api');

// Authenticate with Google Sheets API
// Poll for new rows every 60 seconds
// Compare row count to last known count
// If new rows found, format message
// Send to Slack via API
// Handle errors, retries, logging
// Store last known row count in database

Total time: ~2-4 hours
Code written: ~100-150 lines
Monthly cost: ~$5/month (server hosting)


LEVEL 4: AI-ASSISTED (Claude + MCP)
================================
You: "Build me an n8n workflow that sends a Slack message
      to #general whenever a new row is added to this
      Google Sheet. Include error handling."

Claude: *builds the complete workflow, configures nodes,
        sets up error handling, tests it, deploys it*

Total time: ~5 minutes
Code written: 0 by you (AI wrote what was needed)
Monthly cost: Free (self-hosted n8n)
```

Same result. Four very different paths. All valid.

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: Your First Pseudocode Spell (BUILD -- 35 points)**

Exercise ID: `m1-ex4`

Your mission: Write **pseudocode** (plain-English instructions that look like code) for the following automation:

> **"When a new row is added to a Google Spreadsheet, check if the 'Status' column says 'Approved.' If it does, send a Slack message to the #approvals channel with the person's name and the amount from the spreadsheet."**

Your pseudocode should include:
1. **The trigger** -- what kicks it off
2. **The data extraction** -- what information you pull from the spreadsheet
3. **The condition** -- what you check before proceeding
4. **The action** -- what message gets sent and where
5. **Error handling** -- what happens if something goes wrong

**Template to get you started:**

```
AUTOMATION: [Give it a name]
TRIGGER: [What starts this?]

WHEN triggered:
  1. [First step]
  2. [Second step]
  3. IF [condition]:
       [What to do if true]
     ELSE:
       [What to do if false]
  4. [Any cleanup or logging]

ON ERROR:
  [What happens if something fails?]
```

**Hints (only give these if the student asks or struggles):**
- Hint 1: Think about what data is in the new row -- you'll need to read specific columns.
- Hint 2: The Slack message should include info from the row -- how do you reference that data?
- Hint 3: For error handling, think about what could go wrong: what if the spreadsheet is empty? What if Slack is down? What if the Status column has a typo?

**Example of a good answer:**

```
AUTOMATION: The Approval Patronus
TRIGGER: New row detected in Google Spreadsheet "Approvals Tracker"

WHEN triggered:
  1. READ the new row's data:
     - name = row["Name"]
     - amount = row["Amount"]
     - status = row["Status"]

  2. VALIDATE the data:
     - IF name is empty OR amount is empty, LOG warning and STOP

  3. CHECK the condition:
     - IF status == "Approved":
         SEND Slack message to #approvals:
           "New approval: {name} for ${amount} has been approved!"
       ELSE:
         LOG: "Row added but status is '{status}', not 'Approved'. Skipping."
         STOP

  4. LOG: "Successfully sent approval notification for {name}"

ON ERROR:
  - IF spreadsheet read fails: LOG "Could not read spreadsheet" and RETRY once
  - IF Slack send fails: LOG "Could not send Slack message" and ALERT admin
  - IF unknown error: LOG full error details and STOP gracefully
```

**Completion criteria:** Student writes pseudocode that includes all 5 required elements (trigger, data extraction, condition, action, error handling). It doesn't need to be syntactically perfect -- the goal is demonstrating logical thinking about automation flow. Award full points for complete, logical pseudocode even if formatting varies.

### CHECKPOINT

> **Quick wand check:**
>
> Your team needs a simple automation that posts a motivational quote to Slack every morning. No one on the team knows how to code. What level of the automation spectrum is the best fit?
>
> (a) Full Code -- write a Python script with a cron job
> (b) No-Code -- use Zapier with a schedule trigger and Slack action
> (c) AI-Assisted -- have Claude build a custom system
> (d) Low-Code -- set up an n8n workflow with custom nodes
>
> **Correct answer: (b)**
> This is a simple, linear automation with no complex logic. No one on the team codes. The job doesn't require custom logic or high-volume processing. A no-code tool like Zapier handles this in 5 minutes. Using full code or even low-code for this would be like using the Elder Wand to light a candle -- technically possible, hilariously overkill. The best tool matches the complexity of the task AND the skill level of the team maintaining it.

---

**[PLAY AUDIO: play-cached module_complete]**
## Module 1 Complete

**What was covered:**
- Lesson 1: What automation is (making computers do repetitive tasks) and its three core components
- Lesson 2: Deep dive into triggers, actions, and conditions -- how they work together
- Lesson 3: The four types of automations (Scheduled, Event-Driven, Webhook, Manual)
- Lesson 4: The no-code to full-code spectrum and when to use each level

**Key takeaways:**
1. Every automation has three parts: **Trigger** (the incantation), **Action** (the effect), **Condition** (the aim)
2. There are four types of automation triggers: **Scheduled**, **Event-Driven**, **Webhook**, **Manual**
3. The right tool depends on the task complexity, team skill level, and budget
4. AI-assisted automation is a force multiplier at every level -- but you still need to understand the fundamentals

**What's next:**
Module 2: Potion Ingredients -- Data & JSON. Now that you know HOW automations work, it's time to learn about the raw material they run on: data. Specifically, the universal language of automation data -- JSON. Think of it as learning to identify and prepare potion ingredients before you start brewing.

**Transition:** Offer the Module 1 Quiz. Student must score 4/5 or higher to unlock Module 2.

> *"You've learned your first spells, young witch/wizard. Your wand hand is steadier. Your understanding is deeper. But knowledge without testing is like a wand without a wizard -- it just sits there looking pretty. Ready to prove what you've learned? The Module 1 quiz awaits. Or would you prefer a Butterbeer Break first?"*
