# Self managed backup and recovery

## Backup Plans
This is a process usually involving
* How to back up data
* How often to backup data
* Wherer to store backup data
* How long to retain backup data
This gives us more insight into what style to use, whether snapshots or long stores, tools to use and factors in stuff like how long the backups will take to both be created and restored

### Recovery Point Objective (RPO)

* Maximum acceptable amount of data loss a business is willing to accept, expressed as an amount of time
* Determined by
  * Criticality of the data
  * Time and effort required to recreate or re-enter lost data
  * Cost of downtime

### Recovery Time Objective (RTO)

* Max time a business can tolerate after an outage before the disruption makes normal business operations intolerable
* Determined by
 * Criticality of systems
 * Recovery process
 * Availability of resources
 * Cost of downtime

## Filesystem snapshots on a mongodb server
* Common way of backing up data
* Snapshot - complete copy of your data at a specific point in time
* Can be used on all size systems
* Snaphots creates pointers between a source volumre and a snapshot volume
* The snapshot volume is a poin-in-time read-only view of a source volume
* A volume is a container with a file system that allows us to store and access data
* Snapshots can be created with different tools like
  * Logical Volume Manager (Linux)
  * MongoDB Ops Manager
* MongoDB Atlas, etc

### Things to consider before creating a snapshot

* The database should be locked before a snapshot is created. This can be achieved using `fsyncLock()` to prevent additional writes during the process and unlocked using the `fsyncUnlock()`
* The source volume may contain a lot leading to very large snapshot archives.
* Components may be stored seperately and should be handled. Eg the journal is a sequential binary transaction log that is used to bring the dtabase into a valid state in the event of a hard shutdown and it is stored seperately. Information like this should also be part of our snapshots.
* Isolate the mongoDB deployment before creating the snapshot

After the snapshot is created, we need to extract the data for storage and there are two options
* *Snapshot volume archive:*
 * A complete copy of the source volume plus any extra changes durning when the snapshot occurred. can be achieved with the `dd` utility in linux
* *Filesystem archive:* here we mount the snapshot volumen and use filesystem tools such as `tar` to archive the actual data files

## Creating a backup in a linux mongod server (snapshots)

* lock the Database
```
db.fsyncLock();
```
exit
* create a Snapshot Volume - The following code shows how to create a snapshot volume. The snapshot volume has a maximum size of 100 megabytes, and is named mdb-snapshot and backed by the MongoDB data store volume.
```bash
sudo lvcreate --size 99M --snapshot --name mdb-snapshot /dev/vg0/mdb;
```
* unlock the Database
```
db.fsyncUnlock();
```
* archive the Snapshot - The following code performs a complete copy of the snapshot volume, streams the data to the gzip utility for compression, and finally redirects the output to the archive file.
```bash
exit

sudo dd status=progress if=/dev/vg-1/mdb-snapshot | gzip > mdb-snapshot.gz

```
* Restore the Archived Snapshot - The following code shows how to restore the archived snapshot. First, create a new logical volume named mdb-new:
```
sudo lvcreate --size 0G --name mdb-new vg0;
```
Next, extract the snapshot and write it to the new logical volume:

```
gzip -d -c mdb-snapshot.gz | sudo dd status=progress of=/dev/vg0/mdb-new
```
Then, stop the MongoDB service before mounting to the source directory:
```
sudo systemctl stop -l mongod; sudo systemctl status -l mongod;
```
Delete any existing MongoDB data files. 
```
sudo rm -r /var/lib/mongodb/*
```
Next, unmount the MongoDB deployment so that you can mount the newly restored logical volume in its place.
```
sudo umount /var/lib/mongodb
```
Mount the restored logical volume on the MongoDB database directory:
```
sudo mount /dev/vg0/mdb-new /var/lib/mongodb
```
Finally, start the MongoDB service and connect to the deployment. Run show dbs to confirm that the databases have been restored. Eg
```
sudo systemctl start -l mongod; sudo systemctl status -l mongod;

mongosh

show dbs
```


## Creating a backup in a linux mongod server (archive)

* lock the Database
```
db.fsyncLock();
```
exit
* create a Snapshot Volume - The following code shows how to create a snapshot volume. The snapshot volume has a maximum size of 100 megabytes, and is named mdb-snapshot and backed by the MongoDB data store volume.
```bash
sudo lvcreate --size 99M --snapshot --name mdb-snapshot /dev/vg0/mdb;
```
* unlock the Database
```
db.fsyncUnlock();
```
* archive the Snapshot - The following code performs a complete copy of the snapshot volume, streams the data to the gzip utility for compression, and finally redirects the output to the archive file.
```bash
exit // exit th emongodb shell

mkdir /tmp/mongodbsnap

```
Next, mount the snapshot volume taken previously as read-only on the directory that you just created:
```
sudo mount -t xfs -o nouuid,ro /dev/vg0/mdb-snapshot /tmp/mongodbsnap/

```
Finally, use tar to create a new archive of all the files in the mongodbsnap directory:
```
sudo tar -czvf mdb-snapshot.tar.gz -C /tmp/mongodbsnap/ .
```

* Restore the archived snapshot - First, create a new directory and extract the compressed tar file into the new directory:
```bash
sudo mkdir /mdb

sudo tar -xzf mdb-snapshot.tar.gz -C /mdb

```
Then stop the MongoDB service before updating the dbPath in the MongoDB configuration file. Then, make the mongodb user and group the owner of the mdb directory and all of its files. Otherwise, the service will fail to start.
```
sudo systemctl stop -l mongod; sudo systemctl status -l mongod;

sudo chown -R mongodb:mongodb /mdb

```
Next, open the mongod.conf file and change the dbPath to /mdb:

```
sudo nano /etc/mongod.conf

storage:
  dbPath: /mdb

```
Start the MongoDB service and connect to the deployment. Then run show dbs to confirm that the databases have been restored:
```
sudo systemctl start -l mongod; sudo systemctl status -l mongod;

mongosh

show dbs // inside the mongosh repl
```

## Creating a backup for smaller deployments (mongodump)

* The least role to be able to back up the data is the *backup* role for the user. We will make use of mongodump
* security may be enabled for the deployment which will require you to adjust your connection string for the connsections that use the `srv`  specifier or specify the `authSource` query param for those that don't
* Use `mongodump` in the command line followed by the options:

  * The *oplog* option captures incoming write operations during the mongodump operation.
  * The *gzip* option compresses the output file.
  * The *archive* option is used to specify the file location for the dump file.
  * *db* and *collection* options could be used to target specific collection in a database. The db may be an option or part of the command line string. Eg
  ```
    mongodump \
    --oplog \
    --gzip \
    --collection=neighborhoods \
    --archive=mongodump-april-2023.gz  \
    “mongodb://backup-admin@mongod0.repleset.com:27017,mongod1.replset.com:27017,mongod2.replset.com:27017/?authSource=admin&replicaSet=replset&readPreference=secondary”
  ```

## Restoring backups for smaller deployments (mongorestore)

* The least role to be able to back up the data is the *restore* role for the user. We will make use of mongodump
* security may be enabled for the deployment which will require you to adjust your connection string for the connsections that use the `srv`  specifier or specify the `authSource` query param for those that don't
* Use `mongorestore` in the command line followed by the options:

* *--drop:* removes any existing collections from the database.
* *--gzip:* is used to restore from a compressed file.
* *--oplogReplay:* replays the oplog entries from the oplog.bson file.
* *--noIndexRestore:* is used to reduce the impact on the system.
* *--archive:* is used to specify the file location of the dump file. In this case, the file location is `mongodump-april-2023.gz`.
```
mongorestore \
--drop \
--gzip \
--oplogReplay \
--noIndexRestore \
--archive=mongodump-april-2023.gz \
“mongodb://restore-admin@mongod0.repleset.com:27017,mongod1.replset.com:27017,mongod2.replset.com:27017/?authSource=admin&replicaSet=replset”
```

