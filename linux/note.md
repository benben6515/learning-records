# udemy linux

## 03 system access and file system

```sh
cd ..
pwd
whoami
ls -al
su -
man

touch
cp
vi
mkdir
rmdir -r

find . -name README
locate . -name README
updatedb

touch index{1..9}.js
ls -ltr index*
```

soft and hard link

- inode = pointer or number of a file on the hard disk
- soft link = link will be removed if file is removed or renamed
- hard link = deleting renaming or moving the original file will not affect the hard link

```sh
ln
ln -s

touch hulk
cd /tmp
ln -s /home/benben/hulk
cd ..
echo "hulk is a superhero" > hulk
cd /tmp
cat hulk

ls -ltri hulk
cd ..
ls -ltri

```

## 04 Linux fundamentals

- permissions types
  - r: read
  - w: write
  - x: execute

- each permission can be controlled at three levels
  - u: user = yourself
  - g: group = can be people in the same project
  - o: order = everyone on the system

```md
-rw-rw-r--
drwxrwxrwx (d: dir)
```

- chmod (change file mode bits)

```sh
# check permissions
ls -l FILE_NAME

# remove w to g
chmod g-w FILE_NAME

# remove all r
chmod a-r FILE_NAME

# add rw to u
chmod u+rw FILE_NAME

# NOTE
# If a dir don't has `x` permission, then we can cd into that dir.

# Those are the same
chmod ugo+r FILE_NAME
chmod 444 FILE_NAME
```

- chown/ chgrp (change ownership/ change group ownership)

```sh
whoami
ls -ltr
su -
pwd
ls -ltr
chown root FILE_NAME

```

- ACL (Access Control List)

Access control list provides an additional, more flexible permission mechanism for file system. It is designed to assist with UNIX file permissions. ACL allows you to give permissions for any user or group to any dic resource.

- getfacl/setfacl

```sh
# get file acl
getfacl FILE_NAME

# set file acl
setfacl -m u:USER_NAME:rw /tmp/FILE_NAME
```

- help commend

```sh
# 3 type of help

# simple desc
whatis command

# usage
command --help

# document
man command
```

- adding text to files

```sh
# 3 way to add text to a file

# 1. vi
vi hi

# 2. Redirect command output > or >>

# 3. echo > or >>
echo "Hello world" > hi
cat hi

# add text on bottom of file
echo "hi" >> hi
```

- input and output

stdin: Standard input, 0
stdout: Standard output, 1
stderr: Standard error, 2

```sh
# output
ls -la > listings
ls -la >> listings

# input
cat < listings
# same
cat listings
mail -s "Office memo" allusers@abc.com < memo-letter

# error
```

- pipe

```sh
# tee
echo "hello world" | tee hi
echo hi

# add on the bottom
echo "hello world" | tee -a hi
```

@ find line in dir

```sh
# find line in file
wc -w index.js

# find line in file
wc -l index.js

# find line in dir
find /src -type f | xargs wc -l
```

- pipes

```sh
# command1 | command2
ls -ltr | more

ls -l | tail -l
```

- file maintenance commands

```sh
cp
rm
mv
mkdir
rmdir # or `rm -r`, `rm -Rf` (remove sub-dir and its all content)
chgrp
chown
```

- file display commands

```sh
# cat
cat FILE_NAME

# more
more FILE_NAME # `space` for next page, `q` for quit

# less
less FILE_NAME

# head
lead -2 FILE_NAME

# tail
tail -2 FILE_NAME
```

- filters / text processors
  - cut
  - awk
  - grep/egrep
  - sort
  - uniq
  - wc (word count)

- cut

```sh
# utils
cut --version
cut --help

# does not work, you need add `-X`
cut FILE_NAME

# cut first character
cut -c1 FILE_NAME

# cut character by range, chose
cut -c1,2,4 FILE_NAME
cut -c1-3 FILE_NAME
cut -c1-3,6-8 FILE_NAME

# cut list by byte size (same as c1-3, but on certain device byte may change)
cut -b1,3 FILE_NAME

# field
cut -d: -f 6 /etc/passwd
cut -d, -f 6-7 /etc/passwd

# combine
ls -l | cut -c2-4
```

- awk

awk is a utility/language for data extraction.

> Its name comes from the initials of its designers: **Aho, Weinberger, and Kernighan**. awk features user-defined functions, multiple input streams, TCP/IP networking access, and a rich set of regular expressions.

```sh
# utils
awk --version

# field
awk '{print $1}' FILE_NAME
ls -l | awk '{print $1,$3}' FILE_NAME
ls -l | awk '{print $NF}' FILE_NAME

# search
awk '/Jerry/ {print}' FILE_NAME

# output only 1 field of FILE_NAME
awk -F: '{print $1}' /etc/passwd

# replace
echo "Hello Tom" | awk '{$2="Benben"; print $0}'
cat FILE_NAME | awk '${$2="Benben"; print $0}'

awk 'length($0) > 15' FILE_NAME
ls -l | awk '{if($9 == "Benben") print $0;}'

# number of fields
ls -l | awk '{print NF}'
```

- grep/egrep

grep command which stands for **global regular expression print**, processes text line by line and prints any lines which match a specific pattern.

```sh
# utility
grep --version
grep --help

# search
grep keyword FILE_NAME
ls -ltr | grep keyword FILE_NAME

# search and count
grep -c keyword FILE_NAME

# search and ignore case-sensitive
grep -i KEYword FILE_NAME

# search and display match lines and their line numbers
grep -n keyword FILE_NAME

# search and display keyword
grep -n keyword FILE_NAME

# combine
grep keyword FILE_NAME | awk `{print $1}`
grep keyword FILE_NAME | awk `{print $1}` | cut -c1-3
ls -l | grep Desktop

# search for 2 keywords
egrep -i "keyword1|keyword2" FILE_NAME
```

- sort/uniq

```sh
# sort
sort FILE_NAME

# sort reverse
sort -r FILE_NAME

# sort by field
sort -k2 FILE_NAME

# uniq
uniq FILE_NAME

# combine
sort FILE_NAME | uniq

# count
sort FILE_NAME | uniq -c
```

- wc

The command reads either standard input or a list of files and generates: **newline count, word count, and byte count**

```sh
# cat newline count, word count, and byte count
wc FILE_NAME

# cat lines
wc -l FILE_NAME
# cat words
wc -w FILE_NAME
# cat bytes
wc -c FILE_NAME

# combine
ls -l | wc -l
```

- diff/cmp

diff: line by line
cmp: byte by byte
