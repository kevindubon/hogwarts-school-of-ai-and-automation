#!/usr/bin/env bash
# Author: Kevin Dubon
# Hogwarts School of AI and Automation - Audio Packager
# Packages audio cache into a tarball for GitHub Release upload
# Usage: ./package-audio.sh [version]  (default: v1.0)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
CACHE_DIR="$PROJECT_ROOT/.hogwarts-data/audio-cache"
VERSION_FILE="$SKILL_DIR/assets/audio-version.json"
VERSION="${1:-v1.0}"
TARBALL_NAME="hogwarts-audio-${VERSION}.tar.gz"
OUTPUT_DIR="$PROJECT_ROOT/.hogwarts-data"
TARBALL_PATH="$OUTPUT_DIR/$TARBALL_NAME"

echo "=== Hogwarts Audio Packager ==="
echo ""

# 1. Verify cache directory exists
if [ ! -d "$CACHE_DIR" ]; then
  echo "ERROR: Audio cache directory not found: $CACHE_DIR"
  echo "  Run: node .claude/skills/hogwarts-school/scripts/hogwarts-voice.js generate-cache"
  exit 1
fi

# 2. Count MP3 files
MP3_COUNT=$(find "$CACHE_DIR" -name "*.mp3" -type f | wc -l | tr -d ' ')
echo "Found $MP3_COUNT MP3 files in cache"

if [ "$MP3_COUNT" -eq 0 ]; then
  echo "ERROR: No MP3 files found. Generate cache first."
  exit 1
fi

# 3. Create tarball (MP3 files + manifest.json, relative paths)
echo "Creating tarball: $TARBALL_NAME"
cd "$CACHE_DIR"
{ find . -name "*.mp3" -type f | sort; [ -f manifest.json ] && echo ./manifest.json; } | tar czf "$TARBALL_PATH" -T -
cd "$PROJECT_ROOT"

# 4. Compute SHA256
SHA256=$(shasum -a 256 "$TARBALL_PATH" | cut -d' ' -f1)
SIZE=$(stat -f%z "$TARBALL_PATH" 2>/dev/null || stat -c%s "$TARBALL_PATH" 2>/dev/null)

echo ""
echo "Tarball: $TARBALL_PATH"
echo "Size:    $(echo "$SIZE" | awk '{printf "%.1f", $1/1024}')KB ($SIZE bytes)"
echo "SHA256:  $SHA256"
echo "Files:   $MP3_COUNT"

# 5. Update audio-version.json (placeholder URL — update after upload)
cat > "$VERSION_FILE" << JSONEOF
{
  "version": "${VERSION}",
  "sha256": "${SHA256}",
  "download_url": "https://github.com/OWNER/REPO/releases/download/audio-${VERSION}/${TARBALL_NAME}",
  "file_count": ${MP3_COUNT},
  "total_size_bytes": ${SIZE}
}
JSONEOF

echo ""
echo "Updated: $VERSION_FILE"
echo ""
echo "=== Next Steps ==="
echo ""
echo "1. Create a GitHub release and upload the tarball:"
echo ""
echo "   gh release create audio-${VERSION} \\"
echo "     '${TARBALL_PATH}' \\"
echo "     --title 'Hogwarts Audio ${VERSION}' \\"
echo "     --notes 'Pre-generated voice narrations (${MP3_COUNT} files)'"
echo ""
echo "2. Update the download_url in audio-version.json with your actual OWNER/REPO"
echo ""
echo "3. Commit audio-version.json:"
echo "   git add .claude/skills/hogwarts-school/assets/audio-version.json"
echo "   git commit -m 'Update audio release to ${VERSION}'"
echo ""
