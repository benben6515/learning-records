# System Administration

- file editor
  - vi - Visual editor
  - ed - Standard line editor
  - ex - Extended line editor
  - emacs - A full screen editor
  - pico - Beginner's editor
  - vim - Advance version of vi

- sed
  - replace a string on a file with a new string
  - find and delete a line
  - remove empty lines
  - remove the first or n lines in a file
  - to replace tabs with spaces
  - show defined line form a file
  - substitute within vi editor

```sh
# only change in screen (s/, substitute)
sed 's/string-a/string-b/g' FILE_NAME

# change in file (-i, insert)
sed -i 's/string-a/string-b/g' FILE_NAME

# delete string-a in file (-i, insert)
sed -i 's/string-a//g' FILE_NAME
sed '/string-a/d' FILE_NAME

# remove empty lines
sed '/^$/d' FILE_NAME

# substitute tabs with spaces
sed '/\t/ /g' FILE_NAME

# pick n lines (p, pick)
sed -n 12,18p FILE_NAME

# expect (8!, change file expect line 8)
sed '8!s/Seinfeld/S/' FILE_NAME

# use sed in Vi/Vim
:%s/string-a/string-b/g
```
