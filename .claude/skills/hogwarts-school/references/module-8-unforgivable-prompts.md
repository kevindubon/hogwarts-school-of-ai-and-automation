<!-- Author: Kevin Dubon -->

# Module 8: The Unforgivable Prompts — Prompt Engineering

> **BONUS MODULE** — Unlocks after completing Module 3 (The Sorting Algorithm). No prerequisite knowledge from Modules 4–7 required.

> *"Your prompt is so bad it should be illegal. Fortunately, I'm here to rehabilitate you."*

---

## Module Overview

In the wizarding world, three curses are so terrible they earn a lifetime sentence in Azkaban. In the AI world, three categories of bad prompts are so destructive they should carry the same penalty. This module teaches you how to craft prompts that actually work — precise, powerful, and ethical incantations that bend AI to your will without breaking everything in the process.

Bad prompts are seductive. They *seem* like they should work. You type "make me a report" and expect brilliance. That's like pointing your wand at a teacup and shouting "DO SOMETHING!" and then being surprised when it explodes.

Good prompt engineering is the difference between a first-year who accidentally sets their eyebrows on fire and a seventh-year who conjures a Patronus under pressure.

**What you'll learn:**
- Why the exact words you use determine 90% of AI output quality
- The 6-component anatomy of a perfect prompt
- The three "Unforgivable" prompt anti-patterns and how to defeat them
- Advanced techniques used by prompt engineering professionals
- How to write prompts that survive inside live automations

**Prerequisites:** Module 3 (The Sorting Algorithm) — you should understand what AI models are and how they process information at a basic level.

---

## Lesson 1: Why Prompts Matter (The Power of Words)

### HOOK

Consider these two requests to an AI:

**Prompt A:** "Tell me about sales."

**Prompt B:** "You are a business analyst. Given our Q3 2025 sales data for the Northeast region, identify the top 3 underperforming product categories by revenue compared to Q2, and present them in a table with columns for Product Category, Q2 Revenue, Q3 Revenue, and % Change. Exclude categories with fewer than 10 transactions."

Prompt A could return literally anything — a Wikipedia article about sales techniques, a motivational speech about hustle culture, a history of commerce since the Phoenicians. Prompt B returns exactly what you need.

The difference? About 30 seconds of thinking before you hit Enter.

In the wizarding world, Hermione Granger understood this instinctively. When Ron tried to levitate a feather by mumbling "Wingardium Leviosa" with the wrong emphasis, nothing happened. When Hermione pronounced it precisely — *"It's Levi-O-sa, not Levio-SA!"* — the feather floated. Same spell. Same wand. Same feather. The only variable was **how she said it**.

AI works exactly the same way. The model doesn't change. The data doesn't change. The only variable is your prompt. And that makes prompt engineering one of the highest-leverage skills you can develop.

### TEACH

**Core Principle: Garbage In, Garbage Out**

AI models are not mind readers. They are incredibly sophisticated pattern-matching systems that respond to the specific text you provide. They don't know:

- What you *meant* to ask (only what you *actually* asked)
- What context is obvious to you (they have no memory of your Tuesday meeting)
- What format you want (unless you specify it)
- What constraints matter (unless you state them)

This means the quality of your output is almost entirely determined by the quality of your input. This is the single most important concept in this module.

**The Specificity Spectrum**

Think of prompts on a spectrum from vague to precise:

| Level | Example | What You Get |
|-------|---------|-------------|
| **Vague** | "Accio data" | Random, unfocused information dump |
| **Somewhat specific** | "Accio sales data" | A wall of text about sales, probably too broad |
| **Specific** | "Accio Q3 revenue data for the London office" | Closer, but format and scope are unclear |
| **Precise** | "Accio specifically the third-quarter revenue data for the London office, formatted as a table, excluding outliers beyond 2 standard deviations" | Exactly what you need, how you need it |

Each level of specificity eliminates ambiguity. Ambiguity is the enemy. Every word you add that removes a possible misinterpretation makes the output better.

**Novice vs. Expert Prompts**

A novice prompt relies on the AI to guess what you want:
> "Write an email about the project update."

An expert prompt leaves nothing to chance:
> "Write a 3-paragraph email to the engineering team updating them on the CRM migration project. Tone: professional but encouraging. Paragraph 1: Summary of what was completed this sprint (database schema migration, API endpoints for user management). Paragraph 2: What's blocked (waiting on SSO provider credentials — tag Sarah Chen). Paragraph 3: Next sprint priorities. Keep it under 200 words."

The novice prompt might produce something usable 20% of the time. The expert prompt produces something usable 95% of the time. That's not a small difference — that's the difference between a tool that frustrates you and a tool that transforms your productivity.

### SHOW

**Real-World Example: Summarizing a Meeting**

**Bad Prompt:**
> "Summarize this meeting transcript."

**What you get:** A generic, overly long summary that buries the action items and doesn't distinguish between small talk and critical decisions.

**Good Prompt:**
> "Summarize this meeting transcript into three sections: (1) KEY DECISIONS — bullet points of what was decided and by whom, (2) ACTION ITEMS — each item with an owner and deadline, (3) OPEN QUESTIONS — unresolved topics that need follow-up. Keep the total summary under 300 words. If no deadline was mentioned for an action item, flag it as 'DEADLINE NEEDED'."

**What you get:** A structured, actionable summary that you can paste directly into your project management tool.

The difference in effort? Maybe 45 seconds. The difference in usefulness? Night and day.

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: Observe and Compare (OBSERVE)**

Below are 3 pairs of prompts. For each pair, identify **at least two specific reasons** why Prompt B is better than Prompt A.

**Pair 1:**
- **A:** "Help me with my presentation."
- **B:** "I'm presenting our Q4 marketing results to the executive team next Tuesday. Create an outline for a 15-minute presentation that covers: campaign performance vs. targets, budget utilization, and recommended Q1 adjustments. The audience is non-technical. End with 3 discussion questions."

**Pair 2:**
- **A:** "Analyze this data."
- **B:** "Analyze the attached CSV of customer support tickets from January 2026. Group tickets by category, identify the top 3 categories by volume, calculate average resolution time for each, and flag any category where resolution time exceeds our 24-hour SLA. Present results as a markdown table."

**Pair 3:**
- **A:** "Write a Slack message about the outage."
- **B:** "Write a Slack message for the #engineering channel informing the team about the payment processing outage that started at 2:15 PM EST. Tone: calm and factual, not alarming. Include: what's affected (checkout flow only, not existing subscriptions), current status (investigating, no ETA yet), who to contact (on-call: @mike). Keep it under 100 words."

**What to look for in your analysis:**
- Does the prompt specify the audience?
- Does it define the format or structure?
- Does it set constraints (length, scope, exclusions)?
- Does it provide context the AI wouldn't otherwise have?
- Does it define the tone or style?

### CHECKPOINT

You should be able to answer these questions:

1. Why does specificity matter more than length in a prompt?
2. What information does an AI model NOT have unless you provide it?
3. If you get a bad output from an AI, what should you change first — the model or the prompt?

**Key Takeaway:** The prompt is not a suggestion — it's the *entire instruction set*. If your output is wrong, your prompt is wrong. Fix the prompt.

---

## Lesson 2: The 6-Component Prompt Anatomy (Spell Structure)

### HOOK

Every properly cast spell in the wizarding world has components: the incantation (words), the wand movement (gesture), the intent (mental focus), the power (magical energy), the target (what you're affecting), and the timing (when you cast). Miss any one of these and the spell misfires. Seamus Finnigan learned this the hard way — repeatedly — usually via explosion.

Prompts have the same structure. There are six components, and each one eliminates a category of possible failure. You don't always need all six (some simple tasks only need two or three), but knowing all six means you can diagnose *why* a prompt failed and fix it surgically instead of rewriting the whole thing from scratch.

### TEACH

**The 6-Component Prompt Framework**

#### 1. ROLE — Who is the AI?

Tell the AI *who* to be. This sets the expertise level, vocabulary, and perspective.

- "You are a senior data analyst at a Fortune 500 company..."
- "You are an experienced recruiter specializing in technical roles..."
- "You are a patient teacher explaining concepts to a 10-year-old..."

**Why it matters:** A data analyst and a marketing manager will analyze the same dataset differently. The role determines the lens.

#### 2. CONTEXT — What background information is needed?

Provide the situation, data, or background the AI needs to do its job.

- "Given this dataset of 500 sales records from our CRM..."
- "Our company is a 200-person SaaS startup that just closed Series B..."
- "The client has complained three times about invoice accuracy in the last month..."

**Why it matters:** Without context, the AI fills in blanks with generic assumptions. Your context replaces generic with specific.

#### 3. TASK — What exactly should the AI do?

State the action clearly and unambiguously.

- "Analyze the trends and identify the top 3 growth opportunities..."
- "Write a follow-up email that addresses their concerns..."
- "Compare these two approaches and recommend one with justification..."

**Why it matters:** "Help me with this" is not a task. "Identify the three highest-churn customer segments and explain why they're leaving" is a task.

#### 4. FORMAT — How should the response be structured?

Define the output structure so you can actually use it.

- "Present as a table with columns for Name, Score, and Recommendation..."
- "Return the result as a JSON object with keys: summary, action_items, risks..."
- "Write in bullet points, no more than 5 bullets, each under 20 words..."

**Why it matters:** An unformatted response requires you to manually restructure it. That defeats the purpose.

#### 5. CONSTRAINTS — What should the AI NOT do?

Set boundaries and exclusions.

- "Do not include speculative projections..."
- "Limit the response to 200 words..."
- "Only consider data from 2025 onwards..."
- "Do not use jargon — the audience is non-technical..."

**Why it matters:** AI models are eager to please. Without constraints, they'll over-deliver in unhelpful ways — writing 2,000 words when you needed 200, or including caveats that dilute the message.

#### 6. EXAMPLES — Show, don't just tell.

Provide one or more examples of the input and expected output.

- "Here's an example of the expected output: | Product | Revenue | Change | |---|---|---| | Widget A | $50K | +12% |"
- "For instance, if the input is 'Customer called about late delivery,' the output should be: 'Category: Logistics, Priority: Medium, Suggested Action: Check shipping tracker and send proactive update.'"

**Why it matters:** Examples are the single most powerful prompt component. They eliminate ambiguity in a way that instructions alone cannot. Showing is almost always better than telling.

**The Spell-Casting Analogy**

| Spell Component | Prompt Component | What Happens if You Skip It |
|----------------|-----------------|---------------------------|
| Incantation (words) | **Task** | Nothing happens — the AI doesn't know what to do |
| Wand movement (gesture) | **Format** | The spell works but hits the wrong target — output is unusable |
| Intent (mental focus) | **Role** | The spell is unfocused — generic, unspecialized output |
| Magical energy (power) | **Context** | The spell fizzles — output lacks depth and relevance |
| Target specification | **Constraints** | Collateral damage — output includes unwanted elements |
| Prior practice (muscle memory) | **Examples** | Inconsistent results — sometimes great, sometimes terrible |

### SHOW

**Building a Prompt Component by Component**

Let's say you need to analyze customer feedback data. Watch how each component improves the prompt:

**Task only:**
> "Analyze this customer feedback."

**+ Role:**
> "You are a customer experience analyst. Analyze this customer feedback."

**+ Context:**
> "You are a customer experience analyst. We're a B2B SaaS company that just launched a new onboarding flow 3 weeks ago. Analyze this customer feedback from the last 30 days."

**+ Format:**
> "You are a customer experience analyst. We're a B2B SaaS company that just launched a new onboarding flow 3 weeks ago. Analyze this customer feedback from the last 30 days. Present findings as: (1) Top 3 pain points ranked by frequency, (2) Sentiment trend (improving/declining/stable), (3) Recommended actions as a numbered list."

**+ Constraints:**
> "You are a customer experience analyst. We're a B2B SaaS company that just launched a new onboarding flow 3 weeks ago. Analyze this customer feedback from the last 30 days. Present findings as: (1) Top 3 pain points ranked by frequency, (2) Sentiment trend (improving/declining/stable), (3) Recommended actions as a numbered list. Focus only on onboarding-related feedback. Exclude feedback about pricing or billing. Keep the analysis under 400 words."

**+ Example:**
> (All of the above, plus:)
> "Example pain point format: **Pain Point:** 'Setup wizard crashes on step 3' — Frequency: 12 mentions — Severity: High — Recommended Action: Escalate to engineering with reproduction steps."

Each component added makes the output more predictable, more useful, and more aligned with what you actually need.

### TRY

**Exercise: Rebuild a Broken Prompt (DO)**

Here's a vague, underperforming prompt:

> "Look at our employee data and tell me who might leave."

Your task: Rewrite this prompt using all 6 components. Use the framework below as your template:

```
ROLE: [Who should the AI be?]
CONTEXT: [What background does the AI need?]
TASK: [What specific action should it take?]
FORMAT: [How should the output be structured?]
CONSTRAINTS: [What should be excluded or limited?]
EXAMPLE: [What does a good output entry look like?]
```

**Hints:**
- What kind of analyst would do this work? (Role)
- What data fields are available? Think about what predicts attrition. (Context)
- "Might leave" is vague — what does that mean operationally? (Task)
- How would HR actually use this output? (Format)
- Should it include contractors? Interns? People already on notice? (Constraints)
- Show one example entry so the AI knows the depth you expect. (Example)

### CHECKPOINT

You should be able to:

1. Name all 6 components from memory
2. Identify which component is missing when a prompt produces bad output
3. Explain why Examples are often the most powerful single component

**Key Takeaway:** You don't always need all 6 components — a simple question might only need Task and Format. But when output quality matters, adding components is your most reliable lever.

---

**[PLAY AUDIO: play-cached peeves_interrupt]**
## Lesson 3: Common Prompt Anti-Patterns (The Unforgivable Three)

### HOOK

In Defense Against the Dark Arts class, Professor Moody (well, Barty Crouch Jr. disguised as Moody, but let's not get into that) demonstrated the three Unforgivable Curses to a horrified classroom. They're called "Unforgivable" not because they're powerful — lots of spells are powerful — but because they cause suffering with no constructive purpose.

Bad prompts work the same way. They *seem* like reasonable approaches, but they cause suffering — yours, your team's, and arguably the AI's. There are three categories of prompt anti-patterns so destructive they deserve their own dark classification.

Let's meet them. Don't practice them. Learn to recognize and destroy them.

### TEACH

#### The Imperius Prompt (Too Controlling)

**Named after:** The Imperius Curse — total domination of another's will, removing all independent thought.

**What it looks like:** A prompt that micromanages every single aspect of the response, leaving absolutely no room for the AI to apply its own reasoning or expertise.

**Example:**
> "Write exactly 4 sentences. The first sentence must be 12 words and start with 'The'. The second sentence must contain the word 'revenue' as the 5th word. Use exactly 3 commas in the third sentence. The fourth sentence must end with an exclamation point. Do not use any word longer than 8 characters except 'analytics'. Capitalize the 3rd word of every sentence."

**Why it's Unforgivable:** You're not using AI at this point — you're using a very expensive text formatter. The Imperius Prompt strips the AI of its ability to generate coherent, natural, useful language. The output will be technically compliant and completely useless.

**The fix:** Constrain the *outcome*, not the *process*. Instead of dictating word counts and comma placement, describe what good output looks like and let the AI figure out how to get there.

**Fixed version:**
> "Write a concise 4-sentence summary of Q3 analytics results. Tone: professional and confident. Focus on revenue performance. Keep it punchy — this goes in an executive Slack channel."

#### The Crucio Prompt (Painful Ambiguity)

**Named after:** The Cruciatus Curse — inflicts unbearable pain with no clear purpose.

**What it looks like:** A prompt so vague, so lacking in direction, that the AI thrashes around trying to figure out what you could possibly want. The output is usually a sprawling, hedge-everything, cover-all-bases mess.

**Example:**
> "Do something with this data."

Or the slightly more sophisticated but equally vague:
> "Give me some insights."

Or the one that looks specific but isn't:
> "Make it better."

**Why it's Unforgivable:** The AI will produce *something* — it always does — but it'll be generic, bloated, and misaligned with what you actually needed. Then you'll re-prompt three or four times, each time getting incrementally closer, having wasted 15 minutes when a well-crafted initial prompt would have taken 60 seconds.

**The fix:** Apply the 6-component framework. If you can't specify the task clearly, you probably haven't thought through what you actually need yet. That's not an AI problem — that's a thinking problem. Solve it before you prompt.

**Fixed version:**
> "Analyze this customer support ticket data from February 2026. Identify the 5 most common complaint categories by volume. For each category, show: number of tickets, average resolution time, and one representative example ticket. Present as a markdown table."

#### The Avada Kedavra Prompt (Kills the Output)

**Named after:** The Killing Curse — instant, irreversible destruction.

**What it looks like:** A prompt that contains contradictory instructions, making it impossible for the AI to produce useful output. The prompt kills the response before it's born.

**Example:**
> "Write a comprehensive, detailed analysis of market trends. Keep it under 50 words. Include data from all 12 months. Be concise but thorough. Don't leave anything out, but make it brief."

Or:
> "Write a formal business proposal in a casual, fun tone. Be authoritative but humble. Use technical jargon but keep it accessible to non-experts."

**Why it's Unforgivable:** The AI is forced to satisfy mutually exclusive requirements. "Comprehensive" and "under 50 words" cannot coexist. "Formal" and "casual" cannot coexist. The AI will try to split the difference and produce something that fails at both goals.

**The fix:** Before sending a prompt, read it back and ask: "Can a single response actually satisfy ALL of these instructions simultaneously?" If not, either remove the contradiction or split it into two separate prompts.

**Fixed version:**
> "Write a 200-word executive summary of 2025 market trends in our sector. Focus on the 3 most impactful trends. Tone: professional but accessible — avoid jargon where possible, and define it where necessary."

### SHOW

**Diagnosis Guide — How to Spot Each Anti-Pattern**

| Symptom | Likely Culprit | Diagnostic Question |
|---------|---------------|-------------------|
| Output is technically correct but reads like a robot having a seizure | **Imperius** | "Am I constraining the format more than the substance?" |
| Output is a vague, meandering wall of text that sort of covers everything | **Crucio** | "Did I actually specify what I wanted, or did I just gesture vaguely?" |
| Output seems confused, contradicts itself, or hedges everything | **Avada Kedavra** | "Do my instructions conflict with each other?" |
| You've re-prompted 3+ times and still aren't happy | **Probably Crucio** | "Am I hoping the AI will read my mind instead of my prompt?" |
| Output is technically perfect but completely useless for your actual need | **Imperius** | "Did I optimize for the wrong constraints?" |

### TRY

**[PLAY AUDIO: play-cached cameo_mcgonagall]**
**Exercise: Dark Arts Defense (ANALYZE)**

Below are 5 prompts. For each one:
1. Identify which "Unforgivable" anti-pattern it commits (Imperius, Crucio, or Avada Kedavra)
2. Explain *why* it's problematic in 1-2 sentences
3. Rewrite it as a functional prompt

**Prompt 1:**
> "Tell me about the company."

**Prompt 2:**
> "Write a 500-word blog post. Every paragraph must be exactly 100 words. The first word of each paragraph must alternate between a noun and a verb. Use exactly 15 instances of the company name. Each sentence must contain between 8 and 14 words."

**Prompt 3:**
> "Create a detailed technical specification document. Keep it to one page. Include all edge cases, error handling, API schemas, database models, authentication flows, and deployment procedures."

**Prompt 4:**
> "Do the thing with the data from last week."

**Prompt 5:**
> "Write a response that is creative and follows this exact template word-for-word: 'Dear [Name], Thank you for your [noun]. We will [verb] within [number] days. Regards, [Company].'"

### CHECKPOINT

You should be able to:

1. Name each Unforgivable Prompt and describe its core problem in one sentence
2. Diagnose which anti-pattern a failing prompt suffers from
3. Explain why the Crucio Prompt (ambiguity) is the most common anti-pattern in practice

**Key Takeaway:** Most bad prompts aren't bad because the user is lazy — they're bad because the user doesn't realize how much context exists only in their own head. The Unforgivable Prompts are a diagnostic tool. When output is bad, ask: "Am I being too controlling, too vague, or contradictory?" One of those three is almost always the answer.

---

## Lesson 4: Advanced Techniques (N.E.W.T. Level Prompting)

### HOOK

In the wizarding world, N.E.W.T.s (Nastily Exhausting Wizarding Tests) are the advanced exams taken in seventh year. Only students with strong O.W.L. results even attempt them. They separate the Hermiones from the Crabbes and Goyles of the world.

This lesson is your N.E.W.T. exam for prompt engineering. You've mastered the basics (6-component framework) and learned what NOT to do (Unforgivable Three). Now we go advanced: techniques used by professional prompt engineers, AI researchers, and power users who squeeze maximum performance out of language models.

Fair warning: this gets technical. But you survived the Sorting Algorithm in Module 3, so you can handle it.

### TEACH

#### Technique 1: Chain-of-Thought Prompting

**What it is:** Asking the AI to show its reasoning step by step before giving a final answer.

**Why it works:** Language models are better at complex reasoning when they "think out loud." It's the same reason showing your work in math class leads to better answers — the process catches errors before they reach the conclusion.

**How to use it:**

Instead of:
> "What's the best pricing strategy for our new product?"

Try:
> "Think through this step by step. First, identify the key factors that influence SaaS pricing (market positioning, cost structure, competitor pricing, customer willingness to pay). Then, analyze each factor for our situation: [provide context]. Finally, recommend a pricing strategy with your reasoning."

**The magic phrase:** "Think step by step" or "Walk me through your reasoning" or "Before answering, analyze the key factors."

**When to use it:** Complex analysis, math problems, multi-factor decisions, debugging, anything where the reasoning matters as much as the answer.

#### Technique 2: Few-Shot Examples

**What it is:** Providing 2-3 examples of the exact input-to-output transformation you want.

**Why it works:** Examples communicate patterns that instructions struggle to convey. You can write a paragraph describing the tone and format you want, or you can show two examples and the AI will match them instantly.

**How to use it:**

> "Categorize each customer feedback entry. Here are examples:
>
> Input: 'The dashboard loads so slowly I want to throw my laptop'
> Output: Category: Performance | Sentiment: Negative | Priority: High
>
> Input: 'Love the new export feature, saves me hours every week'
> Output: Category: Feature Feedback | Sentiment: Positive | Priority: Low
>
> Input: 'Can you add a dark mode? My eyes hurt at night'
> Output: Category: Feature Request | Sentiment: Neutral | Priority: Medium
>
> Now categorize these entries: [your data]"

**The rule of three:** Two examples establish a pattern. Three examples confirm it. More than five examples usually provides diminishing returns.

**When to use it:** Classification tasks, data transformation, tone matching, any task where "I'll know it when I see it" is how you'd describe the desired output.

#### Technique 3: System Prompts vs. User Prompts

**What it is:** Understanding the two layers of prompting in most AI applications.

- **System prompt:** Sets the overall behavior, personality, and rules. Persistent across the conversation. Think of it as the AI's "job description."
- **User prompt:** The specific request within a conversation. Changes with every message.

**How they interact:**

```
System Prompt: "You are a senior financial analyst. Always present numbers
with 2 decimal places. Flag any figure that deviates more than 15% from
the previous period. Never provide investment advice."

User Prompt: "Analyze Q3 revenue by region."
```

The system prompt sets the guardrails. The user prompt sets the task. The AI operates within the intersection.

**Why it matters for automation:** In tools like n8n, Make, or custom applications, the system prompt is configured once and the user prompt changes dynamically based on incoming data. Understanding this separation is critical for building reliable automated AI workflows.

#### Technique 4: Prompt Chaining

**What it is:** Using the output of one prompt as the input for the next, building a multi-step reasoning pipeline.

**Why it works:** Complex tasks often can't be solved in a single prompt. Breaking them into a chain of focused prompts produces better results than one massive prompt that tries to do everything.

**Example chain:**

```
Prompt 1: "Extract all action items from this meeting transcript."
    Output → List of action items

Prompt 2: "For each action item, identify the owner and estimate priority
(High/Medium/Low) based on the discussion context. [paste action items]"
    Output → Prioritized, assigned action items

Prompt 3: "Format these action items as Jira ticket descriptions with
acceptance criteria. [paste prioritized items]"
    Output → Ready-to-use Jira tickets
```

Each prompt does one thing well. The chain does something none of them could do alone.

**When to use it:** Data processing pipelines, document generation, analysis-to-recommendation workflows, anything with clear sequential stages.

#### Technique 5: Temperature and Creativity Control

**What it is:** Understanding how model settings (particularly "temperature") affect output.

- **Low temperature (0.0–0.3):** Deterministic, consistent, factual. The model picks the most probable next word every time. Use for: data analysis, classification, extraction, code generation.
- **Medium temperature (0.4–0.7):** Balanced. Good default for most tasks. Use for: writing, summarization, general Q&A.
- **High temperature (0.8–1.0+):** Creative, varied, surprising. The model explores less probable word choices. Use for: brainstorming, creative writing, generating alternatives.

**How to control it in prompts (when you can't set the parameter):**

- For low-temperature behavior: "Be precise and factual. Give me the single best answer."
- For high-temperature behavior: "Be creative. Give me 5 wildly different approaches, including unconventional ones."

**When it matters:** In automation, you almost always want low temperature for reliability. In brainstorming, you want high temperature for novelty. Mismatching temperature to task is a subtle but common mistake.

### SHOW

**Combining Advanced Techniques — A Complete Example**

Task: Build an AI-powered customer support ticket router.

**Step 1 — Few-shot classification prompt:**

> System: "You are a support ticket classifier. Categorize tickets into exactly one of: Billing, Technical, Account, Feature Request, or Escalation. Respond with ONLY the category name."
>
> Examples:
> "I was charged twice" → Billing
> "Login page shows error 500" → Technical
> "I want to cancel my subscription" → Account
> "Can you add dark mode?" → Feature Request
> "I've been waiting 3 weeks and nobody has responded" → Escalation
>
> Classify: "[dynamic ticket text]"

**Step 2 — Chain into priority assessment (for Escalation tickets):**

> "This support ticket was flagged as Escalation: '[ticket text]'. On a scale of 1-5, rate the urgency based on: (1) how long the customer has been waiting, (2) the business impact mentioned, (3) the emotional tone. Think step by step, then give a final rating."

**Step 3 — Chain into response drafting:**

> "Draft a response to this escalated support ticket (urgency: [rating]/5). Tone: empathetic and action-oriented. Acknowledge the delay, provide a concrete next step, and give a timeline. Keep under 100 words."

Three prompts. Three focused tasks. One powerful pipeline.

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: Build a Complete Prompt (BUILD)**

Your task: Write a complete 6-component prompt for this real-world scenario:

**Scenario:** You have a CSV file containing 500 rows of customer data with columns: Company Name, Industry, Last Purchase Date, Total Revenue (Lifetime), Support Tickets (Last 90 Days), and NPS Score. You need Claude to analyze this data and generate a prioritized outreach list for the customer success team.

**Requirements:**
1. Use all 6 components (Role, Context, Task, Format, Constraints, Examples)
2. Incorporate at least ONE advanced technique (chain-of-thought, few-shot, or prompt chaining)
3. The output should be immediately usable by a non-technical customer success manager
4. Include error handling: what should the AI do if data is missing or inconsistent?

**Evaluation criteria for your prompt:**
- Could someone else use this prompt and get a consistent, useful result?
- Does the format match how the output will actually be used?
- Are the constraints realistic (not Imperius-level over-control)?
- Is the task specific enough (not Crucio-level vague)?
- Are the requirements internally consistent (not Avada Kedavra contradictions)?

### CHECKPOINT

You should be able to:

1. Explain when to use chain-of-thought vs. few-shot examples
2. Describe the difference between system prompts and user prompts
3. Explain why prompt chaining often outperforms a single long prompt
4. Match temperature levels to appropriate task types

**Key Takeaway:** Advanced prompt engineering isn't about memorizing tricks — it's about understanding *how* language models process information and structuring your input to work with that process, not against it.

---

## Lesson 5: Prompt Engineering for Automation (Battle Magic)

### HOOK

Here's an uncomfortable truth: a prompt that works perfectly in a chat window will often fail catastrophically inside an automation.

Why? Because chat prompting is like practicing spells in a classroom — controlled conditions, immediate feedback, the ability to retry. Automation prompting is battle magic — the spell has to work the first time, under pressure, with unpredictable input, and nobody's there to intervene if it misfires.

In the Battle of Hogwarts, students who had only practiced in classrooms froze. The ones who survived were those who could cast under chaos. This lesson teaches you to write prompts that survive the chaos of production automation.

### TEACH

#### Challenge 1: Structured Output — Getting Reliable Formats

In chat, you can re-prompt if the format is wrong. In automation, the next step in the pipeline expects a specific format. If the AI returns prose when the parser expects JSON, the entire workflow breaks.

**Techniques for reliable structured output:**

**Be explicit about format:**
> "Respond ONLY with valid JSON. No markdown code fences. No explanatory text before or after. Just the JSON object."

**Provide the exact schema:**
> "Return a JSON object matching this exact structure:
> ```
> {
>   "category": "string — one of: Billing, Technical, Account",
>   "priority": "integer — 1 to 5",
>   "summary": "string — max 100 characters",
>   "requires_escalation": "boolean"
> }
> ```"

**Use few-shot examples with the exact format:**
Show 2-3 examples of input producing the exact JSON structure you need. This is the single most reliable way to get consistent structured output.

**Defensive parsing tip:** Even with perfect prompts, occasionally an AI will wrap JSON in markdown code fences or add a preamble. Your automation code should handle this gracefully (strip code fences, extract JSON from surrounding text).

#### Challenge 2: Handling Unpredictable Input

In chat, you control the input. In automation, input comes from forms, emails, APIs, webhooks — the real world. Real-world data is messy, incomplete, and occasionally insane.

**Build error handling into your prompts:**

> "If the 'company_name' field is empty or null, use 'Unknown Company' and set a flag: `"data_warning": "missing_company_name"`.
>
> If the 'revenue' field contains non-numeric characters, extract the numeric value if possible (e.g., '$50,000' → 50000). If not possible, set revenue to null and flag: `"data_warning": "unparseable_revenue"`.
>
> If the input is completely empty or unrecognizable, return: `{"error": "invalid_input", "raw_input": "[the raw text]"}`."

**The principle:** Every edge case you can imagine, specify it. Every edge case you can't imagine, add a catch-all: "For any situation not covered above, [default behavior]."

#### Challenge 3: Consistency Across Runs

The same prompt with the same input can produce slightly different outputs each time (especially at higher temperatures). In a chat, this is fine. In automation, this breaks downstream parsing and logic.

**Techniques for consistency:**

- **Use low temperature** (0.0–0.2) for classification and extraction tasks
- **Use closed-ended instructions:** "Choose one of: A, B, or C" not "What do you think?"
- **Constrain the output space:** "Respond with exactly one word: 'approve' or 'reject'" is more reliable than "Should we approve or reject this?"
- **Use enums explicitly:** "The status field must be one of: 'active', 'churning', 'lost'. No other values are acceptable."

#### Challenge 4: Testing and Iterating Prompts

Production prompts need testing just like production code. Here's the process:

**Step 1: Write the initial prompt** using the 6-component framework.

**Step 2: Test with 5-10 representative inputs.** Include:
- A "perfect" input (all fields present, clean data)
- A minimal input (only required fields)
- A messy input (typos, extra whitespace, mixed formats)
- An edge case (empty fields, unexpected values)
- An adversarial input (what could go wrong?)

**Step 3: Evaluate outputs against criteria:**
- Is the format consistent across all test cases?
- Are edge cases handled gracefully?
- Does the output match what downstream systems expect?

**Step 4: Iterate.** Fix failures by adjusting the prompt — add constraints, clarify instructions, add examples for failing cases.

**Step 5: Version your prompts.** When you change a production prompt, keep the old version. If something breaks, you need to diff what changed.

#### Challenge 5: Prompt Length vs. Reliability

Longer prompts are generally more reliable (more context = fewer assumptions) but have limits:

- **Token limits:** Models have maximum context windows. Very long prompts leave less room for output.
- **Attention degradation:** Instructions buried in the middle of very long prompts may receive less weight than instructions at the beginning or end.
- **Maintenance burden:** A 2,000-word prompt is hard to debug and update.

**The sweet spot:** As long as necessary, as short as possible. Front-load the most critical instructions. Put examples near the end (they tend to "stick" well regardless of position). Use clear section headers so the AI can parse the prompt structure.

### SHOW

**Real Automation Prompt: Customer Ticket Classification**

This is a production-ready prompt designed for an n8n automation workflow:

```
SYSTEM PROMPT:
You are a customer support ticket classifier for a B2B SaaS company.
Your job is to analyze incoming support tickets and return structured
classification data. You must ALWAYS respond with valid JSON and nothing
else — no explanation, no markdown, no preamble.

USER PROMPT:
Classify this support ticket:

"""
{ticket_text}
"""

Return a JSON object with this exact structure:
{
  "category": "<one of: billing, technical, account, feature_request, escalation>",
  "priority": <integer 1-5, where 5 is most urgent>,
  "sentiment": "<one of: positive, neutral, negative, angry>",
  "summary": "<one sentence, max 100 characters>",
  "suggested_team": "<one of: finance, engineering, customer_success, product>",
  "requires_human": <boolean — true if ambiguous, abusive, or legal mention>
}

Classification rules:
- If the ticket mentions waiting more than 7 days, set priority >= 4
- If the ticket mentions legal action, lawyers, or lawsuits, set requires_human to true and priority to 5
- If the ticket is in a language other than English, still classify it but add "language": "<detected language>" to the JSON
- If the ticket is empty or contains only whitespace, return: {"error": "empty_ticket"}

Examples:

Input: "I was charged $49.99 but my plan is $29.99. Please fix ASAP."
Output: {"category": "billing", "priority": 3, "sentiment": "negative", "summary": "Overcharged $20 on monthly plan", "suggested_team": "finance", "requires_human": false}

Input: "The API returns 500 errors every time I call /users endpoint since yesterday"
Output: {"category": "technical", "priority": 4, "sentiment": "negative", "summary": "Persistent 500 errors on /users API endpoint", "suggested_team": "engineering", "requires_human": false}

Input: "Just wanted to say your team is amazing. Sarah helped me set everything up in 10 minutes!"
Output: {"category": "account", "priority": 1, "sentiment": "positive", "summary": "Positive feedback for onboarding support from Sarah", "suggested_team": "customer_success", "requires_human": false}

Now classify the ticket above.
```

**Why this prompt works in production:**
- Format is locked down (JSON only, exact schema)
- Edge cases are handled (empty input, non-English, legal mentions)
- Few-shot examples establish the pattern firmly
- Rules are explicit and testable
- Output can be parsed reliably by downstream automation nodes

### TRY

**[PLAY AUDIO: play-cached cameo_hagrid]**
**Capstone Exercise: Prompt A/B Testing (BUILD)**

This is your final exercise for the module. It combines everything you've learned.

**The task:** You are building an automation that takes a raw job description (pasted text, often messy) and extracts structured data for a recruiting database.

**Required output fields:**
- `job_title` (string)
- `company_name` (string)
- `location` (string — "remote" if fully remote)
- `salary_range` (object with `min`, `max`, `currency` — null if not mentioned)
- `required_skills` (array of strings, max 10)
- `experience_level` (one of: "entry", "mid", "senior", "lead", "executive")
- `employment_type` (one of: "full_time", "part_time", "contract", "freelance")

**Your assignment:**

1. **Write Prompt Version A** — your first attempt at a production-ready prompt for this task. Use the 6-component framework and at least one advanced technique.

2. **Write Prompt Version B** — a meaningfully different approach. Change the structure, the technique, or the emphasis. Don't just rephrase — try a fundamentally different strategy. (For example: Version A might use detailed instructions with constraints. Version B might rely heavily on few-shot examples with minimal instruction.)

3. **Test both prompts** against this sample input:

> "HIRING!! Senior Full Stack Dev needed at TechCorp. NYC or remote ok. 150-180k base + equity. Must know React, Node, AWS, PostgreSQL, and GraphQL. 5+ years exp required. We also want someone who's done some team leading. Full time W2 position, great benefits. Apply by March 15!!!"

4. **Write a comparison analysis** (200-300 words) covering:
   - Which version produced better output and why?
   - Where did each version struggle?
   - What would you change for a Version C?
   - Which version would you trust in a production automation and why?

### CHECKPOINT

You should be able to:

1. Explain the three biggest differences between chat prompts and automation prompts
2. Describe how to make AI output parseable by downstream automation steps
3. Write a prompt that handles missing, malformed, or unexpected input gracefully
4. Articulate why prompt testing with diverse inputs is non-negotiable for production use

**Key Takeaway:** Battle-tested prompts aren't just well-written — they're well-tested. A prompt that works for your one example but fails on real-world data is like a spell that works in the classroom but fizzles in a duel. Test with messy data. Test with edge cases. Test with the worst input you can imagine. Then test with worse.

---

**[PLAY AUDIO: play-cached module_complete]**
## Module 8 Summary

You've completed your training in the art and science of prompt engineering. Let's review:

| Lesson | Core Concept | Key Skill |
|--------|-------------|-----------|
| 1: Why Prompts Matter | Specificity determines output quality | Recognizing the gap between what you think and what you type |
| 2: 6-Component Anatomy | Role, Context, Task, Format, Constraints, Examples | Building complete, professional prompts from a framework |
| 3: The Unforgivable Three | Imperius (over-control), Crucio (ambiguity), Avada Kedavra (contradiction) | Diagnosing and fixing broken prompts |
| 4: N.E.W.T. Techniques | Chain-of-thought, few-shot, chaining, temperature | Applying advanced techniques to complex tasks |
| 5: Battle Magic | Structured output, error handling, testing, consistency | Writing prompts that survive production automation |

**The Prompt Engineer's Oath:**

*I solemnly swear that I will never blame the AI for bad output without first examining my prompt. I will be specific, structured, and intentional. I will test before I deploy. I will handle edge cases. And I will never, under any circumstances, type "do the thing" and expect brilliance.*

**What's next:** Take these skills into Modules 4-7 where you'll build actual automations. Every workflow that uses AI will need prompts — and now you know how to write ones that actually work.

---

*Module 8: The Unforgivable Prompts is a bonus module of the Hogwarts School of AI and Automation. It may be completed anytime after Module 3: The Sorting Algorithm.*
