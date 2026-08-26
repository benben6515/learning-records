---
description: Summarize a day's GitHub commits into a grouped recap — per-repo, ranked by lines changed, capped with overflow, plus a one-line highlight — printed to console and saved as a dated markdown dev-log. Use for daily work recaps, standup prep, or commit digests.
---

# Recap Work — daily GitHub commit digest

Summarize GitHub commits for the authenticated user into a grouped recap, then save it as a dated markdown file.

## Configuration

- **TARGET_DATE** — from `$ARGUMENTS` (`YYYY-MM-DD`), else today (`date +%Y-%m-%d`).
- **GH_ORG** — optional org/user prefix filter (env var or argument). If set, keep only repos under `GH_ORG/`; if unset, include every repo.
- **DEV_LOGS_DIR** — output directory (default `$HOME/dev-logs`). Created if missing.
- **Summary language** — 繁體中文 by default; use the caller's language if one is requested.

## Steps

1. Resolve TARGET_DATE, GH_ORG, DEV_LOGS_DIR per Configuration.

2. Get the authenticated user's login:

   ```
   GH_USER=$(gh api user --jq '.login')
   ```

3. Fetch commits via the Events API (captures ALL branches and all commit author emails, unlike the Search API):

   ```
   gh api "users/$GH_USER/events?per_page=100"
   ```

4. Filter for `PushEvent` where `created_at` starts with TARGET_DATE **and** — if GH_ORG is set — `.repo.name` starts with `GH_ORG/`. For each match extract:
   - `.repo.name` (full name, e.g. `org/repo`)
   - `.payload.before` and `.payload.head` (the SHA range)

5. Expand each push to **all** its commits (one push can hold many, not just the head):

   ```
   gh api "repos/{full_repo_name}/compare/{before}...{head}" --jq '.commits[] | {sha: .sha, message: (.commit.message | split("\n")[0])}'
   ```

   Take the first line of each `.commit.message`. Deduplicate across pushes by SHA.

6. Per unique SHA, fetch stats for ranking and totals:

   ```
   gh api "repos/{full_repo_name}/commits/{sha}" --jq '{sha: .sha, additions: .stats.additions, deletions: .stats.deletions}'
   ```

   Keep each commit's `additions + deletions` (ranking, step 7); sum all additions and deletions for the day's totals.

7. Group by repo and render (exact format under *Output*): repos alphabetical; within a repo, commits by lines changed descending, recency as tiebreaker; cap at 3 commits, then `... and N more commits`.

8. Write the Summary section — value-focused, not a commit listing:
   - One bolded highlight line: `**今日重點**: {the day's main accomplishment in one sentence, from the highest-impact work}` (or the equivalent in the chosen language).
   - 3–4 bullets grouping related commits into accomplishments. Omit any empty bullet — never pad.

9. Print the recap to console **and** write it to `$DEV_LOGS_DIR/$TARGET_DATE.md`. Done when both exist. If no commits matched, print `No commits found for $TARGET_DATE.` and skip the file — that is a clean skip, not a failure.

## Output

```markdown
# YYYY-MM-DD

> lines of code changed: -{deletions} / +{additions}

[ repo_name ]
- commit message 1
- commit message 2
- commit message 3
... and 12 more commits

[ small_repo ]
- commit message 1

## Summary

**今日重點**: {one-line main accomplishment}

- key accomplishment 1
- key accomplishment 2
```

## Rules

- Repo name without the owner prefix (`repo`, not `org/repo`).
- First line of each commit message only; strip conventional-commit prefixes (`feat:`, `fix:`, `chore:`, …).
- Repos alphabetical; commits by lines changed descending (recency tiebreak); 3 per repo + overflow line.
- Deduplicate by SHA (same SHA can appear in multiple push events).
- No commits → no file.
