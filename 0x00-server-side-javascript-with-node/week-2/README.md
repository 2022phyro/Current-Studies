# Week 2: Diving in

## Functions
- Resuable blocks of code which is under a specific name and can be invoked
- Works like procedures that hold sets of stored instructions
- Can hold parameters which are like placeholders for values that will be passed into the function and be used by it
- Can be assigned to a variable and be called by it anonymously without needing to specify its name
- Can also serve as parameters to other functions ***callbacks***
### Different ways of declaring functions

1. `function functionName(parameter1, parameter, ...) {
    // function code
}`
2. `function functionName() {
    // function code
}`
3. ` const arrowFunction = () => {
    // function code
}`
4. `const arrowFunctionWithParameters = (parameter1, parameter2, ...) => {
    // function code
}`
5. `function functionWithCallBackAsParameter(() => {}, parameter2, ...) {
    // function code
}`
### How to call a function
A function is called by specifying its name and then passing the arguments if there are any parameters.
A function returns a value of _undefined_. To make it return an actual value, use the **return** statement to make it do so
<br>
Eg for this function that returns a sum
`function sum(a, b ) {
    return a + b 
}` 

##  Arrays
These act as containers for storing different types of data in Node JS like numbers, strings, etc.
- Enables sequential storage of data
- Stores variable data like number, string and even other arrays
- Its elements are accessed using indexing
- Has variable length hence can store variable number of values
- An empty array can be crated that can be filled up layer
### Array operations
These are various operations that can be appliend on different data structures or specifically array data structures
| Operation    | Description                                                   | Example                   |
|--------------|---------------------------------------------------------------|---------------------------|
| Aggregation  | Combines the array items to one final solution                | `reduce()`               |
| Traversal    | Iterate through each element of the array                     | `forEach()`              |
| Modification | Return a new array modified in a particular way or by constraints | `map()`, `filter()`, `slice()` |
| Removal      | Removes elements from the array                               | `pop()`, `shift()`, `splice()` |
| Insertion    | Adds elements to the array                                    | `push()`, `unshift()`    |
| Search       | Find items or values in the array and/or check existence      | `find()`, `indexOf()`    |

Array operations can be carried out on the same array by way of chaining. eg to pass the solutions of a filter function to a map function to transform it and then to pass that to reduce it , we can chain it together
Eg.
```//Required: to filter all values greater than 10 from the array and sum their squares
const array = [1, 2, 3, 11, 5, 15, 3, 12, 13, 10, 7]
const solution = array.filter((i) => i > 10)
                    .map((i) => i * i)
                    .reduce((a, b) => a + b, 0)
```
In this case, the methods pass their results to one another like a pipe allowing for simplicity               
