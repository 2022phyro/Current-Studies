# CRUD - Insert & Find

## Insertion

Insertion in mongoDB can be donw via two methods; `insetOne` and `insertMany`. The `insertOne` creates only a single document while the `insertMany` can be used to insert multiple documents at once. Once a documented is inserted, with the insertOne, the `_id` field is returned while in the `insertMany`, the `_id` fields are returned. Collections are lazily created which means that they are not actually created until a document is actually inserted into it Eg:
```javascript
// insertOne
db.grades.insertOne({
  student_id: 654321,
  products: [
    {
      type: "exam",
      score: 90,
    },
    {
      type: "homework",
      score: 59,
    },
    {
      type: "quiz",
      score: 75,
    },
    {
      type: "homework",
      score: 88,
    },
  ],
  class_id: 550,
})

// insertMany
db.grades.insertMany([
  {
    student_id: 546789,
    products: [
      { type: "quiz", score: 50 },
      { type: "homework", score: 70 },
      { type: "quiz", score: 66 },
      { type: "exam", score: 70, },
    ],
    class_id: 551,
  },
  {
    student_id: 777777,
    products: [
      { type: "exam", score: 83 },
      { type: "quiz", score: 59 },
      { type: "quiz", score: 72 },
      { type: "quiz", score: 67 },
    ],
    class_id: 550,
  },
  {
    student_id: 223344,
    products: [
      { type: "exam", score: 45 },
      { type: "homework", score: 39 },
      { type: "quiz", score: 40 },
      { type: "homework", score: 88 },
    ],
    class_id: 551,
  },
])
```

## Find
This is used to retrieve records. The methods available for it are `find`, and `findOne`. `findOne` returns the first matching object and `find` returns an array of all matching objects. Each of them take the format `find({filter object})`
We can leverage operators to fine tune our queries to get specific documents eg 
* the `$eq` which is implicit, will allow us to find documents matching exactly that criteria. Eg
```javascript
db.students.findOne({grade: {$eq: 'A'}})
db.students.findOne({grade: 'A'}) // implicit. Both will find documens that have grade as exactly A
```
* The `$in` operator will find documents that have a field value equal to any of the values in the array or iterable. Eg
```javascript
db.students.findOne({grade: {$in: ['A', 'B', 'C']}})
```
### Some comparison operators

* `$gt` Used to find items with a field contains a value greater than the specified value. Eg
```javascript
db.sales.find({ "items.price": { $gt: 50}})
```
* `$lt` Used to find items with a field contains a value less than the specified value. Eg
```javascript
db.sales.find({ "items.price": { $lt: 50}})
```
* `$gte` Used to find items with a field contains a value greater than or equal to the specified value. Eg
```javascript
db.sales.find({ "customer.age": { $gte: 65}})
```
* `$lte` Used to find items with a field contains a value less than or equal to the specified value. Eg
```javascript
db.sales.find({ "customer.age": { $lte: 65}})
```

### Querying on array elements

* `$elemMatch`: Used to find items from the collection where a field whose value is an array, and we want to search if a particular item is in that array. Eg
```javascript
db.sales.find({
  items: {
    $elemMatch: { name: "laptop", price: { $gt: 800 }, quantity: { $gte: 1 } },
  },
})
// and if the target document isn't a list of objects, combine the $elemMatch with the $eq

db.sales.find({
    items: {
        $elemMatch: {
            $eq: "camera"
        }
    }
})
```

### Using logical operators

* `$and`: Performs operations to query on one or more epressions. For a document to occur in the sample result, it must satisfy all conditions. It also have an implicit syntax where you simply seperate the queries using a comma. Eg
```javascript
// implicit and
db.routes.find({ "airline.name": "Southwest Airlines", stops: { $gte: 1 } })
db.routes.find({ $and: { "airline.name": "Southwest Airlines", stops: { $gte: 1 }  } })

```

* `$or`: Performs logical or operations to query results. A document simply has to satisfy a sangle condition to be included in the solution. Eg
```javascript
db.routes.find({
  $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }],
})
```

* Combinations: We can combine the `$and` in the `$or` and vice versa. The rule is to remember that the implicit $and won't work well so we are more explicit. This allows us to perform complex queries and gain more fine grained results. Eg
```javascript
// Combining or in and
db.routes.find({
  $and: [
    { $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }] },
    { $or: [{ "airline.name": "American Airlines" }, { airplane: 320 }] },
  ]
})
```
