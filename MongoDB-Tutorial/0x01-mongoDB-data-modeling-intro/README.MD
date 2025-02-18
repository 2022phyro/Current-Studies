# Modeling data

## Modeling database relationships

Data that is accessed together should be stored together
 
## Relationships
* *one to one* here one data entity is connected to another data entity in another set
* *one to Many* Here one data entity is connected to many other data entity in aother set
* *Many to Many*: Any number of entities in one set is connected to any number of entities in another set
To model relationships in mongoDB we use
 * ___Embedding___: 
    * Used when we have one to many or many to many relationships
    * Avoids application joins
    * Allows devs to update data in a single operation
    * Provides better performance for read operations
    * Can create large documents causing latency and slower performance
    * May create unbounded documents where documents are added continously, thus exceeding the limit in mongoDB which is *16MB* for a document
    * Here we take the documents and put them inside the model/document that has the relationship with it. Eg:
```json
{
    "_id": ObjectId('74t987abe08080dee'),
    "title": "Star Wars",
    "cast": [
        {"actor": "Mark Hamill", "role": "Luke Skywalker" },
        { "actor": "Harrison Ford", "role": "Han Solo" }
    ]
}

```
* ___Referencing___:
    * Used when we want to store data in two different collections but still show that those collections are related
    * We save the `_id` field of one document in another document
    * Also called *linking* or *data normalization*
    * Avoids duplication of data
    * Ensures smaller documents
    * Querying from multiple documents costs extra resources and impacts read performance
    * Here we store a simple reference or `pointer` to the document which is stored elsewhere or identified by a unique field. Eg:
```json
{
    "_id": ObjectId('74t987abe08080dee'),
    "title": "Star Wars",
    "filming_locations": [
        ObjectId('5088987abe08080dee'),
        ObjectId('4aae487abe08080dee'),
        ObjectId('7487abe0808abcceaa'),
    ]
}
```

## Common Schema Anti-Patterns

Schema design patterns are guidelines that help the developer plan, organize and model data

* Massive arrays
* Massive no of collections
* Bloated documents
* Unnecessary indexes
* Queries without indexes
* Data that is accessed together but stored in different collections
