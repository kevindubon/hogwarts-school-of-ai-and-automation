# Hogwarts School of AI and Automation

A Harry Potter-themed CLI training program that teaches automation, AI tools, MCPs, and prompt engineering through an immersive Hogwarts experience — powered by [Claude Code](https://claude.ai/code).

You'll be guided by **Professor Dumbledore** (after three butterbeers and a Netflix comedy special) through 8 modules of real-world automation skills, wrapped in enough Harry Potter references to make J.K. Rowling send a cease-and-desist.

## What You'll Learn

| Module | Name | Topic |
|--------|------|-------|
| 0 | The Sorting Ceremony | Personality quiz, house assignment, wand selection |
| 1 | The Automation Spellbook | Automation fundamentals |
| 2 | Potion Ingredients | Data structures & JSON |
| 3 | The Owl Post Network | Working with APIs |
| 4 | Preparing Your Wand | Setting up your workspace |
| 5 | The Marauder's Map of MCPs | MCP universe |
| 6 | Advanced Spellcraft | Claude Skills |
| 7 | The Final Trial | Building your first automation |
| 8 | The Unforgivable Prompts | Prompt engineering (secret bonus) |

Each module has structured lessons (HOOK/TEACH/SHOW/TRY/CHECKPOINT), hands-on exercises, and a quiz to unlock the next module.

## Features

- **Sorting Hat quiz** — get sorted into a Hogwarts house based on your automation instincts
- **House points & ranks** — earn points, climb from First Year to Order of Merlin
- **Character voices** — Dumbledore, Sorting Hat, McGonagall, Hagrid, and Peeves with TTS narration
- **4 humor levels** — mild, medium, savage, or unhinged (you pick during sorting)
- **Live API exercises** — real HTTP calls to the HP API, not just theory
- **Easter eggs** — hidden achievements for the curious ("I solemnly swear I am up to no good")
- **Butterbeer Breaks** — because even wizards need a breather

## Prerequisites

- [Claude Code](https://claude.ai/code) (Claude's official CLI)
- Node.js 18+

## Quick Start

```bash
git clone https://github.com/kevindubon/hogwarts-school-of-ai-and-automation.git
cd hogwarts-school-of-ai-and-automation
```

Then in Claude Code:

```
/hogwarts-school
```

That's it. The Sorting Hat will take it from here.

## Voice Narration

Pre-generated audio (24 character-voiced narrations) **auto-downloads on first play** from GitHub Releases — no API keys needed.

For dynamic/personalized narrations (e.g., your nickname spoken aloud), you can optionally bring your own API key:

1. Copy `.env.example` to `.env`
2. Add your `ELEVENLABS_API_KEY_PERSONAL` or `OPENAI_API_KEY`
3. Enable voice in the skill settings

## Project Structure

```
.claude/skills/hogwarts-school/   # Course content (tracked in git)
  SKILL.md                        # Skill definition
  references/                     # Module lessons, quizzes, lore
  scripts/                        # Voice, progress tracking, exercises
  assets/                         # Config files
.hogwarts-data/                   # Your student data (gitignored, local only)
```

`git pull` updates course content without touching your progress.

## License

MIT
