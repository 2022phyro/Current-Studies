# MongoDB and the Document Model

## Introduction to MongoDB

MongoDB is a general purpose, no sql database that stores info as documents, a flexible schema similar in structure to objects in native code. It can be used to model anything and is not as constrained as relational databases. Consider this example
```json
{
 _id: 1
 name: "Ada Lovelace"
 bio: "The first programmer"
}
```

## Key terms

* **Document**: Basic unit of information/data stored in the database
* **Collection**: A grouping of related documents
* **Database**: A grouping of related database

## The Document Model

MongoDB structures data as documents whihc are similar to _JSON_ object eg
```json
{
_id: 1,
name: "John"
}
```
* MongoDB however stores data as _BSON_--Binary JSON
* BSON allows more support and capabilites beyond JSON as well as more datatypes
* **ObjectID** is a unique data type used to create unique identifiers to identify each document
* Documents have a flexible schema meaning it can have different fields with differnt values

## Managing Databases, Collections and Documents in the Atlas Data Explorer
