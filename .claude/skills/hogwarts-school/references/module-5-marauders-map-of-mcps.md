# Module 5: The Marauder's Map of MCPs -- MCP Universe
<!-- Author: Kevin Dubon -->

## Module Overview

**Theme:** The Marauder's Map -- it doesn't just show Hogwarts, it shows *real-time* activity: who's where, what they're doing, secret passages nobody else can see. MCPs (Model Context Protocol) do the same thing for Claude. They reveal hidden capabilities and let Claude interact with external systems in real time.

**Prerequisite:** Module 4 quiz passed (Preparing Your Wand)

**Lessons:**
1. What Are MCPs? (Discovering the Map)
2. The MCP Ecosystem (The Map's Secrets)
3. Configuring MCPs (Activating the Map)
4. Using MCP Tools (Exploring the Passages)
5. Building with MCPs (Creating New Passages)

**Exercises:** 5 (1 OBSERVE, 2 DO, 1 BUILD, 1 ANALYZE -- see individual lessons)

---

## Lesson 1: What Are MCPs? (Discovering the Map)

**Exercise ID:** `m5_l1_observe_mcp_before_after`

### HOOK

Picture this. You're Harry Potter. It's your third year. You've been sneaking around Hogwarts with nothing but an Invisibility Cloak and sheer audacity. Then Fred and George hand you a blank piece of parchment and say, "I solemnly swear I am up to no good."

Suddenly you don't just have a map -- you have *omniscience*. Real-time information. Secret passages. Names moving through corridors. Everything that was hidden is now visible.

That moment? That's what MCP does for Claude.

### TEACH

**MCP stands for Model Context Protocol.** It's a standard that lets AI assistants like Claude use external tools -- connecting to real systems, reading real data, and performing real actions.

Let's break this down with our Marauder's Map metaphor:

**Without MCP -- Claude is a portrait on the wall.**
You know the talking portraits at Hogwarts? They can chat. They can share opinions. They can even recall memories from when they were painted. But they can't *leave the frame*. They can't go check what's happening in the Great Hall. They can't open a door for you. They're stuck.

That's Claude without MCPs. Brilliant conversationalist, vast knowledge, can analyze anything you paste into the chat -- but fundamentally *trapped inside the frame*. It can only work with what you bring to it.

**With MCP -- Claude has the Marauder's Map.**
The Marauder's Map doesn't just show you a static picture of Hogwarts. It shows:
- **Real-time information** -- Where people are *right now*
- **Hidden passages** -- Capabilities you didn't know existed
- **Interactive elements** -- Tap a passage and it opens

MCPs work the same way. Each MCP server is like an **enchanted object** that grants Claude a new set of powers:

| Without MCP | With MCP |
|-------------|----------|
| "Tell me about Notion databases" | *Actually reads* your Notion database |
| "Here's some data, analyze it" | *Pulls data* from your Google Sheet directly |
| "Write me a Slack message" | *Sends* the Slack message for you |
| "What's in this file?" | *Opens and reads* the file itself |

**The key insight:** MCP doesn't make Claude smarter -- it makes Claude *capable*. It's the difference between knowing about the secret passage behind the one-eyed witch statue and actually being able to *walk through it*.

**Technical summary:**
- **MCP** = Model Context Protocol -- an open standard for AI-to-tool communication
- **MCP Server** = A running process that exposes tools (like an enchanted object)
- **MCP Client** = The AI assistant that calls those tools (Claude, in our case)
- **MCP Tool** = A specific action the server can perform (a single "spell")

### SHOW

Here's the simplest way to see the difference. Imagine you want to know what tasks are on your team's Notion board.

**Without MCP (the portrait approach):**
```
You: "Here are my Notion tasks: [copies and pastes 200 lines of text]"
Claude: "Based on what you pasted, here's my analysis..."
```

**With MCP (the Marauder's Map approach):**
```
You: "What tasks are on my team's Notion board?"
Claude: [calls mcp__notion__API-post-database-query with your database ID]
Claude: "I just checked your board. You have 12 open tasks. Here's the breakdown..."
```

The MCP version is:
- **Faster** -- no manual copy-paste
- **Accurate** -- reads real-time data, not a stale snapshot
- **Actionable** -- Claude can also *create*, *update*, and *delete* items

Here's what an MCP tool call actually looks like under the hood:

```
Tool: mcp__notion__API-post-database-query
Parameters: {
  "database_id": "abc123-def456",
  "filter": {
    "property": "Status",
    "status": { "equals": "In Progress" }
  }
}

Result: [array of Notion pages matching the filter]
```

That's it. Claude sends a structured request, the MCP server executes it against the real Notion API, and returns the result. Just like tapping a secret passage on the Map and watching it open.

### TRY

**[PLAY AUDIO: play-cached cameo_hagrid]**
**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: MCP Before & After (OBSERVE -- 15 points)**

Look at these two scenarios. For each one, explain:
1. What Claude **can't** do without MCP
2. What Claude **can** do with MCP
3. Which "enchanted object" (MCP server) would provide the capability

**Scenario A:**
> "Check my GitHub repository for any open pull requests and summarize what each one changes."

**Scenario B:**
> "Create a new page in my project tracker in Notion with today's date and a summary of what we discussed."

**Scenario C:**
> "Read the CSV file on my desktop and tell me which customers haven't been contacted in 30 days."

Take a moment to think through each scenario, then share your answers.

### CHECKPOINT

**[PLAY AUDIO: play-cached cameo_mcgonagall]**
Quick check before we move on:

**What is the best analogy for what MCP does for Claude?**
- (a) It makes Claude faster at generating text
- (b) It lets Claude connect to and interact with external systems in real time
- (c) It gives Claude access to the internet for web searches
- (d) It upgrades Claude's language model to a newer version

---

## Lesson 2: The MCP Ecosystem (The Map's Secrets)

**Exercise ID:** `m5_l2_observe_tool_identification`

### HOOK

You know what makes the Marauder's Map truly extraordinary? It's not just one passage. It's not just one corridor. It's the *entire castle* -- every room, every hidden alcove, every secret tunnel that leads to Honeydukes.

The MCP ecosystem is the same. There isn't just one MCP server. There's a whole *universe* of them -- each one a different secret passage leading to a different destination.

### TEACH

**Types of MCP Servers -- The Secret Passages of the Map**

Think of each category as a wing of Hogwarts, and each MCP server as a secret passage within that wing:

**The Library Wing -- Knowledge & Documentation**
- **Notion MCP** -- Read, create, and update pages, databases, and blocks
- **Google Docs MCP** -- Access and edit documents
- **Confluence MCP** -- Enterprise documentation systems

**The Owlery -- Communication**
- **Slack MCP** -- Send messages, read channels, manage threads
- **Gmail MCP** -- Read and send emails
- **Discord MCP** -- Bot interactions and channel management

**The Dungeon Vaults -- Data & Databases**
- **Supabase MCP** -- SQL queries, table management, edge functions
- **PostgreSQL MCP** -- Direct database access
- **Airtable MCP** -- Structured data operations

**The Workshop -- Development Tools**
- **GitHub MCP** -- Repositories, issues, pull requests, code
- **File System MCP** -- Read, write, and manage local files
- **n8n MCP** -- Workflow automation management

**The Room of Requirement -- Specialized Tools**
- **Playwright MCP** -- Browser automation and web scraping
- **Sequential Thinking MCP** -- Complex reasoning and planning
- **Web Search/Fetch MCPs** -- Internet access and data retrieval

**How the Communication Works**

The flow is always the same, regardless of which MCP you're using:

```
[1] Claude decides it needs to perform an action
         |
         v
[2] Claude calls the MCP tool with parameters
         |
         v
[3] MCP Server receives the request
         |
         v
[4] MCP Server executes against the real platform (Notion API, Slack API, etc.)
         |
         v
[5] MCP Server returns the result to Claude
         |
         v
[6] Claude interprets the result and responds to you
```

It's like owl post. You (Claude) write a letter with specific instructions, the owl (MCP) delivers it to the right person (the external system), waits for a reply, and brings it back.

**MCP Tools = Spells the Server Knows**

Each MCP server doesn't just do *one* thing. It exposes multiple **tools** -- specific actions it can perform. Think of the server as a spellbook and each tool as an individual spell:

| MCP Server | Example Tools (Spells) |
|------------|----------------------|
| Notion MCP | Create page, Query database, Update block, Delete block |
| Slack MCP | Send message, Read channel, List users, Upload file |
| GitHub MCP | Create issue, List PRs, Read file, Create branch |
| Supabase MCP | Execute SQL, Apply migration, Deploy edge function |
| n8n MCP | List workflows, Create workflow, Trigger webhook |

**Official vs Community MCPs**

Just like there are Ministry-approved spells and ones you learn in Knockturn Alley:

- **Official MCPs** -- Built and maintained by Anthropic or the platform vendor. Battle-tested, well-documented, reliable. Think: spells from the Standard Book of Spells.
- **Community MCPs** -- Built by developers in the open-source community. Can be brilliant or buggy. Think: spells scribbled in the margins of the Half-Blood Prince's textbook. Powerful, but use at your own risk.

### SHOW

Here's a real example of what the Notion MCP server exposes. These are actual tools available when the Notion MCP is configured:

```
Notion MCP Server -- Available Tools:
--------------------------------------
mcp__notion__API-post-search          -- Search across all pages and databases
mcp__notion__API-post-database-query  -- Query a specific database with filters
mcp__notion__API-retrieve-a-page      -- Get a single page by ID
mcp__notion__API-post-page            -- Create a new page
mcp__notion__API-patch-page           -- Update an existing page
mcp__notion__API-delete-a-block       -- Delete a block (paragraph, heading, etc.)
mcp__notion__API-get-block-children   -- Get all child blocks of a page/block
mcp__notion__API-patch-block-children -- Append new blocks to a page
mcp__notion__API-retrieve-a-database  -- Get database schema/properties
mcp__notion__API-create-a-database    -- Create a new database
mcp__notion__API-retrieve-a-comment   -- Read comments on a page
mcp__notion__API-create-a-comment     -- Add a comment to a page
mcp__notion__API-get-self             -- Check current authentication
mcp__notion__API-get-user             -- Get user information
mcp__notion__API-get-users            -- List all workspace users
mcp__notion__API-retrieve-a-page-property -- Get a specific property value
mcp__notion__API-update-a-block       -- Modify an existing block
```

That's **17 tools** from just one MCP server. Each one is a different spell in the Notion spellbook. And Claude can use any of them.

### TRY

**Exercise: Identify the Tools (OBSERVE -- 15 points)**

Here's a list of MCP tools from a hypothetical Slack MCP server. For each tool, explain in plain English what it does and when you'd use it:

```
1. mcp__slack__send_message
2. mcp__slack__read_channel
3. mcp__slack__list_channels
4. mcp__slack__upload_file
5. mcp__slack__search_messages
6. mcp__slack__add_reaction
7. mcp__slack__create_channel
8. mcp__slack__get_user_info
```

**Bonus question:** Which of these tools would be needed to build an automation that monitors a channel for keywords and forwards matching messages to another channel?

### CHECKPOINT

Quick check:

**When Claude calls an MCP tool, where does the actual work happen?**
- (a) Inside Claude's language model
- (b) On the MCP server, which connects to the external platform
- (c) On your local computer only
- (d) In the cloud, with no external connections

---

**[PLAY AUDIO: play-cached peeves_interrupt]**
## Lesson 3: Configuring MCPs (Activating the Map)

**Exercise ID:** `m5_l3_do_read_config`

### HOOK

"I solemnly swear I am up to no good."

Without that phrase, the Marauder's Map is just a blank piece of parchment. Useless. You could stare at it all day and see nothing.

MCP servers work the same way. They exist on your system, but until you *configure and authenticate* them, they're blank parchment. Configuration is your incantation. Your API key is your proof that you solemnly swear you're authorized to use this map.

### TEACH

**Where MCP Configuration Lives**

MCP configs live in specific files depending on how you're using Claude:

| Environment | Config File | Scope |
|-------------|------------|-------|
| Claude Desktop App | `claude_desktop_config.json` | Global (all conversations) |
| Claude Code (project) | `.mcp.json` in project root | Project-specific |
| Claude Code (user) | `~/.claude.json` | User-wide |

**Anatomy of an MCP Configuration**

Let's dissect a real config file like we're studying a spell formula in Professor Flitwick's class:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_abc123\", \"Notion-Version\": \"2022-06-28\"}"
      }
    }
  }
}
```

Breaking down each part:

```
"mcpServers": {              <-- The Map itself (container for all servers)
  "notion": {                <-- Server name (you choose this -- it becomes the prefix)
    "command": "npx",        <-- HOW to launch the server (the incantation)
    "args": [                <-- Arguments passed to the command
      "-y",                  <-- Auto-confirm npm install
      "@notionhq/notion-mcp-server"  <-- The actual MCP package
    ],
    "env": {                 <-- Environment variables (secrets!)
      "OPENAPI_MCP_HEADERS": "..."   <-- Authentication credentials
    }
  }
}
```

Think of it this way:

| Config Part | Marauder's Map Equivalent |
|-------------|--------------------------|
| `mcpServers` | The parchment itself |
| Server name (`"notion"`) | A labeled secret passage |
| `command` | The incantation to open the passage |
| `args` | The specific wand movements |
| `env` | "I solemnly swear..." -- your authentication |

**Authentication -- The Passwords**

Different MCPs authenticate differently, just like different parts of Hogwarts have different passwords:

**API Keys** (most common -- like the Fat Lady's password):
```json
{
  "env": {
    "API_KEY": "sk-abc123..."
  }
}
```

**OAuth Tokens** (more complex -- like the Prefect's bathroom password that changes):
```json
{
  "env": {
    "ACCESS_TOKEN": "xoxb-abc123...",
    "REFRESH_TOKEN": "xoxr-def456..."
  }
}
```

**No Auth** (open servers -- like the Room of Requirement):
```json
{
  "command": "npx",
  "args": ["-y", "some-open-mcp-server"]
}
```

**Multiple MCP Servers -- Revealing the Whole Map**

A real-world config usually has *multiple* servers, each unlocking a different part of the map:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": { "OPENAPI_MCP_HEADERS": "..." }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/slack-mcp-server"],
      "env": { "SLACK_BOT_TOKEN": "xoxb-..." }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/github-mcp-server"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/filesystem-mcp-server", "/Users/me/projects"]
    }
  }
}
```

Each entry is another secret passage revealed on your map. The more MCPs you configure, the more of the castle Claude can access.

### SHOW

Here's a complete, annotated example of a `.mcp.json` file for a project that uses Notion and Supabase:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": [
        "-y",                              // Auto-install if not present
        "@notionhq/notion-mcp-server"      // Official Notion MCP package
      ],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_YOUR_TOKEN_HERE\", \"Notion-Version\": \"2022-06-28\"}"
      }
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "supabase-mcp-server"             // Community Supabase MCP
      ],
      "env": {
        "SUPABASE_URL": "https://yourproject.supabase.co",
        "SUPABASE_SERVICE_KEY": "eyJhbGciOiJIUzI1NiIs..."
      }
    }
  }
}
```

**What happens when Claude Code starts with this config:**
1. It reads `.mcp.json` from the project root
2. For each server entry, it launches the command with the given args
3. The MCP server starts and registers its available tools
4. Claude now has access to all tools from all configured servers
5. When you ask Claude to do something, it can call these tools as needed

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: Read & Explain a Config (DO -- 25 points)**

Here's an MCP configuration. Read it carefully and answer the questions below:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic/memory-mcp-server"],
      "env": {
        "MEMORY_FILE_PATH": "/Users/wizard/notes/memory.json"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic/brave-search-mcp-server"],
      "env": {
        "BRAVE_API_KEY": "BSA_xxxxxxxxxxxx"
      }
    }
  }
}
```

**Questions:**
1. How many MCP servers are configured? What are their names?
2. Which server(s) use API key authentication?
3. The `memory` server has an env variable pointing to a file path. What do you think this server does?
4. If you wanted to add a Notion MCP to this config, where exactly would you add it? (Describe the location in the JSON structure.)
5. What would the tool names look like for each server? (Use the `mcp__server__tool_name` convention to guess a few.)

### CHECKPOINT

Quick check:

**What does the `env` section of an MCP configuration typically contain?**
- (a) The list of tools the server provides
- (b) The programming language the server is written in
- (c) Authentication credentials and configuration secrets
- (d) The version number of the MCP protocol

---

## Lesson 4: Using MCP Tools (Exploring the Passages)

**Exercise ID:** `m5_l4_do_mcp_interaction`

### HOOK

Knowing the secret passages exist on the Marauder's Map is one thing. Actually *using* them is another. You need to know where to tap, how to step, and what to expect on the other side.

Fred and George didn't just hand Harry the Map and say, "Good luck, figure it out." They showed him how to use it. That's what we're doing now.

### TEACH

**Discovering Available Tools**

When you have MCPs configured, the first question is: *what can I actually do?* Here's how to find out.

In Claude Code, you can simply ask: "What MCP tools do you have access to?" Claude will list everything available. But understanding the system underneath makes you a better wizard.

**Tool Naming Convention**

Every MCP tool follows a precise naming pattern:

```
mcp__[server-name]__[tool-name]
 |        |              |
 |        |              +-- The specific action (spell)
 |        +-- From your config's server name
 +-- Prefix indicating it's an MCP tool
```

Examples:
```
mcp__notion__API-post-search           -- Search in Notion
mcp__slack__send_message               -- Send a Slack message
mcp__github__create_issue              -- Create a GitHub issue
mcp__supabase__execute_sql             -- Run SQL on Supabase
mcp__n8n-mcp__n8n_list_workflows       -- List n8n workflows
```

The naming convention is your *Lumos* spell. It illuminates exactly what a tool does just from reading its name.

**Parameters and Required Fields**

Every tool needs parameters -- the specific instructions for what to do. Think of it like casting a spell: you can't just yell "Accio!" You have to say "Accio Firebolt!" -- the spell needs a *target*.

```
Tool: mcp__notion__API-post-database-query

Required Parameters:
  - database_id: "abc123-def456"    <-- WHICH database to query

Optional Parameters:
  - filter: { ... }                 <-- Narrow the results
  - sorts: [ ... ]                  <-- Order the results
  - page_size: 100                  <-- How many results
```

**Required** parameters are non-negotiable -- miss one and the spell fizzles. **Optional** parameters fine-tune the result.

**Error Handling -- When Spells Misfire**

MCP calls can fail. Just like spells can backfire (ask Lockhart about his memory charm), MCP tools can return errors:

| Error Type | HP Equivalent | What Happened |
|-----------|---------------|---------------|
| Authentication failure | Wrong password at the Fat Lady | Your API key is invalid or expired |
| Missing parameters | Saying "Accio" without a target | You forgot a required field |
| Not found (404) | Secret passage is bricked up | The resource doesn't exist |
| Rate limited (429) | Owl Post office overwhelmed | Too many requests too fast |
| Server error (500) | The enchantment is broken | The external platform is having issues |

**When errors happen:**
1. **Read the error message** -- it usually tells you exactly what went wrong
2. **Check your parameters** -- is the ID correct? Are required fields present?
3. **Verify authentication** -- has the token expired?
4. **Try again** -- some errors are transient (the owl just needed a rest)

### SHOW

Let's walk through a complete MCP interaction, step by step. We'll query a Notion database for open tasks:

**Step 1 -- The Request:**
```
User: "Show me all open tasks in my project tracker."
```

**Step 2 -- Claude Determines the Tool:**
Claude recognizes this requires the Notion MCP and selects the right tool:
```
Tool: mcp__notion__API-post-database-query
```

**Step 3 -- Claude Builds the Parameters:**
```json
{
  "database_id": "abc123-def456-789",
  "filter": {
    "property": "Status",
    "status": {
      "does_not_equal": "Done"
    }
  },
  "sorts": [
    {
      "property": "Priority",
      "direction": "ascending"
    }
  ]
}
```

**Step 4 -- MCP Server Executes:**
The Notion MCP server takes these parameters, calls the Notion API, and returns the results.

**Step 5 -- Claude Receives the Result:**
```json
{
  "results": [
    {
      "id": "page-1",
      "properties": {
        "Name": {"title": [{"plain_text": "Design webhook router"}]},
        "Status": {"status": {"name": "In Progress"}},
        "Priority": {"select": {"name": "High"}}
      }
    },
    {
      "id": "page-2",
      "properties": {
        "Name": {"title": [{"plain_text": "Write API documentation"}]},
        "Status": {"status": {"name": "Not Started"}},
        "Priority": {"select": {"name": "Medium"}}
      }
    }
  ]
}
```

**Step 6 -- Claude Presents the Answer:**
```
You have 2 open tasks:

1. **Design webhook router** -- In Progress (High priority)
2. **Write API documentation** -- Not Started (Medium priority)
```

The whole round-trip happened in seconds. No copy-pasting. No switching tabs. Just ask and receive.

### TRY

**Exercise: MCP Interaction Analysis (DO -- 25 points)**

**Option A -- If you have an MCP configured (Notion, GitHub, Supabase, etc.):**
Ask Claude to perform a simple **read** operation using one of your configured MCPs. For example:
- "Search my Notion workspace for pages containing 'project'"
- "List my GitHub repositories"
- "Show me the tables in my Supabase database"

Observe the interaction and answer:
1. What tool did Claude use? (full `mcp__server__tool_name`)
2. What parameters were sent?
3. What did the result look like?
4. Did anything surprise you about the response?

**Option B -- If you don't have MCPs configured:**
Analyze this MCP interaction and answer the questions:

```
User: "Find all n8n workflows that are currently active."

Claude calls: mcp__n8n-mcp__n8n_list_workflows

Parameters: {
  "active": true
}

Result: {
  "data": [
    {"id": "wf1", "name": "Daily Slack Report", "active": true, "updatedAt": "2026-03-01"},
    {"id": "wf2", "name": "New Hire Onboarding", "active": true, "updatedAt": "2026-02-28"},
    {"id": "wf3", "name": "Client NPS Survey", "active": true, "updatedAt": "2026-02-15"}
  ]
}
```

1. What does the `mcp__n8n-mcp__n8n_list_workflows` tool name tell you about the server and action?
2. The parameter `"active": true` is a filter. What would you change to see *all* workflows (active and inactive)?
3. The result contains 3 workflows. If you wanted to get details about "New Hire Onboarding", what tool name would you guess? What parameter would you need?
4. What would happen if the n8n server was unreachable?

### CHECKPOINT

Quick check:

**You call an MCP tool and get an "authentication failure" error. What's the most likely cause?**
- (a) The MCP server isn't installed
- (b) Your API key or token in the `env` config is invalid or expired
- (c) Claude doesn't support that MCP server
- (d) You need to restart your computer

---

## Lesson 5: Building with MCPs (Creating New Passages)

**Exercise ID:** `m5_l5_build_multi_mcp_design`

### HOOK

By fifth year, Fred and George weren't just *using* the Marauder's Map -- they were building on the knowledge it gave them. They used the secret passages to build Weasleys' Wizard Wheezes supply chains, smuggle products into Hogwarts, and eventually open the greatest joke shop in the wizarding world.

You're at that stage now. You don't just know what MCPs are, how they work, and how to use them. Now it's time to *build something* by combining multiple MCPs into a workflow.

### TEACH

**Combining Multiple MCPs -- The Power of Connected Passages**

A single MCP is useful. Multiple MCPs working together is *transformative*. This is where the Marauder's Map metaphor really shines -- it's not just one passage, it's the *network* of passages that makes it powerful.

**Pattern: Read-Transform-Write**

The most common multi-MCP pattern:

```
[Source MCP] --> [Claude transforms/analyzes] --> [Destination MCP]
     |                    |                            |
  Read data       Process, filter,              Write result
  from system A   summarize, decide             to system B
```

**Real-world example:**

```
[Notion MCP]          [Claude]              [Slack MCP]
Query database   -->  Find overdue    -->   Send alert to
for all tasks         tasks, format         #project-updates
                      summary               channel
```

**Pattern: Multi-Source Aggregation**

Pull from multiple sources, combine, then output:

```
[Notion MCP] ----\
                  \
[GitHub MCP] -----+--> [Claude combines] --> [Google Sheets MCP]
                  /                           Write weekly report
[n8n MCP] ------/
```

**Pattern: Conditional Routing**

Read data, make a decision, take different actions:

```
                              /--> [Slack MCP] Send congratulations
[Supabase MCP]   [Claude]   /
Read new hire --> Check    --+
data              status     \
                              \--> [Notion MCP] Create onboarding page
```

**When to Use MCPs vs Direct API Calls**

This is a critical decision point -- knowing when to use the Marauder's Map vs just walking the corridors yourself:

| Use MCPs When | Use Direct API Calls When |
|--------------|--------------------------|
| Working interactively with Claude | Building standalone automation (n8n, Zapier) |
| Ad-hoc tasks and queries | Scheduled/recurring processes |
| Exploring data, debugging | High-volume data processing |
| Rapid prototyping | Production pipelines |
| You need Claude's judgment/analysis | Simple, deterministic operations |

MCPs are brilliant for **interactive, intelligent** tasks. Direct APIs (via n8n, scripts, etc.) are better for **scheduled, high-volume** tasks. Often you'll use MCPs to *design and test* a workflow, then build the production version in n8n.

**MCP Limitations and Workarounds**

Every magical artifact has its limits. Even the Elder Wand can be beaten. Here are the real-world constraints:

| Limitation | Explanation | Workaround |
|-----------|-------------|------------|
| **Session-only** | MCP connections last one conversation | Save important results to files |
| **Rate limits** | External APIs have request limits | Batch operations, add delays |
| **Auth expiration** | Tokens expire over time | Refresh tokens, re-authenticate |
| **Data size** | Large responses may be truncated | Use filters and pagination |
| **No background tasks** | MCPs can't run while you're away | Use n8n/cron for scheduled tasks |
| **Platform bugs** | Some MCP operations have known issues | Learn workarounds (e.g., Notion's delete+create pattern) |

**The Future of MCPs**

MCPs are the Marauder's Map, but we're still in the early chapters:
- **More official servers** -- Anthropic and partners are constantly releasing new MCPs
- **Better authentication** -- OAuth flows are getting smoother
- **Composable tools** -- MCPs that work together out of the box
- **Custom MCP servers** -- Build your own for proprietary systems
- **Multi-agent workflows** -- Multiple AI agents sharing MCP access

The wizarding world is expanding. The map is getting bigger.

### SHOW

Here's a complete multi-MCP workflow designed in pseudocode. This automation generates a weekly project status report:

```
WORKFLOW: Weekly Project Status Report
=======================================

Step 1: GATHER DATA (3 MCPs)
-----------------------------
// Get open tasks from Notion
notion_tasks = mcp__notion__API-post-database-query({
  database_id: "project-tracker-id",
  filter: { property: "Status", status: { does_not_equal: "Done" } }
})

// Get recent workflow executions from n8n
n8n_status = mcp__n8n-mcp__n8n_list_executions({
  workflowId: "critical-workflow-id",
  limit: 10
})

// Get open issues from GitHub
github_issues = mcp__github__list_issues({
  repo: "company/main-project",
  state: "open"
})

Step 2: ANALYZE (Claude's brain)
---------------------------------
// Claude processes all three data sources:
// - Counts tasks by status and priority
// - Checks for failed n8n executions
// - Identifies stale GitHub issues (>7 days old)
// - Generates a summary with highlights and risks

Step 3: DELIVER (1 MCP)
-------------------------
// Post the summary to Slack
mcp__slack__send_message({
  channel: "#weekly-status",
  text: formatted_report
})
```

Three MCPs feeding data into Claude's analysis, one MCP delivering the result. Four secret passages working together to create something none of them could do alone.

### TRY

**[PLAY AUDIO: play-cached exercise_intro]**
**Exercise: Design a Multi-MCP Automation (BUILD -- 35 points)**

Design an automation that uses **at least 2 MCPs working together**. You don't need to run it -- just plan it out on paper or in pseudocode.

**Choose one of these scenarios** (or create your own):

**Scenario 1: "The Daily Prophet" -- Automated Team Update**
> Every morning, gather information from multiple sources and post a summary to Slack.

**Scenario 2: "The Hogwarts Express" -- New Client Onboarding**
> When a new client page is created in Notion, automatically set up their project infrastructure.

**Scenario 3: "The Pensieve" -- Meeting Notes Processor**
> After a meeting, take notes from one system, extract action items, and create tasks in another.

**Your design should include:**
1. **Which MCPs** you'd use and why
2. **The flow** -- what happens in what order (Step 1, Step 2, Step 3...)
3. **What Claude does** in between MCP calls (the analysis/transformation)
4. **What parameters** each MCP tool call would need (you can approximate)
5. **What could go wrong** and how you'd handle it (at least 2 failure scenarios)

Write it out as pseudocode similar to the SHOW example above.

### CHECKPOINT

Quick check:

**You need to check a Notion database every hour and send a Slack message if there are overdue tasks. Which approach is best?**
- (a) Use MCPs -- have Claude check every hour
- (b) Build it in n8n with a scheduled trigger, use Notion and Slack nodes
- (c) Write a Python script and run it manually
- (d) Set a reminder on your phone to check Notion yourself

---

**[PLAY AUDIO: play-cached module_complete]**
## Module Summary

**What you've learned in Module 5:**

1. **MCPs are Claude's Marauder's Map** -- they transform Claude from a talking portrait into an agent that can interact with real systems in real time.

2. **The MCP ecosystem is vast** -- Notion, Slack, GitHub, databases, file systems, and more. Each server is a secret passage to a different part of your digital castle.

3. **Configuration is your incantation** -- MCP configs live in JSON files, contain server definitions with commands, arguments, and authentication credentials.

4. **Using tools follows a pattern** -- Claude calls the tool with parameters, the MCP server executes against the real platform, and returns results. Errors happen and are handleable.

5. **The real power is in combination** -- Multiple MCPs working together create workflows that no single tool could accomplish alone. Read from one system, analyze with Claude, write to another.

**The Marauder's Map didn't just show Harry where things were. It changed how he moved through Hogwarts. MCPs do the same for how Claude moves through your digital world.**

---

## Exercise Quick Reference

| Lesson | Exercise ID | Type | Points | Description |
|--------|------------|------|--------|-------------|
| 1 | `m5_l1_observe_mcp_before_after` | OBSERVE | 15 | Analyze before/after MCP scenarios |
| 2 | `m5_l2_observe_tool_identification` | OBSERVE | 15 | Identify MCP tools and their functions |
| 3 | `m5_l3_do_read_config` | DO | 25 | Read and explain an MCP configuration |
| 4 | `m5_l4_do_mcp_interaction` | DO | 25 | Perform or analyze a real MCP interaction |
| 5 | `m5_l5_build_multi_mcp_design` | BUILD | 35 | Design a multi-MCP automation workflow |
