# Authentication and Authorization

Authentication is a process that scrutinizes the user at the login level. It helps identify the user
Authorization is the process of specifying access rights/priveleges to resources

- Authentication is usually server based. This is because client based authentication is stateless which meant the user had to always log in before each request making it cumbersome and tiring. IN server based authentication, the user logs in and a session is created for him which remains authenticated until he logs out or it expires

## JWT [Json Web Token]

- A standard for token based authentication
- AN open industry standard RFC 7519 method
- Represents claims securely between two parties
- Works across different programming languages
- Can be passed around easily

### Why JWT?

- Provides ease of client side processing
- Can be transmitted faster due to its small size
- Can be transmitted securely using public/private keys
- The payload of a JWT provides complete information to reduce database querying

### How JWT works

 **Token based authentication**:

- User signs in and authenticate using the server's login system
- The server creates a JWT and sends it to the user
- The user will subsequently pass the JWT along with the API call
- The server is configured to verify that the incoming token was created by it and can thus be used to access the resources
- The server verifies if the JWT is valid and uses it to verify if the API call is coming from an authenticated user and then allows or restricts access to the resources

#### Structure of a JWT

 A JWT consists of three strings separated by a `.` These are:

- **Header**:
the header contains the type of token and the signing algorithm being used to encrypt it
- eg

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

- **Payload**:
The payload carries the bulk of the JWT aka the _JWT claims_. Claims are statements about an entity and additional data. There are three types of claims
  - Registered claims eg  `iss`, `sub`
  - Public
  - Private
example is

```json
{
    "sub": "98765",
    "name": "John"
}
```

- **Signature**:
The signature is a hash of the header, payload and the secret

- JWT work in .NET, Python, Node.js, Java, PHP, Ruby, Go, JavaScript and Haskell
- In the payload, you can have multiple claims eg:
  - iss: issuer of the token
  - sub: the subject of the token
  - aud: the audience of the token
  - exp: the expiration in NumericDate value
  - nbf: the time before which the JWT must not be accepted for processing
  - iat: the time when the JWT was issued
  - jti: the unique identifier for the JWT

## Open Authorization [OAuth2]

- OAuth2 is a standard to allow websites or applications to access a set of resources
- Is an authorization protocol that authorizes users of an application using external servers like Facebook, Gmail, Github etc
- It is NOT an authentication protocol
- Provides authorization for
  - Desktop applications
  - Web applications
  - Mobile applications

### Components of OAuth2

- **Client:** the user trying to log in or access the process the resources
- **Resource Server:** the sapplication the client wants to log into and access
- **Authorization Server:** The external application that authenticates the user's identity eg github, google

### How OAuth2 works

- Client requests access from the authentication server, providing the login credentials
- The authentication server verifies the credentials and gives the client a secure token
- The client uses the token to access the resource server
- After verifying the token's validiy, the resource server allows access to the resources
