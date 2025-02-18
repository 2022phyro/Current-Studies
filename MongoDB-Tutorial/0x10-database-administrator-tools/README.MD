# Database Administration Tools

There are several tools available for mongoDB users to manage and control their data. They fall into four categories namely. See the offical docs for the installation of the tools packed into the *mongodb-org-tools* by apt.

## Backup and Restore

### mongodump (Backup)
* can be used to backup the content of a simple cluseter
* suited for transfer of small databases and/or collections form one cluster to another
* Creates files that are stored in a directory called *dump* in the working directory
* Not suitable for large deployments
* SHould not be used on sharded clusters
* Handles network partitions poorly
* Provides limited support for *point-in-time* restores
* Does not contain index data
* Syntax `mongodump <--options> <connection string>`
* Users need to have the find privelege in order to back up data
* Common options include
 * --out: Specifies a different output directory from _dump_
 * --db: limits the backup to a single database
 * --collection: limits it to a single collection in a database
 * --readPreference:  reduces pressure on the primary
 * --gzip: conpress the data
 * --archive: collapse all data to a single file instead of a set of files in the dump folder or stream to stdout
 * --oplog: 
  * captures incoming write operations
  * Produces an additional BSON file at the top of the folder
  * Works only when dumping an entire cluster hence incompatible with the `--db` or `--collection`

### mongorestore (Restore)
* Used to load a mongodump data to a cluster
* Can be used on standalone or replica sets but not sharded cluster deployments, just like mongodump
* Version compatibility between the source and target clusters to prevent data loss
* Version compatibility between the mongodump that created that dump data and the mongorestore restoring it
* Handle network partitions poorly
* Limited support for *point-in-time* restores
* Does not update matching documents but will create new ones
* Does not restore the `system.profile` collection
* May trigger the creation of indexes which is time consuming
* Syntax is `mongorestore <--options> <connection string> <directory or file to restore`
* If authentication is enabled on the mongDB deployment, the user should have the *Restore* role and the *dbAdmin* or *dbAdminAnyDatabase* role if the backup data has the `system.profile` or `oplogReplay` option is used
* Common options include
  * --nsInclude and --nsExclude: They give us more control over the namespaces we want or don't want to restore. It also supports the wildcard usage via _*_
  * --drop: Removes matching collections from the database before the reloading them. The documents created will be given new `_id`s
  * --noIndexRestore: When used will prevent the creation of indexes
  * --writeConcern: Controls the durability requirements for the restore
  * --gzip: tells mongorestore that the source data was compressed
  * --archive: tells mongorestore to use the give file name as the single source of data
  * --oplogReplay: Provides replic sets with a point-in-time restore option
  * Searches for oplog data in the source
  * Applies it to the target after restoring the source documents


## Data Import and Export

### mongoexport (Export)
* Used to export data from a mongodb collection to JSON/CSV file
* Can be used with standalone sharded and replica set cluster deployments
* Converts mongDB bson format to the format specified
* In the above process, type information may be lost, hence it is recommended to export to JSON in canonical mode to preserve as much integrity as possible
* Document field names prefixed with a `$` or containing a `.` are not supported by mongoexport and may lead to data loss.
* Syntax is `mongoexport <--options> <connection string>`
* If authentication is enabled, the user must have read access to the database
* Common options include
  * --db: specifies the target database. Required. Can also be part of the collection string
  * --collection: required and determines the document to be exported
  * --type: defines the output format. Using json by default
  * --out: specifies the destination file. It is written to stdout by default
  * --jsonFormat: Specifies the type fidelity, either *relaxed* or *canonical*
  * --query: Helps reduce the number of documents selected for export. Must be a json object enclosed in quotes

### mongoimport (Import)
* Used to load data from JSON/CSV/TSV
* Can be used with standalone sharded and replica set cluster deployments
* Supports oonly utf8-encoded data files
* Helps with data migration
* The version of mongoimport should match the mongoexport used to create the file
* JSON files should be in the Extended JSON v2.0 format
* Uses batching to efficiently load data
* Max batch size is 100,000 bulk insert/upsert
* Document field names prefixed with a `$` or containing a `.` are not supported by mongoexport and may lead to data loss.
* Syntax is `mongoimport <--options> <connection string> <file>`
* If authentication is enabled, the user must have readWrite access to the database
* Common options include
  * --db: specifies the target database. Required. Can also be part of the collection string
  * --collection: required and determines the document to be exported. Determines the collection name and defaults to the filename minus the extension
  * --type: defines the input format. Using json by default
  * --mode: Determines how collisions are handled. Collisions are when there are exisiting documents in both the destination and the source. the available behaviours are
    * insert
    * upsert
    * merge
    * delete
  * --upsertFields: specifies the fields to uniquely identify the source. Available only for upsert, merge and delete mode options. There should be an index for the specified field
  * --drop: Destroy and recreate the collection
  * --file: Specifies the file location, defaults to stdout

## Diagnostic Tools:

### mongostat (Diagnostic)
* Provides a real time view of a currently running MongoDB instance
* Prints basic server stats including Operations breakdown
, mongodb memory stats, lock queues, etc.
* Recommended monitoring tools include 
  * CLoud Manager
  * MongoDB Atlas Real-Time Performance Panel
  * THird Party Monitoring tools
* Syntax is `mongostat <--options> <connection string> < polling interval in seconds>`
* If authentication is enabled, users must have the *clusterMonitor* role
* Options include
  * --o: Specifies fields we want to see in the output
  * --O: Returns server Status fields and additional fields. default to stdout
  * --rowcount: Limits the rows returned to a value, if not it will continue to emit the statistics

### mongotop (Diagnostic)
* monitors read and writes per collections
* Outputs a list of all active collection with time spent on reads, writes and in total within the polling interval
* Provides insight into the traffic of each collection
* Helps identify potential issues and bottlenecks
* Syntax is `mongotop <--options> <connection string> < polling interval in seconds>`
* If authentication is enabled, users must have the *serverStatus and top* priveleges
* Common options include
 * --json: Returns output in json and a count of the number of operations thaat took place during the polling interval
  * --rowcount: Limits the rows returned to a value, if not it will continue to emit the statistics

### bsondump (diagnostic)
* Converts bson files into human readable format
* Can be used to diagnose issues arising from `mongorestore` by checking he contents of the file using bsondump
* Strictly for inspecting files, not for data injestion or other application uses
* Syntax i s`bsondump <--options> <file>`
* Common options include
  * --outFile: Specifes a destination file, defaults to stdout
  * --pretty: Used to give a pretty print view of the result especially when reading to stdout
  * --type: Defaults to json. specifies the type of information returned. If set to debug, debugging info is added to it

## GridFS Tools
This allows us to manage files in a mongodb database. *GridFS* is a specification for storing files in a MongoDB database. It stores files using two collections. `fs.files` stores the file meta data, `fs.chunks` stores the binary data, limiting it to 256kb per document. the database holding both of them is called the  *Grid FS store*

* GridFS does not support multi-document transactions
* You CANNOT query the contents of the GridFS files

### mongofiles
* Provides an interface between objects stored in your local file system and GridFS
* Provides Upload, Download, Delete and List capabilities
* Syntax is `mongofiles <--options> < connection string> <command> <filename or gridFS object id`
* If authentication is enabled, users must have *read* role for list, search, and get commands, and the *readWrite* role for the put and delete commands.
* Common mongofiles commands include
  * list - list all files in the gridfs store
  * search <string> - list all files matching a search string file name in the gridfs store
  * get <filename> - will download from gridfs
  * put <filename> - will upload to gridfs
  * delete <filename> will delete a file from the gridfs

* common options include
 * --db: Specifies the name of the database we're using as our gridfs store
 * --local: Specifies the local file system name of a file for get and put commands
 * --replace: Used with put to replace an existing gridfs file with a new file with the same name
 * --writeConcern: Controls the durability requirements for the file upload when using a replica set. The default is `majority`
 * --readPreference: Helpful when reading from a replica set to reduce pressure on the primary. *NB*, Using anything other than the primary can result in stale data

