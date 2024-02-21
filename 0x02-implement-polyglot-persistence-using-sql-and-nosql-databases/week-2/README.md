# MongoDB

Impedance mismatch is when the database doesn't seemlesy integrate with the service using it and the database format has to be changed or tweaked in order to be used by the system. THis is one of the disadvantages of MySQL. MongDB is an ODM style database that solves this problem by representing the database information especially as is used in the system making it wonderful for integrating with NODEjs. The most common way of avoiding impedance mismatch is with adequate and properdata modelling techniques

## MongoDB Structure

- Stores data in BSON format which is a binary representation and superset of JSON
- Has the following hierachy ***database &rArr; collection &rArr; document &rArr; fields***
- Can store anything that can be serialized or represented in JSON

