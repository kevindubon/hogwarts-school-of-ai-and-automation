# Hogwarts School of AI and Automation

A Harry Potter-themed CLI training program that teaches automation, AI tools, MCPs, and prompt engineering through an immersive Hogwarts experience.

## Quick Start

Run `/hogwarts-school` to begin. The skill entry point is `.claude/skills/hogwarts-school/SKILL.md`.

## Architecture

- **Runtime**: Node.js built-ins only — no npm dependencies
- **Scripts**: `scripts/` — voice narration (`hogwarts-voice.js`), utilities
- **Course content**: `references/` — module lessons, quizzes, lore
- **Skill definition**: `.claude/skills/hogwarts-school/` — tracked in git

## Data Separation

- **Student data**: `.hogwarts-data/` — progress, house, wand, grades. Gitignored and local only.
- **Course content**: `.claude/skills/hogwarts-school/` — tracked in git. `git pull` updates course content without touching student progress.

## Session Setup

`scripts/hogwarts-setup.js` runs at the start of every session and handles:
- **Audio**: Downloads pre-generated narrations from GitHub Releases if missing
- **Skill Creator**: Fetches Anthropic's official [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) to `.claude/skills/skill-creator/` — used in Module 6 for building skills

## Voice

Pre-generated audio (24 narrations) auto-downloads from GitHub Releases on first play — no API keys needed. BYOK (bring your own key) is optional for dynamic/personalized narrations and cache regeneration with custom voices.

- **Auto-fetch**: `scripts/hogwarts-audio-fetch.js` downloads audio on cache miss
- **BYOK setup**: Copy `.env.example` to `.env` and add API keys for live TTS
- **Config**: See `voice-config.json` for provider settings
