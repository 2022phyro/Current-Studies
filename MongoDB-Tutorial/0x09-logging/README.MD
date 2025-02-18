# LOGGING

* There are different ways to access the logs in mongoDB. THis is useful for trouble shooting and other activities
* Default locations of the log files on different systems
  * Linux: `/var/log/mongodb/mongod.log`
In the mongosh shell, we can use the `show log <type>` to show a specific kind of log or the `show logs` to show the different log types. THis command calls the getLog command by the admin internally. And this is the command behind the hood
`db.adminCommand({ getLog: 'global' })`

## Log events
 * Log messages are stored in the mongod.log file
 * Structured in JSON as objects of key value pairs
 * The keys are usually single letter with names like `t` for timestamp, etc

## Rotation
* Since logs are always growing, it is important to rotate the log to prevent them from growing
* Log rotation mantains a log size and this can be done manually or automatically
* MongoDB stores the last 30 days worth or messages. So the retention limit of a message is 30 days
* In self hosted systems, the logs are stored indefinitely, while Atlas maintains the above behaviour.
* To rotate the logs we have to pass a `SIGUSR1` signal to it or run the `db.adminCommand({ logRotate: 1 })` in the mongosh
* There are two types of log rotation
  * `rename`: the current log file is renamed by adding a *UTC timestamp*, this will open a new log with that name. The old log is closed and all new events are redirected to the new log
  * `reopen` responds to the *logRotate* or *SIGUSR1* signal by `kill`. It closes and reopens the file and is used by external services. This is used also by the *logRotate* external utility and requires the `logappend` option to add new log lines to the end of the file.
  * MongoDb can be configured to use the logrotate utility to automate rotation

### Logrotate
* An utility for helping to manage log files in linux
* Renames current log, creates a new log and uses logic to complete the rotation process
* Configured to rotate logs, daily, weekly, or monthly
* Can be used by mongDB to automate rotation
* Usage and configuration in the official docs

