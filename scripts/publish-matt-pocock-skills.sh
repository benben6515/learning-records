#!/usr/bin/env bash
#
# publish-matt-pocock-skills.sh
#
# Publish the SHAREABLE subset of the Matt Pocock skills course from the local
# authoring workspace into the learning-records repo, so it renders on GitHub Pages.
#
#   source of truth : ~/learning/matt-pocock-skills       (local, stateful, NOT public)
#   public mirror   : ~/Documents/learning-records/matt-pocock-skills
#
# Only these are published (personal files — MISSION/NOTES/RESOURCES/learning-records/ —
# stay local):
#     index.html  lessons/  lessons-tw/  reference/  assets/
#
# Public-only transform: footer links to the local-only MISSION.md / RESOURCES.md
# are redirected to the landing index.html so nothing 404s on the web.
#
# Usage:   ./scripts/publish-matt-pocock-skills.sh
#
set -euo pipefail

SRC="${SRC:-$HOME/learning/matt-pocock-skills}"
REPO="${REPO:-$HOME/Documents/learning-records}"
DST="$REPO/matt-pocock-skills"
PAGES_URL="https://benben6515.github.io/learning-records/matt-pocock-skills/"

[ -d "$SRC" ]        || { echo "✗ source workspace not found: $SRC"      >&2; exit 1; }
[ -d "$REPO/.git" ]  || { echo "✗ learning-records repo not found: $REPO" >&2; exit 1; }

echo "→ copying shareable subset: $SRC → $DST"
rm -rf "$DST"
mkdir -p "$DST"
for item in index.html lessons lessons-tw reference assets; do
  [ -e "$SRC/$item" ] && cp -R "$SRC/$item" "$DST/"
done

echo "→ neutralising local-only footer links (../MISSION.md, ../RESOURCES.md → ../index.html)"
find "$DST" -name '*.html' -print0 | while IFS= read -r -d '' f; do
  perl -pi -e 's{\.\./MISSION\.md}{../index.html}g; s{\.\./RESOURCES\.md}{../index.html}g' "$f"
done

# .nojekyll disables Jekyll so raw HTML/CSS serves unchanged
touch "$REPO/.nojekyll"

cd "$REPO"
git add matt-pocock-skills/ .nojekyll
if git diff --cached --quiet; then
  echo "→ no changes to publish"
else
  n=$(git diff --cached --numstat | wc -l | tr -d ' ')
  git commit -m "chore(courses): republish Matt Pocock skills course ($n files)" -q
  git push -q
  echo "→ pushed $n file(s)"
fi

echo ""
echo "✓ live at: $PAGES_URL"
echo "  EN index : ${PAGES_URL}lessons/0000-table-of-contents.html"
echo "  TW index : ${PAGES_URL}lessons-tw/0000-table-of-contents.html"
