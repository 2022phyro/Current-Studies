# Asynchronous Programming
JavaScript and by extension Node JS is a single threaded language which means that it has only one memory hea and one call stack. That means once a line of code enters the call stack, it is executed and removed at once because there is only one call stack, similarly, if there are multiple calls, they would have to wait for each other sequentially before it is processed. Eg consider this program
```
console.log("Multiplication")
const multiply = (a, b) => {
    return a * b;
}
console.log(`3 x 4 = ${multiply(3, 4)}`)
```
Javascript is a top to bottom language which means that the code will be executed linearly. Hence, the `console.log("multiplication")` will pushed to the call stack and must be finished before `const multiply = ...` etc.
Since it is single threaded, it cannot spawn other threads or call stacks to run in parallel. So in order to prevent long and intensive operations from blocking the thread, we have : 
<br>
## Async programming
- Allows us to run functions withoult waitiong for another function is completed
- A parallel programming that allows a work unit to run separately from the main thread
- Begins an action and when it is completed, it is passed back to the call back function or whenever it is needed in the stack
- Non linear
- Can be achieved in Node JS usin
    - Callbacks
    - Promises
    - `Async/Await`
     <br>
|**Blocking Operations**|**Non Blocking Operations**|
|:---|:---|
|Both occurs when JavaScript is executed in the Node JS environment||
|It's when the execution must wait for a non JavaScript task to complete|Does not wait for the non JavaScript operation completes|
|It usually refers to operations like `file reading and writing`, `network calls`, `database reads`||
|Usually referred to as I/O Operations||

## Node JS Architecture in a nutshell
Node.js uses single threaded event loop architecture, to handle multiple concurrent clients. The Node.js processing model, is based on the java script, event based model, along with the java script callback mechanism. Incoming requests can be blocking, complex or non blocking, simple, depending upon the tasks, that a user wants to perform in a web application. The Node.js server, is a server side platform, that takes requests from users, processes those requests, and returns responses to the corresponding users. The event queue in the Node.js server, stores incoming client requests, and passes those requests, one by one into the event loop. The thread pool, consists of all worker threads available, for carrying out some tasks, that might be required to fulfill, client requests. The event loop indefinitely receives requests, and processes them, and then returns responses to the corresponding clients. External resources are required for blocking client requests, these resources can be used for computation, and data storage. The requests are sent to the note application, these requests can be non blocking, or blocking. Node.js retrieves the incoming requests, and adds those requests to the event queue, the requests are then passed one by one through the event loop. Node checks, if the requests are simple enough, so that they don't require any external resources. The event loop processes simple, non blocking requests, and returns the responses, for complex blocking operations. A thread from the worker pool, is assigned to process these complex requests. This thread is responsible for completing a particular blocking request, by accessing external resources, such as the database and the file system

## Different ways to achieve Asynchronous Programming in Node JS
### Callbacks
Callbacks are functions passed into another function as a an argumentand are to be invoked immediately or after the completion of a certain task in the function. A common example is the setTimeout function usually used to delay the execution of a piece of code or function by a particular time
Eg consider this piece of code
```
console.log("Multiplication")
const multiply = (a, b, callback) => {
    setTimeout(() => {
        const product = a * b;
        callback(product);
    }, 2000);
}
multiply(4, 50, (result) => {
    console.log("The product is: ", result);
})
console.log("End of Program")
```
Here we see the callback for printing the result is an anonymous function.
The first line runs when we call the multiply, then while the callback is pushed to the event loop and ***waits*** the second `console.log("End of program")` is run. Once the result is available, the callback is called and the product is printed out for us
<br>
*Error First Callback*
In this method, your callback takes in an error argument and a result argument.
This is a form of error handling and allow us to detect when there was an error before it reached the callback hence in the code, above it is modified thus:
```
console.log("Multiplication")
const multiply = (a, b, callback) => {
    setTimeout(() => {
        const product = a * b;
        callback(product);
    }, 2000);
}
multiply(4, 50, (error, result) => {
    if (error) {
        return console.log(error)
    }
    console.log("The product is: ", result);
})
console.log("End of Program")

```
Hence in this case to detect an error in our program, we simply pass the error paramater or set it to `undefined`.

## Promises
**Callback hell** : When the code has a lot of callbacks making it unreadable.
- A mistake affecting one function affects all the other functions
 So why promises? and not callbacks?

 Callbacks are:
    - low level building blocks of async programming in Node JS
    - They're not developer friendly
    - They're more comples anc verbose compared to the level of complexity they're trying to achieve
    - Has fragile and risky error management
 <br>
**So about Promises**:
- They're part of the ECMAScript 2015 standard or ES6
- Been available since node 4
-[[<65;21;27M]] Carry the status and and eventual result of an async operation
- Easily chained to implement serial execution flows
- Simplifies asynchronous code
- Makes code more readable and prevents callback hell scenarios

A promise has four states
__Pending__: When it is still being executed
__Fulfilled__ : When it is successful
__Rejected__: When it fails
__Settled__: When it is either fulfilled or rejected
```
let promiseObj = new Promise((resolve, reject) => {
    ...
})
```
The Promise constructor has a callback with two parameters
    - resolve
        returned if the operation succeed
    - reject
        returned if the operation fails
The callback returns an object that would hold a value and is executed immediately
- Helps with a particular kind of async programming, the kins involving functions and methods or other actions that return a single object asynchronousl
- Sets up a sequence of async operations to work correctly
- Provides us with better structured and more elegant code
```
asyncOperation(arg, (err, result) => {
    if (err) {
        //handle the error
    }
    // handle the code
})
asyncPromise(arg)
    .then(onFulfilled => {
        // do stuff if successful
    }, (onRejected => {
        // handle the error
    }))
```
The onFulfilled and onRejected are callbacks to handle the promise upon it's success or fails

```
const multiply = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            return reject('number is negative')
        }
        setTimeout(() => {
            const product = a * b;
            resolve(product);

        }, 2000);
        
    })
}
```

**Promise Chaining**:
Promise chaining allows us to pass the results of one promise to another using the .then and .catch methods of promise to control it and pass errors and return values across the promises

## Async/Await
Async/await refers to async functions and await expressions. this remove the problems of having too many `.then` functions by providing us with a cleaner linear syntax. Basically, an async function is a function that handles a promise or asynchronous code block and an await expression is an expression that evaluates to a Promise. using outr previous examples to call the multiply function
```
// With promise
multiply(3, 4).then(ans => {
    console.log("The answer is", ans)}, err => 
    console.error(err))

with await
sol = async () => {
    return console.log(await multiply(3,4))
}

```
Async functions also return a promise
