# MongoDB Database Metrics & Monitoring (mainly for Atlas)

## What to monitor

### Query targeting

Analyze read efficiency by analyzing the ratio of the documents scanned to the documents returned. The ideal ratio is `1: 1`. Which means that every document scanned should be returned. The higher the number, the lower the efficiency and the higher numbers severly impact performance

#### Storage

Monitors disk space used by documents, indexes, etc. Writes are refused when the capacity is reached as the system could crash. Some key metrics include
* Disk Space Percent Free
* Disk IOPS
* Disk Queue Depth
* Disk Latency

### CPU Utilization

Track CPU usage by deployment. It includes the System CPU and Process CPU. Polonged CPu usgage can lead to delays and are an indicator of poor querying. Monitor it to know if one is to make use of indexes

### Memory utilization

Provides information about the amount of memory available for the workload. The memory shoue be large enough to hold all indexes. Low memory leads to poor performance or _Out of Memory_ conditions. Key metrics include
* System memory
* Swap usage

### Replication lag

Measures the delay between the primary and the secondary. Epressed in seconds. A large lag can negatively impact integrity of the replica sets and lead to poor performance and data redundancy and loss.


## Baseline values
* Varies depending on workload
* Established by sampling during production to determine the noraml or acceptable levels

## Burst values
* Acceptable values for occasional spikes including how high and how often.
* Excessive or sustained spiking could indicate an issue


## Out of Range

This is trouble. When the values are beyond the baseline or acceptable and tolerated values. For
* Query Targeting - A very high ratio
* Replication lag: When the secondary can't keep up with the primary
* The rest of the metrics; ForResource exhaustion or at 90% and above

## More metrics
* *Opcounters:* Number of opertions per sec run on a MongoDB process. Tracks 
commands like query, insert, delete, update and getMore
* *Network traffic:* Tracks network performance and provides information on it like bytes in, bytes out, num of requests etc.
* *Connections:* Total number of open connections by application, shell clients, and internal connections> a large number of connections may strain system resources and may indicate a sub optimal client connection strategy
* *Tickets available:* Tracks number of concurrent read anf write operations available to the MongoDB storage engine. If it drops to zero, others must wait until it is finished and dropped to free up resources
`atlas metrics processes <cluster id>  --period P1D --granularity PT5M --output json –type connections` will allow us to view the metrics from the command line using the Atlas CLI. We can also use the dashboard

## Configure alerts.
Alerts can be configured for different settings and for different metrics in Atlas. This refers to MOngoDB atlas ans we can configure these alerts using either the Atlas Dashboard or the CLI. See the different ways to handle the alerts on the command line using the Atlas CLI. ON the project level you need to have the *ProjectOwner* role in order to create the alerts.

* view alert Settings
```
atlas alerts settings list --output json
```
* create a new alert
```
 atlas alerts settings create --event JOINED_GROUP --enabled \
 --notificationIntervalMin 5 \
 --notificationType USER \
 --notificationEmailEnabled \
 --notificationUsername < username> \
 --output json --projectId <project id> 
 ```
* update Alert Settings
```
 atlas alerts settings update <alert id> \
 --event JOINED_GROUP \
 --enabled \
 --notificationIntervalMin 5 \
 --notificationType USER \
 --notificationEmailEnabled \
 --notificationUsername <username> \
 --output json \
 --projectId <project id>
```
* delete an Alert
```
atlas alerts settings delete <alertConfigId> 
```

## Respond to alerts
One can respond to alerts. You can view, acknowledge, and unacknowledge alerts. IF alert is not yet acknowledged, it will continue to send messages to the user until 
it is resolved. We can handle these alerts either in the Atlas Dashboard or with the Atlas CLI

* view alerts
```
atlas alerts list --output json
```
* acknowledge an alert
```
atlas alerts acknowledge <alertId> --comment <comment>
```
* Unacknowledge an alert
```
atlas alerts unacknowledge <alertId>
```

## Atlas Integrations

We can integrate with third party services like DataDog, Prometheus, etc. This third party monitoring tools allows us to have more functionalities to our systems. You will need the *ProjectOwner* or *OrganizationOwner* access to add them.

## Self managed monitoring

 To monitor a self managed deployment, MongoDB recommends the Cloud Manager tool to manage metrics. We can still make use of the third party integrations like Prometheus and Grafana. Howevver, they cannot connect directly to mongoDB. However the *Percona MongoDB Exporter* retrieves data from the deployment and then, Prometheus can be connected to it from which it can be connected to Grafana for visualizations. The permissions needed for Percona MongoDB Exporter is the *clusterMonitor* role. Refer to the docs for more information on this part, Installation and management of the utilities.

 ## Command Line Metrics
 Certain commands are run under the hood on the command line to give the metric monitor tools something to work with. Examples include
 * _serverStatus_: It is a diagnostic command that returns an overview of the current instance state. It is run at regular intervals by Percona and other metric monitors. Eg
 ```
db.runCommand(
   {
     serverStatus: 1
   }
)
 ```
 * _currentOp_: It is an administrative command that gives us info on the active operations. This is run by the metric monitor tools to identify slow operations, etc. Eg
 ```
 // To return a document that provides all currently active operations, run:

db.adminCommand(
   {
     currentOp: true,
     "$all": true
   }
)

 ```
 * _killOp_: Administrative command that can be used to terminate the slow operations. To kill an active operations, run:
```
db.adminCommand(
   {
     killOp: 1,
     op: <opid>,
     comment: <any>
   }
)
```
