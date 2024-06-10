# Replication in MongoDB

## Replication
* Process of storing multiple copies of the same data
* Keeping the copies on seperate servers but synchronized to one another
* To provide fault tolerance in case of any issue with any copy
* Called *replica set* in MongoDB. Each database instance in a replica set is called a *replica set member*
* Provides a lot of benefits including

### High Availability
* Making sure our data can be continually accessed even if there's a lack of availability in a system


## Replica set
* Made up of several mongodb instances, each holding the same copy of data
* Commonly 3, 5, 7. The max configuration is 50 members with 7 voting members.
* The members of a replica set are usually called *nodes*
* The set consists of one *primary* and several *secondary* nodes

### Primary
* Only member of the set that receives write operations
* Handles read operations by default
* When an operation occurs, it is saved to the primary's `oplog` entry

### Secondary
* Replicates the content of the primary member
* Can be configured to allow read operations
* Duplicates the pimary's oplog entries and applies the operations to their datasets

If the primary fails for some reason, an *election* can be made to elect a new primary from any of the existing secondary nodes. During election, the ___votes___ are cast for the secondary most eligible to become the new primary. The secondary with the most votes becomes the new primary. The previous primary once repaired, will become a secondary and catch up on the operations lost by duplicating the new primary's oplog entries and applying the operations. The process described is called a *failover*


## Automatic failovers and elections in MongoDB deployments

### Elections
* Takes place when the primary of a replica set becomes unavailable
* The member with the most votes becomes the new primary
* May be triggered by events like
  * Adding a new node to the replica set
  * Initiating a replica set
  * Performing maintenance
  * The secondary nodes losing connectivity for more than the configured timeout (default=10 seconds)
* The secondary that initiates the election shares how recent their data is and the election terms (tracking the number of elections). It then votes for itself.
* Each set can have a max 7 members with voting privileges and each memebr can cast only one vote per election. Recommended numbers are 3, 5, 7
* Its *IMPORTANT* to have an *ODD* number of votimg members. This ensures that a new primary is elected in the event of a network partition
* Each replica set member has a *priority value* defaulting to `1`. The higher the number, the more eligible. Members with priority of `0` are ineligible for voting and cannot initiate an election
* The entire election takes a few seconds to complete

## The MongoDB Operation log aka `oplog`

### `oplog`
* A *capped* collection (in capped collections, the oldest records are overwritten once it reaches capacity)
* Can help in 
  * Recovering from a specific timestamp in the oplog
  * Checking if the secondaries are lagging behind the primary
  * Determining the oplog window to avoid an initial sync when performing maintenance
* Changes are recorded here whenever a change is made to the primary
* The secondaries, meanwhile read a continouns stream from the oplog and update their datasets as well
* The oplog collection can be queried like a normal databas for more information
* Oplog entries are idempotent (any entry can be applied once or several times with no difference to the final result)
* Once a secondary falls far too behind in the oplog (`replication lag`), it will enter a *recovering* state. This member is eligible to vote but can't accept read operations
  * It will carry out an initial sync (copy all data including the oplog from a replica set member)
  * Initial syncs are expensive in terms of network, COU and disk usage

## Read and Write concerns with MongoDB deployments


### Write concern
* Describes how many data bearing members need to acknowledge a write before it's considered complete
* Higher levels of acknowledgment means more assured data durability
* Defaults to majority - Meaning a majority of members are required to acknowledgethe write operation before it's complete
* We can provide a number to specify the number of members we need to acknowledge. Eg
  * 1 : Only the primary is needed
  * 2: two members, etc

* Configuring write concerns, we can configure the write concern in the document we're trying to write using the options parameter. Eg
```
db.cats.insertOne({ name: "Mac", color: "black", age: 6 }, { writeConcern:
{ w: "majority" , wtimeout: 3000 } });
```

### Read concerns
* Specifies a durability guarantee for the documents returned by a read operation
* One can choose to return either the most recent data or the one committed by a majority of members
* Read concern levels include
  * local (default) - returns most recent
  * majority - returns most committed by majority
  * available - same as local for replica sets
  * linearizable - reflects all successful majority-acknowledged writes that completed before the start of the read operation
* We can set the read concern and write concern levels Eg
```
db.adminCommand({
    setDefaultRWConcern : 1,
    defaultReadConcern: { level : "majority" },
    defaultWriteConcern: { w: "majority" }
  })

```

### Read preferences
* Describes which member of a replica set you want to send read operations to
* Values for this incude
  * primary (default) - Read from primary
  * primaryPreferred - Tries to read from primary first before reading from secondary
  * secondary - Reads from secondary
  * secondartPreferred - Tries to read from secondary first before reading from primary
  * nearest - Read from the member with the nearest network ping,
* Reading from the secondary poses the risk of stale data.
* To set read experience, append it to the connection string
```
mongodb://db0.example.com,db1.example.com,db2.example.com/?replicaSet=myRepl&readPreference=secondary&maxStalenessSeconds=120
```
## Deploying a replica set in a MongoDB deployment
See the official docs for this step to see how to create a replica set in ubuntu. in Atlas, replica sets are automatically created and maintained for us


## Configuring a replica set in a mongoDB deployment


See the official docs
