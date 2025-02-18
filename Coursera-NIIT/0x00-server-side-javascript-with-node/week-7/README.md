# Test
Testing is crucial for any program or application that will be available for users and clients. Untested code will cause serious and huge losses for you and your industry/company. You can imagine the loss that could occur due to a glitch in a company handling transactions daily Hence regardless of purpose, size or complexity, all Node JS applications should be tested.

## Software Testing
Below shows a graph tree of the different software testing levels
### Static Testing
### Dynamic Testing
- White Box Testing
  - Unit/Component TEstingg
  - Integration Testing
- Blac Box Testing
  - System Testing
  - User Acceptance Testing
    - Alpha Testing
    - Beta Testing
## Test First Approach
- Started since 1990s. It involves writing tests and providing expected solutions or expected solutions for the tests and making sure that our codes conform to those tests
- it is divided into 
### Test Driven Development [TDD]
This avenue is for developers as it involves writing test cases in programming languages for expected code behaviour.
- Iterative in nature
- Focuses on creating unit test cases before developing actual code
- Uses the specifications, first the test is written describing how the code should behave
- combines programming, creating unit tests and refactoring.
- a cycle of testing, coding, refactoring
#### Advantages of TDD
  - Improves application quality
  - Improves code quality
  - Increases developer's productivity as less time is spent on debugging
  - Supports higher test coverage
  - helps developers to understand how a class/library works ie serves as makeshift documentation
  - Remove redundancy by refactoring the code
#### Limitations of TDD
  - Difficult to adopt
  - Leads to confusion among developers from where to start and what test to write
  - Unit tests are Significant and difficult to maintain as project size grows
  - Unit tests are written with or without TDD. The are tightly coupled to a particular code implementation and focus more on the function/method they're testing
#### Three Phases of TDD
- Create small tests that are bound to fail
- Correct the code and make it work
Example of TDD:
```
  let atm = {
    aba1 = 100000
  }
  let card = {
    cNo = '1234 5678 5678 5678',
    isValid = true,
    cBal = 100
  }
  let wAmt = 20;
  atm.withdraw(card, wAmt);
  assert.isEqual(atm.aBal, 99980)
```
### Behavioral Driven Development [BDD]
Here scenarios are written based on the expected behaviour of the application or program. Since these scenarios are written in plain English, both clients and stakeholders can collaborate on it for better output
  Exampl
  ATM
  When an account holder with a valid card withdraws cash
    when ATM has sufficient funds
        should decrease the ATM balance by withdrawn amount
        should return the card
In BDD, the focus is more on the user satisfaction and everything revolves around making that possible. 
#### Creating a BBD specification
- The behaviour of the code is specified as a user story
- the acceptance criteria of the user story are described in the terms of the scenarion
- The scenario of the form includes
  - Given ...
  - When ...
  - Then ...

## Mocha and Chai
### Mocha
- A feature rich JS test framework running on Node JS
- Used for asynchronous testing and runs serially and flexibly allowing for flexible and accurate reporting
Mocha functionalities and hooks include
  - **it()**: Define a single test
  - **describe()**: define a test block
  - **before()**: Run this block once before the first test in the describe block
  - **after**: Run this block once after the first test in the describe block
  - **beforeEach()**: Run this block before every test in the describe block
  - **afterEach()**: Run this block after every test in the describe block
### Chai
- An assertion library that helps in extending test frameworks
- Used mainly in comaring tests output and expected outcomes
- Provides functions and methods for accuracy
Chai provides three main functionalities
  - **assert**: `chai.assert;`
  - **expect**: `chai.expect`
  - **should**: `chai.should`
Installation of mocha and chai can be done using npm
`npm install mocha chai --save-dev`

## Syntax for testing
```
const expect = require('chai').expect
describe("Test title", () => {
    describe("A nested test title", () => { // A test can be nested

        it("Expected case description", () => {
            expect(func(p1, p2, ...)).to.equal(expected outcome)
        })
    })
})
```
