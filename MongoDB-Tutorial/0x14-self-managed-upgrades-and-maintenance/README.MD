# Self managed upgrades and maintenance

## Zero downtime maintenance with a mongodb deployment
The idea is to try to perform maintenance without much or any downtime at once in MongoDB. Downtime is costly, extrmemly costly.
* To minimize downtime in mongoDB we lvereage `replica sets` to do rolling maintenance
* A replica set remains operational even if a node is unavailable
* Maintenance is needed in mongoDB when
  * upgrading the mongDB
  * upgrading drivers
  * Changes to the replica set membership
  * Upgrading operatins systems
* Use an alternate environment to test maintenance before carrying out the procedure on the main server.
* Consider a three way system with one primary and two secondary. To avoid downtime while maintenance, this is what we'll do
  * Shutdown the first secondary and then update it. then restart it and let it catch up to the other nodes
  * Then shut down the second secondary and repeat the previous process
  * Then we elect a new primary from any of the updated nodes, and perform the previous process on the previous primary which will now become a secondary
* All this can be easily be done in Atlas via rolling maintenance, although cumbersome for self managed systems.

## MongoDB Client Driver Upgrades

Drivers are softwares that allow us to connect an application to a database, in this case MongoDB. With drivers, we're able to use different programming languages nd write softwares that can connect, query and perform operations on any database. For the case study here, we'll be using `mongodb` which is the main MongoDB driver for Node js. the principles are applicable to other drivers for mongDB in other programming languages.
* Before upgrading, check and make sure the driver and the database versions are compatible
* Consider also performance. Performance may spped up or slow down after an upgrade. It should be thoroughly tested before pushed to production
* Deprecation. Some syntax and methods may change or be dropped across upgrades eg from callbacks to async/await, etc. It is important to make sure that the new upgrade doesn't break existing code

## MongoDB server upgrades

### Pre-upgrade checklist
* Check compatibility between your drivers and the server
* Check the versions. Ugrades that cross major releases should be done incrementally. Eg from 5.0 to 6.0 before to 7.0 and not directly at once.
* Check feature compatibilty version (FCV) to make sure that data will persist and will bot be lost across upgrades
* Determine how much time we have to complete maintenance; This is based on the sixe of the oplog and difference between the oldest and most recent operations in the oplog. Use the `db.printReplicationInfo()` to get the necessary info for this step
* Confirm that the replica member state is healthy and is not in rollback or in repair
* Check that the secondary are not trying to catch up from a previous event ie there is not lag between the secondary and primary


### Upgrade

1. Replace old binaries with new binaries, by installing the new version on your system, either with a package manager like apt or download manually
2. Test the application with the new binaries and the FCV set to the old version
3. Set the FCV to the new version and continue testing
4. Then repeat the above 3 steps for the rest of the secondaries
5. After all secondaries are updated, step down the existing primary, elect a new one from the upgraded secondaries, and then repeat 1 to 3 for the old primary which has now become a secondary.

