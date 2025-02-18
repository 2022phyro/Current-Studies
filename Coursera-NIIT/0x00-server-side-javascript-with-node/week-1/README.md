# Introduction to Node JS

## Quick facts
- Open source server side platform built on Google Chrome V* engine
- A way to run JS outside a browser
- Written in JS and can be run on any os with the Node JS runtime
- Has a rich library that simplifies web and application development

## Node JS Components
- Node Cli:  ⇒ Command line Interface
- Node Package Manager (*NPM*):  ⇒ For installing packages and libraries
- Node Core Modules:  ⇒ Functionality available to us at runtime like fs (*file system*), http, etc
- Third-Party Modules:  ⇒ To add extra functionality like mongoose  (*for interfacing with mongodb database*) etc
- package.json       ⇒ To manage our modules 

## Advantages:
- Non blocking I/O Call Module
- Single Threaded
- Suits both front and backend
- Rich ecosystem


## Cons
- Not nice for cpu intensive operations



## Terms

### variable
containers for storing data
declared using `var`, `let` and `const` keywords
 
*var -* `var name = 'Afam'`
<br>
- Has global scope
- Can be redeclared as well as reassigned

*let -* `let name = 'Afam'`
<br>
- Has block scope
- Can be reassigned
- CANNOT be redeclared

*const -* `const name = 'Afam'`
<br>
- Has block scope
- CANNOT BE reassigned OR redeclared (`read-only`)


### Hoisting
- Process where interpreter moves declaration to the top of their scope before execution occurs
- Works with variables, allowing it to be used before being declared or initialized
- Only hoists declarations not initializations
- Initializion doesn't exist until the code is executed
- eg
```
console.log(name); // Undefined because not yet declared . hoisted by var
var name; // Declaration
name = 'Jane'; // Initialization
console.log(name); // Now returns Jane
```
| **Operators** | **Description** |
|:--------------:|:---------------:|
| *Arithmetic*   | `+  -  /  *  %  **` |
| *Assignment*   | `=  +=  -=  *=  /=  %=  **=` |
| *Logical*      | `&&  ||  !` |
| *Unary*        | `delete  void  typeof` |
| *Comma*        | `,` |
| *Relational*   | `in  instanceof  <  >  <=  >=` |
| *Ternary*      | `(condition ? if True : if False)` |
| *Equality*     | `==  !=  ===  !==` |


### Loops
- Ways to do a single task repeatedly
- Have different kind

*LOOP STATEMENTS IN JAVASCRIPT*
`for` statement
`do...while` statement
`while` statement
`labeled` statement
`for...in` statement
`for...of` statement
*LOOP COTROL STATEMENTS*
- for controlling the flow
`break`
`continue `

