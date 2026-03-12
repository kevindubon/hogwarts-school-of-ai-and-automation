#!/bin/bash
# Author: Kevin Dubon
# Packages the Hogwarts School skill for sharing (excludes personal data)

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_DIR="${1:-$SKILL_DIR/../../hogwarts-school-export}"

echo "Packaging Hogwarts School skill..."
echo "  Source: $SKILL_DIR"
echo "  Output: $OUTPUT_DIR"

# Clean output directory
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Copy skill structure (excluding personal data)
rsync -av --exclude='.hogwarts-progress/' \
          --exclude='*.DS_Store' \
          "$SKILL_DIR/" "$OUTPUT_DIR/"

# Reset voice-config.json to defaults (remove any personal API key env names)
cat > "$OUTPUT_DIR/assets/voice-config.json" << 'EOF'
{
  "enabled": false,
  "provider": "openai",
  "elevenlabs": {
    "api_key_env": "ELEVENLABS_API_KEY",
    "voice_id": "JBFqnCBsd6RMkjVDRZzb",
    "model_id": "eleven_flash_v2_5",
    "voice_settings": {
      "stability": 0.6,
      "similarity_boost": 0.8
    },
    "output_format": "mp3_44100_128"
  },
  "openai": {
    "api_key_env": "OPENAI_API_KEY",
    "voice": "onyx",
    "model": "tts-1",
    "response_format": "mp3",
    "speed": 1.0
  },
  "narration_points": [
    "sorting_welcome",
    "sorting_hat_speech",
    "house_reveal",
    "module_intro_hook",
    "butterbeer_quote",
    "quiz_pass_celebration",
    "graduation_speech",
    "achievement_unlock"
  ]
}
EOF

# Add install instructions
cat > "$OUTPUT_DIR/INSTALL.md" << 'EOF'
# Hogwarts School of AI and Automation -- Installation

## Quick Install

1. Copy this entire folder to your Claude Code skills directory:
   ```bash
   cp -r hogwarts-school-export ~/.claude/skills/hogwarts-school
   ```

2. (Optional) Enable voice narration:
   - Set `OPENAI_API_KEY` or `ELEVENLABS_API_KEY` in your `.env` file
   - Run: `node ~/.claude/skills/hogwarts-school/scripts/hogwarts-voice.js enable`
   - Test: `node ~/.claude/skills/hogwarts-school/scripts/hogwarts-voice.js test`

3. Start the skill:
   - Type `/hogwarts-school` in Claude Code

## Requirements

- Claude Code (CLI or IDE extension)
- Node.js (for progress tracking and voice scripts)
- (Optional) OpenAI or ElevenLabs API key for voice narration

## What's Included

- Full 8-module course on AI and Automation
- Interactive Sorting Hat ceremony
- House points, quizzes, exercises, and achievements
- AI voice narration at dramatic moments (optional)
- Progress persistence across sessions
EOF

echo ""
echo "Done! Shareable skill package at: $OUTPUT_DIR"
echo "Files excluded: .hogwarts-progress/ (student data)"
echo "Voice config reset to defaults (disabled, generic env var names)"
