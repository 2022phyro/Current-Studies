# Self-Managed Database Security

## Authentication
* verify the identity of users accessing the database. Users here refers to
  * Human like db administrators and devs
  * softwares and applications
  * Other nodes in the same database system

* Creates login credentials for the users who need to log in to the database
* Can be managed either in the database itself, or by leveraging integrations and solutions

### Enabling authentication on a self managed mongoDB deployment
* MongoDB supports many authentication mechanisms both within the database and third party ntegrations
* Default authentication mechanism in MongoDb is SCRAM (Salted Challenge, Response Authentication, Mechanism)
* SCRAM verifies a user's identity by exchanging a challenge and response protected by a cryptographic key

To enable authentication
* On the config file enable authentication in the security section
```
security
    authorization: enabled
```
* For a system where we have been connecting due to `localhost exception` since, we create a new user, give him the admin roles and exit, then we authenticate as that user, log in to that database and create other users. The role for a super admin is `userAdminAnyDatabase`

## Authorization
* Determines the specific permissions a user has on the database
* RBAC (Role Based Access Control) is widely used as a form of authorization in MongoDB
* RBAC helps protect unauthorized data access and modification


### Establishing Authorization for a self managed mongoDB deployment

* RBAC in MongoDB consists of assigning or removing built in roles to specific users.
* Built in roles are predefined sets of privileged actions on database resources. They provide various levels of access in the system. Examples include
  * Database user roles like `read`, `readWrite`
  * Database administration roles like `dbAdmin`, `dbOwner`
  etc

* Roles can be assigned during creation or by updating existing users. Eg see how to create a user with a role, as well as revoke a role from a user

```javascript
// create a new user with roles on a database
db.createUser(
  {
    user: "analystUser",
    pwd: passwordPrompt(),
    roles: [
      { role: "read", db: "sample_analytics" },
    ]
  }

// revoke a user role
db.revokeRolesFromUser(
    "financeUser",
    [
      { role: "read", db: "sample_training" }
    ]
)
```

## Auditing

* monitoring and recording changes to data and database configurations
* Needed for
  * Complying with regulatory requirements
  * Supporting the analysis of a security incidents

## Security auditing in MongoDB

* Audit output can be found in three different destinations
  * syslog - JSON format (not available for Windows)
  * console - JSON format
  * file - JSON /BSON format
* The output destination can be set either using the `--auditDestination` command line option for mongod or setting *auditLog.destination* option in the configuration file. Eg
```file
# for setting the auditLog in the config file
auditLog:
  destination: file
  format: JSON
  path: /var/log/mongodb/auditLog.json
```

## Introduction to Encryption concepts

* Process of encodind data to ensure only permitted users can access

### Transport (or Network) Encryption

* Encrypts data transmitted over a network
* Secures communication btw clents and servers
* Protects data from being tampered with while it is being transmitted.
* Examples include
  * *TLS (Transport Layer Security):*
    * Ensures secure data transfer over the internet
    * MongDB supports TLS to encrypt all traffic

### Encryption at rest

* Safeguards data in storage
* Encrypts data files on the server and backups
* Limited by
    * *Key management:* If the key is lost or stolen, the data may become lost or stolen
    * *Insider threats:* Insiders can still compromise or tamper the data
    * *Data in memory:* Data that is decrypted and loaded into memory is still prone to attacks

### In-use encryption

* Protects data when it leaves the client application
* Prevents unauthorized access by users or other applications running on the server
* Keeps data encrypted on the server once it's loaded into memory
* Provides additional layer of security to protect sensitive data
* Examples include:
* Encrypts data in the client before it's sent to the database
* Protects against insider attacks
 * *Client-Side Field Level Encryption (CSFLE)*
    * Data encrypted and decrypted on the client
    * Unencrypted data is never exposed on the server
    * Encryption keys are stored by an external key management system and accessed by the client when needed.
    * Selects individual fields within a document to encrypt
    * Ensures the fields containing sensitive data aren't exposed at any point.
    * Protects critical and sensitive fields

### Encryption in self managed MongoDB deployments

* Transport Encryption
  * MongoDB supports TLS which encrypts communication between clients and the server.
  * The server must have a valid TLS certificate that verifies the server's identity
  * Can use certificates issued by a certificate authority or self signed certificate. It's recommended to use certificates signed by a trusted certificate authority
  * Always enable TLS
* Encryption at Rest
  * MongoDB Enterprise offers Encrypted Storage Engine
    * A native encryption engine to handle encryption at rest
    * Available in MongoDB Enterprise only
* In use Encryption
  * Handled by CSFLE
  * Available in both Community and Enterprise but in the Community, you have to specify the  encryption logic, while in Enterprise, it is enabled natively.and defines encryption fields using JSON schema. It handles the encryption and decryption automatically

## Enabling Network Encryption for a Self Managed MongoDB Deployment

* TLS is enabled by default in Atals but not in self-managed deployments
* You must have a TLS certificate to enable it.
* We first change the configuration file to make use of TLS
```config
net:
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/tls/mongodb.pem
```
* Then in our connection string, we specify to use TLS, and then specify the path to certificate file. `mongosh mongodb://.../?tls=<true>&lsCAFile=<location of our certificate file>`
```
mongosh "mongodb://mongod0.replset.com/?tls=true&tlsCAFile=/etc/tls/root-ca.pem"
```
