# Connecting to MongoDB databases

THe mongoDB *connection string* allows us to connect to our database located elsewhere or atlas cluster. it can be done with the MongoDB compass, the mongosh shell, etc. There are two connection strings that can be used or two different formats

## Standard format
* Used to connect to standalone clusters, replica sets or shared clusters


## DNS Seed List Format
* Provides a DNS server to our connection string
* Gives more flexibility of deployment
* Able to change servers in rotation without reconfiguring clients

## Parts

<mongodb>+<srv>://<username>:<password>@<host>[:<port>]/?<extra>
mongodb - DNS seed list format
srv - Use TLS
username - User credentials
password - user credentials for authentication
host - where our db instance is running
port - Optional port number
extra - extra options for more features

## Drivers

MongoDB Drivers are softwares that allow us to connect to mongodb in different popular programming languages like javascript, python, c#, etc. These software can been seen from the docs and are important for powering our databases to make use of mongoDB
