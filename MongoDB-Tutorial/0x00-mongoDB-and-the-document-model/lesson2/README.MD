# The Document Model

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
