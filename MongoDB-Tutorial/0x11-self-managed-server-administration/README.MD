# Self-Managed Server Administration


## mongod
* Primary daemon service for MongoDB
* Handles connection requests and persisting data
* For installation, see the [official docs](https://www.mongodb.com/docs/manual/installation/).
* Start the mongod service using
 * *systemctl* - `sudo systemctl start mongod`
 * *service* - `sudo service mongod start`
 We can continue to check on ubuntu using this using either the systemctl or servce which is used to handle and manage daemons and services.

## Configuring mongodb servers
The servers are configured in the mongodb.conf file which is a YAML file with default settings like 
* storage
* system log
* net
* security
It is usually stored on linux distributions at `/etc/mongod.conf`

## Connecting to mongodb servers
This can be achieved with the aid of *mongosh*. Mongosh is a REPL (Read Evaluate, Print, Loop) environment for interacting with mongodb servers. Mongosh methods allow us to interact with mongod. like database and replication methods.
Database methods allow us to 
* Interact with data
* Manage databases, collections and users
* Check status of the database
In mongosh, there is the *localhost exception*. This allows all connections from localhost in order to have full access to the instance so that the first user can be created.
* Applies only when there are no users or roles created in the MongDB instance.
* The connections can create only the first user.
* So for us to move on ,we connect and create our first user granting him all priveleges and permissions
* `use admin` allows us to switch to the admin database in order to perform top level operations. and database methods
* the `db.adminCommand(<command>)` allows us to perform the exact same thing without having to switch to the admin database. However, it is preferred to use the `use admin` route for certain cases. Consider these example that creates a new user in both the `use admin` and the `db.adminCommand`
```javascript
use admin // Switches to the admin database

db.createUser(
  {
    user: "dbaTestAdmin",
    pwd: "dbaTestPassword",
    roles: [ { role: 'root', db: 'admin' } ]
  }
)

// Using the db.adminCommand()
db.adminCommand(
  {
    createUser: "dbaTestAdmin",
    pwd: "dbaTestPassword",
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" }
    ]
  }
)
```

## Logging Basics for MongoDB servers

* We can access the logs by opening the logs file whose path is specified in our config file.
* We can also access the logs by using the `show logs` and the `show log` utility in mongosh
* log messages are in JSON
* Each key is a log message field type
* The keys are usually shortened to their first letter hence "t" for timestamp, "s" for severity, "c": component  or categroy of the log, "id"  for the unique id, "ctx" the thread that caused the log, "msg" the actual message, "tags", tags associated with the log .
* Log rotation is advised for preventing the logs from growing too much.
* MongoDB does not automatically rotate the logs. We can handle that ourselves
