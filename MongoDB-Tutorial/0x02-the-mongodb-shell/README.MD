# Mongosh: The MongoDB shell

`mongosh` is a command like shell utility used to connect to mongodb databases and mongDB atlas and perform operations from our local systems

## Installation

See the docs for each system/platform

## Configuring mongosh

Using the config API
* The config api allows us to change settings in the shell
* The API is accessed through the config object
* `config.get()` gives us the value of a specific setting
* `config.set(setting, value)` allows us to change the settings
* The settings are changed for as long as the shell session is active

Using the mongosh.conf file
* Allows us to modify settings
* These settings are overwritten by the config API if any of them is reset in the shell

Using command line arguments passed to mongosh

* We can pass the commands to the command line using the `--eval` flag
* We can also run queries and get results without running the shell. Eg
`mongosh <atlas connection string> --eval "db.accounts.find({email: 'user@a.com'}).limit(5)"`

## Using the mongosh

Mongosh is built upon Javascript. This allows us to leverage Javascript native code inside the mongosh to perform amazing stuff and go round some problems. Mongosh provides a `load()` function to load Javascript files into the memory of mongodb

### Editing commands and functions
To edit our already loaded functions/commands, etc, we need to set our default editor either to vim or any other text editor, then we simly call `edit <command/function`. This will open it up in the text editor allowing us to edit them.

## Using the .mongoshrc.js file

This file can be used to add more functionalities and customization to the mongosh. Think of it as a pre-requisite that will be checked before the shell spins up. It can be useful for creating things like shortcuts and aliases to longer and more complex functions as well s customize appearance like the prompts, etc.

## Tips and tricks for the mongosh

* Writing query results to a json file
* Useful for sharing a subset of data or saving the results of a diagnostic command
Since mongosh is bulit upon node js, we can write native javascript in it and we also have access to modules like the fs module and even the npm package modules. This allows us to carry out different tasks using native javascript like seeding a database with test data using libraries like faker, and writing to files using the fs module. Eg
```javascript
const customers = db.sales.aggregate([
 {
   $project: {
     _id: 0,
     customer: 1
   }
 }
]).toArray()

fs.writeFileSync('customers.json', EJSON.stringify(customers, null, 2));
```

