# MongoDB

Impedance mismatch is when the database doesn't seemlesy integrate with the service using it and the database format has to be changed or tweaked in order to be used by the system. THis is one of the disadvantages of MySQL. MongDB is an ODM style database that solves this problem by representing the database information especially as is used in the system making it wonderful for integrating with NODEjs. The most common way of avoiding impedance mismatch is with adequate and properdata modelling techniques

## MongoDB Structure

- Stores data in BSON format which is a binary representation and superset of JSON
- Has the following hierachy ***database &rArr; collection &rArr; document &rArr; fields***
- Can store anything that can be serialized or represented in JSON
- Has no set schema or pre defined structure. Each document can have a varying structure as desired by the developer.
- No special operation is required to add/remove fields or modify field types
- Automatically adds an `_id` fields as required
- Databases are created lazily which means a database is only created when a document is inserted into it

## Pros of MongoDB

- High performance
- Rich query language
- High Availability
- Horizontal scalability

## CRUD Operations in MongoDB

CRUD refers to the basic operations on a database:

- C: Create
  - `.insertOne`: used to insert a single document
  - `.insertMany`: for a lot of documents
- R: Read
  - `.find`: Reads to filter
  - `.findOne` To find one document. Filters are passed with a JSON format.
- U: Update
  - `.update` to update one
  - `updateMany` to change a lot
- D: Delete
  - `deleteOne` to delete a single document
  - `.deleteMany` to delete a lot of commands matching the criteria
  - `.remove` removes all the values matching the query

## Three tier system

 This consists of three layers or interfaces

- The first tier *Presentation* This is the interface that is visible to our
clients and may be represented by the frontend and exposed routes
- The second tier *Controller*; This is the connection between the presentation and the database. It makes use of different functions to connect the database with the presentation

- The third tier *Database*: this handles all our database operations and
MongoDb being our dbms, will fall in that tier. The database drivers allow client applications to communicate with the database. The MongoDB Node.js driver is the official library provided by MongoDB for interacting with Node.js applications

## Mongoose

This is the MongoDB ODM tool (Object Document Mapping). SInce MongoDb is schemaless, it ensures flexibility but lacks data validations and constraints implementation. Using Mongoose, we're able to provide a schema based soluthon to model the application data. It allows us to enforce typing and define a reusable dependable structure for our documents. To use a schema definition, it is converted into a model

- The instance of a model is a document and each document has a similar mapping stored on MongoDB

### Pros

- Supports eight data types : **number, date, buffer, boolean, mixed, string, objectId, array**
- Each datatype allows us to specify
  - a default value
  - custom validation functions
  - a getter function
  - a setter function to manipulated data before it is saved to the database
  - Indexes to allow us to fetch data faster
