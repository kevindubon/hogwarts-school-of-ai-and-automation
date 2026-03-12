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
- Print what you detect so I can confirm.

STEP 2: CHECK AND INSTALL GIT
- Run: git --version
- If Git is installed, print the version and move on.
- If NOT installed:
  - macOS: Run "xcode-select --install"
  - Windows: Install Git for Windows from https://git-scm.com/downloads/win
    (use winget if available: winget install Git.Git)
  - Linux: Run "sudo apt install git" (or equivalent for the distro)
- Verify after install: git --version

STEP 3: CHECK AND INSTALL NODE.JS (18+)
- Run: node --version
- If Node.js 18+ is installed, print the version and move on.
- If NOT installed or version is below 18:
  - macOS: Run "brew install node" (or download from https://nodejs.org/)
  - Windows: Run "winget install OpenJS.NodeJS.LTS" (or download from https://nodejs.org/)
  - Linux: Run "curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -"
    then "sudo apt install -y nodejs"
- Verify after install: node --version

STEP 4: CHECK AND INSTALL CLAUDE CODE
- Run: claude --version
- If Claude Code is installed, print the version and move on.
- If NOT installed:
  - macOS/Linux: Run "curl -fsSL https://claude.ai/install.sh | bash"
  - Windows PowerShell: Run "irm https://claude.ai/install.ps1 | iex"
  - Alternative — macOS: "brew install --cask claude-code"
  - Alternative — Windows: "winget install Anthropic.ClaudeCode"
- Verify after install: claude --version
- NOTE: Claude Code requires a paid Claude account (Pro, Max, Teams, or Enterprise).
  The free plan does not include Claude Code access. Tell me if I need to sign up.

STEP 5: CLONE THE REPOSITORY
- Check if the repo already exists locally. If it does, run "git pull" to update.
- If it doesn't exist, run:
  git clone https://github.com/kevindubon/hogwarts-school-of-ai-and-automation.git
- Then cd into the directory.

STEP 6: VERIFY EVERYTHING
- Print a summary table showing:
  - Git: installed? version?
  - Node.js: installed? version 18+?
  - Claude Code: installed? version?
  - Repo: cloned? path?
- If anything is missing, tell me what to fix.
- If everything is ready, tell me to open a terminal in the repo directory,
  run "claude", and then type "/hogwarts-school" to begin.

IMPORTANT:
- Do NOT skip the verification steps. Check before installing.
- If something fails, explain what went wrong and suggest a fix.
- Do NOT install anything without checking first.
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
