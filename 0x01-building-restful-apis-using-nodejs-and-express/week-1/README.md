# Rest APIs - An Introduction

## API

API stands for application programming interface and is use to connect the client and serve sides of an application. They expose data safely from the servers in a way and manner that can be used easily and repeatedly by the client systems. Web API is the face of a web service, directly listening an responding to all the client requests

## Rest APIs

A client-server model is a model that helps in making web applications. A web application is a software that runs on a web server to fulfill client requests.
Rest APIs are used to view or modify resources on the server without performing any operation on the server

- Commonly applied to web services
- Consists of an assembly of interlinked resources
- Having a rest API makes a web service restful
- the user interface is separated from database services
- Devs can focus on only one saspectwhen develpoping the aplications
- It is independent of the underlying system
- Delivers data in recognizable formats like xml, json etc
- Can be implement useng any platform like PHP, python and node js
- Highly scalable and flexible
- Allows communication between server and client even if the client and server are developed using different technologies by means of http.
## Components of RESTful services
- **Resources**: 
    - Building blocks of a RESTful service
    - Can contain static or dynamic data
    - Are addressable by URLs
    - Can have multiple representations
- **REST verbs**:
    - Specifies an action to be performed on a specific resource/collection of resources
    - In the http request it is sent along with the header information and body
    - Examples include GET, POST, PUT, etc
- **Request Headers**:
    - An HTTP header that can be used in an HTTP request to provide information about the request context
    - eg *Accept* header indicates the allowed or preferred response formats
    - Can be used to 
        - Supply authentication credentials
        - Control caching
        - Get user agent/referrer information
    - Not all headers are request headers eg *Content type*

- **REST Body**:
    - Used to send or receive data via the REST API

- **Response status code**:
    - Used to indicate if a request was successful or not
    - Returns the type of error if it failed
    - Examples include
        - 200: ok
        - 404: not found (error)
        - 204: empty (success)

## Creating a simple REST service

```
const http = require('http')
const PORT = process.env.PORT || 4000
const server = https.createServer((request, response) => {
    response.writeHead(200, {
        "content-type": "text/plain"
    })
    response.end("Hello !!!")
})

server.lister(PORT, () => {
    console.log("Server is ready and listening at port", PORT)
})
server.on('error', (error) => {
    if (error.code === 'EADRINUSE') {
        console.log("Port already in use")
    }
})
```