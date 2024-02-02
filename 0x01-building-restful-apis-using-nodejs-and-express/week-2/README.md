# Express

- A fast unopinionated, minimal and flexible Node Js web application framework
- is Middleware based and funnels incoming requests through a chain of middleware
- Single threaded, asynchronous and based on a Node js middleware module known as connect
- Specifically designed for SPA clients and multiage and hybrid applications
- Provides a thin layer of fundamental web application features
- Allows for a flexible and robust API

## Advantages

- Easy to serve static files
- Easy configuration and customization
- Fast and easy development of web application on Node JS
- Support for Routing in a REST API
- Highly modularized backend

## Minimalist express server

```
const express = require('express');
const app = express()
const PORT = 9000;
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error in server setup")
    }
    console.log("Server listening on port", PORT)
})
```

# Defining Routes

Routes determine how an application will respond to a client's request and can have one or more handler functions. to define a route in express

```
app.METHOD(PATH, HANDLER) // method is the REST verb like 'get', 'post', 'delete'
//path is the url path
//handler is the function to handle the request on that path
```

# Route parameters

- Used to structure web pages by information
- Named url segments used to capture vaules specified at their positionin the url
- Captured values are populated in the`req.params` object
- Example:`/api/todos/:todoId/`

# Route handlers

- Callback functions that are executed when a matching request type is found on the route
- The standard protocol for a client and server to communicate is HTTP
- Example :

```
app.get('/api/todos/users', (req, res) => {
    res.send('Hello from all users!')
})
```

## Node.js REST Application Structure

- **Routes**:

  - Forward the request to appropriate controller functions
  - To make the code modular use the command

  ```
  const express = require('express')
  const router = express.Router()
  ```

  - Route handlers can be defined separately ina .js file instead of an app.js file
- **Controller**:

  - Callback functions passed to the router methods
- **Service Layer**:

  - Handles the business logic of the application
- **DAO Layer**:

  - Used to perform operations on the data resource

## Middleware

- A software with functions that has access to both the request and the response object
- Executed during the request and the response cycle
- Can be used for
  - Log user informations
  - Protect a route
  - Execute code and make changes to the request and respose objects
  - End the request-response cycle
  - Call the next middleware in the stack
- Includes application level, router level and error handling functionalities
- Can be user built or a third party module
  Middleware in express is usually a chain of functions, passing control from one function to another via the`next` function. The chain ends if the next() method function in any part of the series is not called and the request will be left hanging if the request-response cycle doesn't end

## OpenAPI Specification and Documentation

Formerly known as **Swagger**, it's an API description format for REST APIs. It allows you to describe the entire API including

- available endpoints and methods
- request body, route and other parameters required for each operation
- Authentication methods
- Contact information, license, terms of use and other information
- Can be written in Yaml or JSON

### Swagger

- A set of open source tools built around the**OpenAPI** specification
- An interface description language for describing RESTful APIs expressed using JSON
- It drives API development in multiple ways using different tools
- Examples include :
  - **Swagger UI:** Renders OpenAPI specs as an Interactive API documentation
  - **Swagger Editor:** A browser based editor
  - **Swagger Codegen:** Used to generate client libraries
