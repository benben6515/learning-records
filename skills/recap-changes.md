---
description: Calculate the current lines of code changes (staged + unstaged) in the repo
---

Calculate and display the current lines of code changes in the working tree (uncommitted changes only).

## Steps

1. Run staged changes stats:

   ```
   git diff --cached --numstat
   ```

2. Run unstaged changes stats:

   ```
   git diff --numstat
   ```

3. Parse the output of both commands. Each line has the format: `{additions}\t{deletions}\t{filepath}`.

4. Also check for untracked files and note them separately (these won't appear in diff output).

5. Sum all additions and deletions across both staged and unstaged changes.

6. Display the result in this format:

   ```
   Lines of code changed: -{total_deletions} / +{total_additions}

   Staged: +{staged_additions} / -{staged_deletions} ({staged_file_count} files)
   Unstaged: +{unstaged_additions} / -{unstaged_deletions} ({unstaged_file_count} files)
   Untracked: {untracked_count} files

   Top files by change volume:
     {filepath}  +{adds} / -{dels}
     ...
   ```

7. List top 10 files sorted by total lines changed (additions + deletions, descending).

Rules:

- If there are no changes at all, print "No uncommitted changes detected. Working tree is clean."
- Skip binary files (they show as `-` in numstat output).
- If `$ARGUMENTS` is provided, use it as a pathspec filter (e.g. `/changed-lines src/` only shows changes in `src/`).
