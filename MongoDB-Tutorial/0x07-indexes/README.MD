# Indexes in MongoDB

 * special data structures
 * store small portion of the document data
 * ordered and easy to search efficiently
 * point to the document identity


* Sppeds up queries
* reduce disk I/O
* Support equality matches and range based operations and return sorted results
* mongoDB creates a default index with the `_id` field.
Without indexes

* mongoDb has to read all documents each time for each query
* it would have to store all results in memory if extra operations like sort are used.
 ## Single field Indexes

* This is an index on a particular field in the document. 
* Support queries and sorts on a single field
* created using the `createIndex` order
* Syntax is `db.collection.createIndex({field: 1}, {extra})`. The number is the sort order, but can be queried and sorted in both ways. `extra` allow us to specifify other constraints like unique, fulltext, etc
* `getIndexes()` is used to show us all the indexes on a particular collection
* `explain` method gives us more info on a query and can tell us if an index was used in the query. The syntax is `db.collection.explain().query...`
Eg of single field indexes
```javascript
// Create a single index
db.customers.createIndex({
  birthdate: 1
})
// Create a unique index
db.customers.createIndex({
  email: 1
},
{
  unique:true
})

```
# Compound field Indexes
* Indexes on multiple fields
* Can be multi key inde if it includes an array field with the limit of one array field per index
* Support queries that match on the prefix of the index fields
* For a query to use the index, it must contain at least the first indexx in the compound index
* Follow the order for compound indexes: *Equality*, *Sort*, *Range*
* Sort field should come after te equality to prevent in-memory sort especially if there are ore than one 'sort' fields in both ascending and descending order
 Eg
 ```javascript
 // Creating a multiple index
db.customers.createIndex({
  active:1, 
  birthdate:-1,
  name:1
})

// Covering - Explaining/Monitoring a compound index
// The index below is optimized to avoid the FETCH stage because it's projection returns only the indexed fields
db.customers.explain().find({
  birthdate: {
    $gte:ISODate("1977-01-01")
    },
  active:true
  },
  {name:1,
    birthdate:1, 
    _id:0
  }).sort({
    birthdate:-1,
    name:1
    })
 ```
### Multi key index
* These indexes operate on an array field
* Can be single field or compound
* You can have only one array field per index (esp in case of compound field indexes).
* The syntax to create a multi key infex is the same as that of a single field or a compound field
* Under the hood, mongoDB actually breaks down the index to store individual indexes of each unique element in the array


__NB:__ The explain shows us that for a compound index or any index, returning projections that only contain the fields we have indexed saves time.


## Deleting indexes
 Oftentimes, it is necessary to remove redundant or unused indexes to avoid the write cost
 * The implicit index on the `_id` field cannot be deleted
 * Recreating an index takes time and resources
 * We can use the `hideIndex` to hide an index if we're not sure it should be deleted. This index will not be used in queries but will continue to be updated. The syntax is `db.collection.hideIndex("index name" | {index key})`
 * To delete, we use `dropIndex("index name" | {index key})`.
 * `dropIndexes()` deletes all indexes. To delete only particular indexes, pass the names  or key as an array in the `dropIndexes()` method. Eg
 ```javascript
// deleting an index by key

db.customers.dropIndex({
  active:1,
  birthdate:-1, 
  name:1
})
// deleting an index by name

db.customers.dropIndex(
  'active_1_birthdate_-1_name_1'
)
// deleting multiple indexes
db.collection.dropIndexes([
  'index1name', 'index2name', 'index3name'
])
 ```
