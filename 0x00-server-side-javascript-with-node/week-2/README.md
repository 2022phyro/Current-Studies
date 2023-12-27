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
