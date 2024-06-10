# Database Management Systems [DBMS]

Data is a very important aspect of programming. Every time we work with data when we take the bus, count and estimate the number of customers in our shop and all that, we're still working with data. Thus it's important for us to make sure our data is organized and stored in a a way that is easily accessible, not compromised and reliable.

## Explaining ER Model and Data Normalization

### Database

 An organized collection of data that can be stored and accessed eletronically. A database involves

- Data storage
- Data retrieval
- administration
- reports
- queries
- data security

### A database management system [DBMS]

 is a software defined system that can be used to create and manage databases and database information
A dbms involves

- add, delete, access, modify and analyze data
- uses application programs specifically written to access data
- defines how data will be stored, accessed and updated

### Data Model

- A representation of a real world situation in which data is collected and stored in a database
- the model shows the data flow and logical interrelationship between the different data elements
- it is divided into
  - **Object Based Logical Model:**
  This is further divided into
    - **ER Model:**
  - **Record Based Logical Model:**
    - **Relational Model:** This represents the records as a series of relationships in the form of records in tables
    - **Network Model:** This represents the data and relationships in form of records and links
    - **Hierachical Model:** Represents daa and relationships in a tree like structure showing the relationships as links and records children or nodes of preceding records on the

### ER Model

- Widely used for designing databases
- Sees the world as a collection of objects/entities and the relationships among them
- Made up of
  - **Entity:** An object, place, person, activity, anything that can be identified as belonging to a particular class sharing similar features or properties. It is further divided into
    - Entity type: A set of things that share common properties
    - Entity instance : An individual occurence of an entity type
  - **Relationship:** Association between entity types
  - **Attribute:** Properties that define an entity type
  - **Cardinality:** Number of times an entity participates in a relationship. There are 3 types of cardinality
    - One to one relationship
    - One to Many relationship
    - Many to many relationship

### Relational Database Management System

- Relationships are maintained among different tables
- Examples are mysql, microsoft sql, oracle sql
- Data is structured into tables, rows and columns

### Data

Data can be in different forms It can be

- **Structured:** where it can be organized into tables or a particular format eg financial reports
- **unstructured:** when it is has or recognizable organization or format, like social media comments, audio files
- **redundant:** when it serves a role/purpose that is already being filled or when it is duplicated. If it can be deleted without information being lost, then it is redundant

## Data Normalization

- Process of organizing the fields and tables of a relational database to improve efficiency, optimization
- Usually involves dividing larger tables into smaller ones
- Helps in reducing data redundancy

## RDBMS Data Structure

- **Table** is a collection of organized records. Each table in the same database must have a unique name
- A columns is an **attribute** of the table. it must be unique
- the number of attributes is the **degree** of the table
- a **primary key** is a column or group of columns that uniquely identify records in a table
- A **record** is known as a **tuple** it is the rows in a table. The number of tuples in the table is its **cardinality**
- Different records side by side in a table make up a relation.
- **Domain** is the collection of values or pool of information from which the table's records draw their actual values

## MySQL

- Open source relational database management system
- Developed, distributes and supported by Oracle Corporation

## Structured Query Language [SQL]

- A programming language used for storing, manipulating and retrieving data
- First commercial language introduced for E.F Codd's relational model
- Also known as a fourth generation languaget [4GL]

### SQL Commands

- **Data Definition Language [DDL]:** Coomands that change the table structure. These result in permanent changes. Examples are
  - `CREATE`

    ```sql
    CREATE DATABASE [IF NOT EXISTS] <DB_NAME>;
    CREATE TABLE <TABLE_NAME>
    (
      column_name1 datatype1,
      column_name2 datatype2,
      ...
      column_nameN datatypeN
    );
    ```

  - `DROP`

  ```sql
  DROP DATABASE [IF EXISTS] <DB_NAME>;
  DROP TABLE [IF EXISTS] <TABLE_NAME>;
  ```

  - `ALTER`

  ```sql
  ALTER TABLE table_name ADD(column_name datatype)
  ```

- **Data Manipulation Language [DML]:** Commands that manipulate the data stored inside a table. Examples are
  - `INSERT`

  ```sql
  INSERT INTO table_name VALUES (col1_value, col2_value, ...)
  ```

  - `UPDATE`

  ```sql
  UPDATE table_name SET column_name = new_value WHERE some_condition
  ```

  - `DELETE`

  ```sql
  DELETE FROM table_name WHERE condition;
  ```

- Data Query Language [DQL]: Commands that fetch information from the database. Examples are:
  - `SELECT`

  ```sql
  SELECT [ALL | DISTINCT]
    select_expr [, select_expr2, ...]
    [FROM table_references]
    [WHERE condition]
  ```

### SQL constraints

These are protocols or rules a table's data column must follow to maintain data accuracy. There are six types of sql constraints. These are

- **Primary Key:** Uniquely identifies records in the table
- **Unique:** Ensures that all fields in a particular column are different/unique
- **Not Null:** Ensures that the specified column must always have a value
- **Foreign Key:** Colums used to link two columns where one columm is the primary key in another column
- **Check:** Helps the database limit the value of a column within a specific range
- **Default:** Provides a value for the colum if a value is not provided
