# CRUD - Modifying Query Results

## Cursor
A *cursor* is a pointer to the result of a query. Cursor methods, are then chained to cursors to further modify or perform actions on the result set.

## Sorting
To sort, we make use of `cursor.sort()`. `cursor.sort()` takes two parameters: `cursor.sort({fieldName: 1, ...}, {options})`. The fields we want to sort by takes 1 for ascending order and -1 for descending order. The options field further customize sorting behaviour. For instance, the default sorting methods gsorts capital letters first, then small letters. The options field could be used to change htis behaviour. Example of a sorting operation
```javascript
// Sorting by two fields

db.companies.find({ category_code: "music" }).sort({ name: 1, _id: 1 });

// Sorting by one field
db.companies.find({ category_code: "music" }).sort({ name: 1 });
```

## Limiting
This cursor method allows us to limit the number of results returned to us. THis a feature that is important for improving performance, etc. It takes the format: `cursor.limit(number)`. The number lets us specify how many documents that we want returned. Eg
```javascript
db.companies
  .find({ category_code: "music" })
  .sort({ number_of_employees: -1, _id: 1 })
  .limit(3);
```

## Projections

Projections allow us to select only particular fields, allowing us to exclude particular fields that we do not need for our operation. The projection is passed along as the second parameter of the `find` and `findOne` methods. The syntax is `find({filters}, {field1: 1, field2: 0, ... fieldN: 1|0})`. A value of *1* means inclusion and *0* meanse exclusion.
* We *CANNOT* mix both inclusion and exclusion in a projection. We either choose the fields we want added or the fields we want excluded
* The only exception to the above rule is the `_id` field. It can be excluded in an inclusion projection and vice versa
Eg
```javascript

// Inclusion

db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1 }
)

// Exclusion

db.inspections.find(
  { result: { $in: ["Pass", "Warning"] } },
  { date: 0, "address.zip": 0 }
)

// The id field is the only exception to this rule

db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1, _id: 0 }
)
```

## Count
To count documents in the database, we make use of the `countDocuments`. The syntax is `db.collection.countDocuments({query}, {options})`. The query is the filter field for the documents we want to count. The options are extra arguments to specify the counting behaviour. Eg
```javascript
// Counting everything

db.trips.countDocuments({})

//Counting based on a query

db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: "Subscriber" })
```

