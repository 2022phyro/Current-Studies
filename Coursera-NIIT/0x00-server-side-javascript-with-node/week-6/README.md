# Error Handling
Exceptions are a part of our every day life. IF we're using a washing machiine, it can break down, get stuck or whatever. These are referred to as exceptions, behaviour not accounted for and not expected in our codes. Exceptions give rise to errosrs and bugs

## Errors
These are problems that occur in a code and we have two types of errors in Node JS applications they are
### Operational errors:
- REpresented runtime errors caused by code written accurately. They are not bugs.
- Examples include
  - Connection Errors
  - Request Timeout
  - Out of memory
  - Server returns 500
  - Standard JavaScript errors include EvalError, SyntaxError, RangeError, TypeError, etc They're 
  - System errors are triggered by underlying os constraints eg opening a file that doesn't exist
  - User defined errors are triggered by application code
  - Assertion errors triggered when NOde JS detects an exceptional lovig violation
### Logical errors:
- They're bugs in the program
- Difficult to detect as the runtime doen't spot it and it's up to the developer to identify them.
- Examples include
  - Calling an async function without callback
  - not resolving a promise
  - Trying to read the property of undefined

## Error handling
THis is done through exceptions. Unwanted events that occur  during the execution of the program. Handling exceptions prevent these errors from crashing our code and is chieefly done through the `try-catch-finally` block
```
try {
    // piece of code to be executed
} catch (err) {
  // piece of code to be executed in case of an exception
} finally {
  //this block is optional. Piece of code to be executed after everything whether an error was encountered or not
}
```
Errors can be created using the Error constructor and raised using the throw mechanism
```
const ourError = new Error("This is a custom error")
throw ourError; // Raising our error causing an exception
```
## Handle Errors in Synchronous programs
The first basic way in handling errors synchronously is using the `try-catch-finally` block
### Custom Exceptions
Custom exceptions inherit from the default `Error` class. Eg take this error for age
```
class AgeError extends Error{
    constructor(msg) {
        super(msg)
        this.name = this.constructor.name
    }
}
```
## Handle Errors in Asynchronous Programs
This can be done in many ways. The first of which is 
**Error-first callbacks**: Take the following example for this data read function
```
const dataRead = (filename) => {
  fs.readFile(filename, (err, data) => {
    if (err) {
      return console.log("There was an error reading the file!", err)}
      console.log(data)
  })
}
```
**Promises**: Promises make use of the `.catch` block to handle errors
**Async functions**: Functions with the `async/await` syntax can make use of the `try-catch-finally` blocks
