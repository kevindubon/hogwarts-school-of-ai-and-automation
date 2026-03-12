# Setup Guide — Hogwarts School of AI and Automation

This guide gets you from zero to running `/hogwarts-school` in Claude Code. If you already have Git, Node.js, and Claude Code installed, skip to [Quick Start](#quick-start).

---

## Automated Setup (Recommended)

If you're using an AI-powered IDE like **Antigravity**, **Cursor**, or any editor with an AI agent, copy the prompt below and paste it into the agent. It will handle everything for you.

### Copy-Paste Setup Prompt

```
I need you to set up my environment for the Hogwarts School of AI and Automation.
Follow these steps in order. Check each prerequisite before installing — don't
reinstall things that already work.

STEP 1: DETECT MY SYSTEM
- Determine if I'm on Windows, macOS, or Linux.
- Print what you detect so I can confirm before continuing.

STEP 2: CHECK AND INSTALL GIT
- Run: git --version
- If Git is installed, print the version and move on.
- If NOT installed:
  - macOS: Run "xcode-select --install" (this opens a system dialog — tell me
    to click Install and wait for it to finish, then verify)
  - Windows: Run "winget install Git.Git" if winget is available.
    If winget is not available, tell me to download Git from
    https://git-scm.com/downloads/win and install it manually, then come back.
  - Linux: Tell me to run "sudo apt install git" myself (you can't enter my
    password). Wait for me to confirm it's done.
- After install, verify: git --version
- If the command still isn't found, tell me to close and reopen my terminal
  (or restart the IDE) so the PATH updates, then try again.

STEP 3: CHECK AND INSTALL NODE.JS (18+)
- Run: node --version
- If Node.js 18+ is installed, print the version and move on.
- If NOT installed or version is below 18:
  - macOS: Run "brew install node". If brew is not installed, tell me to
    install Homebrew first (https://brew.sh) or download Node from
    https://nodejs.org/
  - Windows: Run "winget install OpenJS.NodeJS.LTS". If winget is not
    available, tell me to download from https://nodejs.org/
  - Linux: Tell me to run these commands myself (they need sudo):
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs
    Wait for me to confirm it's done.
- After install, verify: node --version
- If the command still isn't found after install, tell me to restart my
  terminal or IDE so the PATH updates.

STEP 4: CHECK AND INSTALL CLAUDE CODE
- Run: claude --version
- If Claude Code is installed, print the version and move on.
- If NOT installed:
  - macOS/Linux: Run "curl -fsSL https://claude.ai/install.sh | bash"
  - Windows: Run "winget install Anthropic.ClaudeCode" or in PowerShell
    run "irm https://claude.ai/install.ps1 | iex"
- After install, verify: claude --version
- If "claude" is not found after install, tell me to restart my terminal or
  IDE so the PATH picks up the new installation, then try again.
- IMPORTANT: Claude Code requires a PAID Claude account (Pro at $20/month,
  Max, Teams, or Enterprise). The free Claude.ai plan does NOT include Claude
  Code. If I don't have a paid account, tell me to sign up at
  https://claude.ai/pricing before continuing.

STEP 5: CLONE THE REPOSITORY
- Check if the directory "hogwarts-school-of-ai-and-automation" already exists
  in the current folder. If it does, cd into it and run "git pull" to update.
- If it doesn't exist, run:
  git clone https://github.com/kevindubon/hogwarts-school-of-ai-and-automation.git
  cd hogwarts-school-of-ai-and-automation

STEP 6: VERIFY EVERYTHING
Print a clear summary showing:
  - OS: (what was detected)
  - Git: (version or MISSING)
  - Node.js: (version or MISSING — must be 18+)
  - Claude Code: (version or MISSING)
  - Repository: (cloned and path, or MISSING)

If anything is MISSING, list exactly what I need to fix.

If everything is ready, tell me:
  1. Open a terminal in the repo directory
  2. Run "claude" to start Claude Code
  3. Complete the login if prompted (browser will open)
  4. Type "/hogwarts-school" to begin the course
  5. The Sorting Hat will take it from there

IMPORTANT RULES:
- Do NOT skip verification steps. Always check before installing.
- If something fails to install, explain what went wrong clearly.
- If a command needs sudo/admin and you can't run it, tell me the exact
  command to run myself and wait for me to confirm.
- After ANY installation, verify the tool is available. If not, tell me to
  restart my terminal/IDE for PATH changes to take effect.
- Do NOT install anything without checking if it's already installed first.
```

---

## Manual Setup (Step by Step)

### 1. Install Git

| Platform | Command |
|----------|---------|
| **macOS** | `xcode-select --install` |
| **Windows** | Download from [git-scm.com](https://git-scm.com/downloads/win) or `winget install Git.Git` |
| **Linux** | `sudo apt install git` |

Verify: `git --version`

### 2. Install Node.js (18+)

Download from [nodejs.org](https://nodejs.org/) (LTS recommended), or:

| Platform | Command |
|----------|---------|
| **macOS** | `brew install node` |
| **Windows** | `winget install OpenJS.NodeJS.LTS` |
| **Linux** | `curl -fsSL https://deb.nodesource.com/setup_22.x \| sudo -E bash - && sudo apt install -y nodejs` |

Verify: `node --version` (should show v18+)

### 3. Install Claude Code

| Platform | Command |
|----------|---------|
| **macOS / Linux** | `curl -fsSL https://claude.ai/install.sh \| bash` |
| **Windows (PowerShell)** | `irm https://claude.ai/install.ps1 \| iex` |
| **macOS (Homebrew)** | `brew install --cask claude-code` |
| **Windows (WinGet)** | `winget install Anthropic.ClaudeCode` |

Verify: `claude --version`

> **Note:** Claude Code requires a **paid** Claude account — [Pro](https://claude.ai/pricing) ($20/mo), Max, Teams, or Enterprise. The free plan does not include Claude Code.

### 4. Install an IDE (Optional but Recommended)

Claude Code works in any terminal, but an IDE with the Claude Code extension gives you a graphical panel, clickable buttons, and inline diffs.

**Recommended options:**

| IDE | Claude Code Extension | Cost |
|-----|----------------------|------|
| **[VS Code](https://code.visualstudio.com/)** | Search "Claude Code" in Extensions | Free |
| **[Cursor](https://cursor.com/)** | Built-in AI + Claude Code via terminal | Free tier available |
| **[Antigravity](https://antigravity.dev/)** | Built-in AI agent | Free tier available |
| **[JetBrains IDEs](https://www.jetbrains.com/)** | Plugin Marketplace → "Claude Code" | Free Community editions |

### 5. Authenticate Claude Code

1. Open terminal (or IDE terminal)
2. Run: `claude`
3. Browser opens → log in with your Claude account
4. Done

### 6. Clone and Run

```bash
git clone https://github.com/kevindubon/hogwarts-school-of-ai-and-automation.git
cd hogwarts-school-of-ai-and-automation
```

In Claude Code:
```
/hogwarts-school
```

The Sorting Hat takes it from here. Audio, skill-creator, and all dependencies are set up automatically on first run.

---

## Optional: Voice API Keys

Pre-generated audio works out of the box (no keys needed). For personalized narrations with your name spoken aloud:

```bash
cp .env.example .env
```

Edit `.env` and add one of:
- `ELEVENLABS_API_KEY_PERSONAL` — premium multi-character voices
- `OPENAI_API_KEY` — cheaper alternative

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `claude: command not found` | Re-run the install command, then restart your terminal |
| `node: command not found` | Install Node.js from [nodejs.org](https://nodejs.org/) |
| Claude Code asks to log in every time | Run `claude` and complete the OAuth flow in browser |
| Audio doesn't play | Run `node .claude/skills/hogwarts-school/scripts/hogwarts-progress.js audio-on` |
| Audio doesn't download | Check internet connection; run `node .claude/skills/hogwarts-school/scripts/hogwarts-audio-fetch.js --force` |
| `/hogwarts-school` not found | Make sure you're in the repo directory and `.claude/skills/hogwarts-school/SKILL.md` exists |

---

## Verification Checklist

```bash
git --version          # Should show any version
node --version         # Should show v18+
claude --version       # Should show a version number
```

If all three work, you're ready. Run `claude` → `/hogwarts-school`.
