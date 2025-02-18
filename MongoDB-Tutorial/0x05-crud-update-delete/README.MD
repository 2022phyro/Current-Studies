# CRUD - Update and Delete

## Replace

This allows us to replace an existing document in the databse with another document/ To do so we use the `replaceOne` for one document change. The syntax is `replace({filter}, {replacement}, {extra})`. Eg
```javascript
db.books.replaceOne(
  {
    _id: ObjectId("6282afeb441a74a98dbbec4e"),
  },
  {
    title: "Data Science Fundamentals for Python and MongoDB",
    isbn: "1484235967",
    publishedDate: new Date("2018-5-10"),
    thumbnailUrl:
      "https://m.media-amazon.com/images/I/71opmUBc2wL._AC_UY218_.jpg",
    authors: ["David Paper"],
    categories: ["Data Science"],
  }
)
```
## Update

The update methods are two .`updateOne` and `updateMany`. Both are used to update prexisting documents that fit the given criteria. The syntax is the same as that for replace and as usual, the `extra` option is not required. `updateMany` is not an allor nothing operation which means if it fails it won't roll back the already made updates. You'll need to run the `updateMany` again to complete the operation
### Operators

* `$set`: Adds new fields and values to a document or replaces the value of a field with a specified value.  Eg
```javascript
db.podcasts.updateOne(
  {
    _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8"),
  },

  {
    $set: {
      subscribers: 98562,
    },
  }
)

// update many

db.books.updateMany(
  { publishedDate: { $lt: new Date("2019-01-01") } },
  { $set: { status: "LEGACY" } }
)
```
* `$push`. Appends an item to a field of arrays or creates a new array with the specified value as the first element for the field in question. Eg
```javascript
db.podcasts.updateOne(
  { _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8") },
  { $push: { hosts: "Nic Raboy" } }
)
```


### upsert
 This is an example of the extra. Basically upsert either updates the document if it exists, or creates a new one if it doesn't exist. Eg
```javascript
db.podcasts.updateOne(
  { title: "The Developer Hub" },
  { $set: { topics: ["databases", "MongoDB"] } },
  { upsert: true }
)
```

### findAndModify

Returns a document that has just been updated. It combines the actions of an `updateOne` + a `findOne`. This is useful since the `updateOne` doesn't return the item we were looking at before it is modified. THe syntax is
`findAndModify({query: {filters}, update: {document}, new: true})`. The new option is to return the document created. Eg
```javascript
db.podcasts.findAndModify({
  query: { _id: ObjectId("6261a92dfee1ff300dc80bf1") },
  update: { $inc: { subscribers: 1 } },
  new: true,
})
```

## Delete

To delete items, we have two methods, the `deleteOne` and the `deleteMany`. These methods are capable of deleting one or many documents at once. The delete methods take the following format: `delete({filters})`. Information about the deleted objects is returned to us. If something should happen to cause the deleteMany to fail, then you will have to run the deleteMany again to complete the operation. Eg

```javascript
// delete one document

db.podcasts.deleteOne({ _id: Objectid("6282c9862acb966e76bbf20a") })

// delete many documents

db.podcasts.deleteMany({category: “crime”})
```
