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
