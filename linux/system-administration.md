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

- user account management
  - Commands
    - useradd
    - groupadd
    - userdel
    - groupdel
    - usermod
  - Files
    - /etc/passwd
    - /etc/group
    - /etc/shadow

```sh
# example
useradd -g superheros -s /bin/bash -c "user description" -m -d /home/spiderman spiderman

# add user
user spiderman
# check user
id spiderman
cd /home/
ls -ltr
# delete user (-r, delete dir as well)
userdel -r spicerman

# add group
groupadd superheros
# check group
cat /etc/group
# change user's group
usermod -G superheros spiderman
chgrp -R superheros spiderman

# change passwd
grep sipderman /etc/passwd
useradd -g superheros -s /bin/bash -c "Ironman Character" -m -d /home/ironman ironman
id ironman
passwd ironman
```

- enable password aging

the change command - per user

- -d: last password change
- -m: thx minimum number of days required between password changes
- -M: the maximum number of days the password is valid
- -W: the number of days before password is to expire that user is warned that his/her password must be changed
- -I: the number of days after password expires that account is disabled
- -E:  days since Jan 1, 1970 that account is disabled

```sh
# example
chage [-m mindays] [-M maxdays] [-d lastday] [-I inactive] [-E expiredate] [-w warndays] user

chage -m 5 -M 90 -W 10 -I 3 USER
grep USER /ect/shadow
```

- switch users and sudo access(su, sudo)

- command
  - su - username
  - sudo
  - visudo
- file
  - /etc/sudoers

```sh
ifconfig

# *use the ip address on the top to open a terminal

# switch to root
su -

# switch another user
su - USER

# check user list
visudo
```

- monitor users

```sh
# check user id
who
# w like who but provide more information
w

# check last operation
last
last | more
last | awk '{print $1}' | sort | uniq

```

- talking to users (users, wall, write)

```sh
# check users
users

# broadcast
wall

# send message to specific user
write

whoami
ipconfig
wall
# enter message
# ctrl + v
# message should show in the system

users USER_NAME
# enter message
# ctrl + v
# message should show is USER_NAME
```
