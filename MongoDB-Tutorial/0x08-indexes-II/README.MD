# Indexes in MOngoDB - Part II

## How indexes work

 Indexes are stored in mongoDb as a *B-tree*. The B-tree is self balancing but unlike a binary tree, a node can have more than two child nodes. The data is stored sequentially from left to right. Eg for a compound index, the indexes will be arranged with the first index field in the compound index, After arranging it, the second field will be ordered around the first and so forth. This is why we need to pay close attention to the Equality, Sort Range format of the indexes to make the most use of the B-tree structure anf advantages

## Understanding the explain statement
Explain tells us how a query works. It returns information about the query plan and execution statistics.
* It can be used on read methods like `find`, `aggregate` etc
* Syntax is `db.collection.explain()` or `db.collection.find().explain()`. The second option gives a document result for better readibility
* When used with a write statement like `update`, `explain` will give us information about the query *but* will not carry out the query itself

### Query planner
* It chooses and caches the most efficient query plans for later use given the available indexes
* Caches the information in a [LRU](https://www.enjoyalgorithms.com/blog/implement-least-recently-used-cache) format for every collection
* The cached entries are used for subsequent queries with similar structures
* The caches can be cleared by addition/modification/removal of indexes, colection drops and explcit clears with the `gePlanCache().clear()` method

The explain method can be controlled by passing in any of these as a string parameter to it __queryPlanner__, __executionStats__, and __allPlansExecution__. Each one specifes or adds more information to the resulting analysis


## Wildcard Indexes

* These indexes support queries with unknown or dynamic fields
* Used for documents and collections with no set schema
* Syntax `db.collection.createIndex({"field.$**": 1})`
* Can also be used to create an index on all fields in each document of a collection. To do so, we use `db.collection.createIndex({"$**": 1})`
* We can use the wildcard projection to specify which fields we want included or excluded. Eg
```javascript
db.products.createIndex(
  { "$**": 1 },
  { wildcardProjection: { _id: 1, stock: 0, prices: 0 } }
)
```
* *Compound wildcard indexes* allow you to mix a wildcard index with a specified index. available from ___MongoDB 7^*___ Eg
```javascript
db.products.createIndex({
  stock: 1, "product_attributes.$**" : 1
})
```
* However, wildcard indexes are huge and affect writes too so to be used sparingly
* They cannot be used with the `ttl` or partial indexes

## Partiall indexes

* These index documents from a collection that match a filter expressions
* `_id` or *shared key fields* cannot be added to a partial index because they require full indexes to function properly
* Hence they will only be used if a query matching the index is run.
* syntax is
```javascript
db.zips.createIndex(
  { field: 1 },
  { partialFilterExpression: { anyField:{condition} } }
)
// Example

 db.zips.createIndex(
  { state: 1 },
  { partialFilterExpression: { pop: { $gte: 10000 } } }
)
```
* The `partialFilterExpression` supports mainly the comparison operators in mongoDB

## Sparse Indexes

* These index fields that are optional, thus containing only document entries that have the index field thus eliminating larger and redundant indexes that may contain even documents that don't have the indexed field
* Syntax `db.collection.createIndex({index}, {sparse: true})`
* They won't be used if the result will be incomplete
* If an index is created with sparse and unique constraints set to true, then the constraint will not apply for documents that don't have it


## Clustered Indexes
The different indexes so far are stored separately from the collecion, forcing the operations to manipulate different streams.
* Clustered indexes are indexes that are only available as part of a clustered cpllection
* Can only be created when the clustered collection is built
* *Clustered collections* are collections created with a clustered index
  * They store documents in a cluster index order
  * Stores the cluster index key alongside the documents
* Improves query efficiency
* Reduces disk usage
* improve memory cache usage
* reduce i/o operations
* improve TTL if the index was created as a TTL

* Can only be created during the creation of a clustered collection
* Only one clustered index per clustered collection
* They are not used by the query planner if an eligible secondary (normal)  index exists
* Can't be hidden
* Can't be created in capped collections

## Time series Collections

* Time series data is data that automatically change overtime. Like temperature, weather, etc. It consists of time, metadata (the source) and measurements (key -value pairs that change overtime)
* When creating a time series collection, a clustered index is also created on the ___time___ field, thus making it a clustered collection. Eg
```javascript
db.createCollection("weather", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "hours",
  },
})

```

## Monitoring Indexes

* The `$indexStats` is an aggregation operator. It provides information on the available indexes, returning an array of docs that provide information about the index and how many times it has been accessed
* To use `$indexStats`, we run an aggregate query, Eg
```javascript
db.customers.aggregate([{ $indexStats: {} }])
```
* if the aggregation is long, the $indexStats part should come first before other fields

* The *Database Profiler* provides information about the commands run in the database and can be used to identify or capture slow operations or all operations. This data is then stored in a capped collection called `system.profile`
* It is heavy and will impact the performance of the database as long as it is on.
* To enable it, we run `db.setProfileLevel(<level>, {options})`. ___levels___ can be 1 or 2. if level is 1, only slow operations will be captured. 2, will log everything at once. Eg `db.setProfilingLevel(1, { slowms: 30 })`
