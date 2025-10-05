# Getting started with Clarity

## Introduction

Clarity is a functional programming language that is designed for smart contracts. It is a decidable language, meaning that the outcome of executing a Clarity program can be determined before execution. This makes it easier to reason about the behavior of smart contracts and reduces the risk of bugs and vulnerabilities.
Clarity is also designed to be predictable and secure, with features such as static typing, first-class functions, and a focus on simplicity and readability.

## Key Features of Clarity
* **Decidability**: Clarity is a decidable language, meaning that the outcome of executing a Clarity program can be determined before execution. This makes it easier to reason about the behavior of smart contracts and reduces the risk of bugs and vulnerabilities.
* **Predictability**: Clarity is designed to be predictable and secure, with features such as static typing, first-class functions, and a focus on simplicity and readability.
* **Interoperability**: Clarity is designed to be interoperable with other blockchain platforms, allowing developers to create smart contracts that can interact with other blockchain networks.
* **On-chain execution**: Clarity smart contracts are executed on-chain, meaning that they are stored and executed on the blockchain itself. This provides a high level of security and transparency, as all transactions and contract executions are recorded on the blockchain.
* **Secure by design**: Clarity is designed to be secure, with features such as static typing, first-class functions, and a focus on simplicity and readability. This makes it easier to write secure smart contracts and reduces the risk of vulnerabilities.
* **No compiler bugs**: Clarity is an interpreted language, meaning that it is executed directly by the blockchain without the need for a compiler. This eliminates the risk of compiler bugs and ensures that the behavior of smart contracts is consistent and predictable.

## Getting Started with Clarity

### Syntax
Clarity uses a Lisp-like syntax, with parentheses used to denote function calls and expressions. Here is an example of a simple Clarity program that defines a function to add two numbers:
```clarity
(define-public (add a b)
  (+ a b))
;; This is a comment

(add 2 3) ;; This will return 5
```

* Function names are called, then parameters are passed in.
* Comments are denoted by `;;`.
* Space delineates expressions, so new lines can be used to improve readability.


### Data Types
Clarity supports three kinds of data types: primitives, sequences, and composite.

#### Primitive Data Types:

* `int`: Represents integer values.
    * Example: `42`, `-7`
    * Ranges from -2^127 + 1 to 2^127 - 1

* `uint`: Represents unsigned integer values (non-negative)
    * Example: `0`, `100`
    * Ranges from 0 to 2^128 - 1

* Both int and uint support basic arithmetic operations like `+`, `-`, `*`, and `/` as well as comparison operations like `=`, `<`, `>`, `<=`, and `>=`.

* `bool`: Represents boolean values.
    * Example: `true`, `false`
    * Works with logical operations like `and`, `or`, and `not`.

* `principal`: Represents a blockchain address or identity. It has an unclosed single quote (`'`) prefix.
    * Principals can either be _standard principles_ or _contract principals_.
        * Standard principals represent user accounts.
        * Example: `'SP2J8H4H3H4H3H4`
        * Contract principals represent smart contracts.
        * Example: `'SP2J8H4H3H4H3H4.my-contract`

#### Sequences
These data types hold sequences of data. They can be buffers, strings or lists
* `buffer`: Represents a sequence of bytes. Buffers are immutable and have a fixed size.
    * Example: `(buffer 0x48656c6c6f)` represents the byte sequence for the string "Hello".
    * Buffers support operations like concatenation and slicing.*
* `string-ascii`: Represents a sequence of ASCII characters.
    * Example: `"Hello, World!"`
    * Strings support operations like concatenation, substring extraction, and length calculation.
    * Strings can also be utf-8 encoded using `string-utf8`.
    * example of the above: `u"Hello, 世界!"`
* `lists`: Represents an ordered collection of elements of the same type.
    * Example: `(list int)` represents a list of integers.
    * Lists support operations like adding and removing elements, as well as accessing elements by index.

* Several methods exist to manipulate sequences. Some of them include:
    * `len`: Returns the length of a sequence.
    * `concat`: Concatenates two sequences.
    * `slice`: Extracts a subsequence from a sequence.
    * `get`: Retrieves an element from a list by its index.
    * `map`: Applies a function to each element in a list and returns a new list with the results.
    * `fold`: Reduces a list to a single value by applying a function to each element and an accumulator.
    * `element-at`: Retrieves an element from a sequence at a specified index. Etc

#### Composite Data Types
These are complex data types in clarity. They include: tuples, optionals, and responses.
* `tuples`: Represents a collection of named fields, where each field can have a different type.
    * Example: `(tuple (name string-ascii) (age int))` represents a tuple with two fields: `name` (a string) and `age` (an integer).
    * Tuples support operations like field access and field updates.
    * We use curly braces `{}` to create tuples. Tuples seem similar to objects in JavaScript or dictionaries in Python.
    * Example of creating a tuple:
    ```clarity
    (define-personal-data user1 {name: "Alice", age: 30})
    ```
    * Tuple functions  include:
        * `get`: Retrieves the value of a specified field in a tuple.
        * `set`: Updates the value of a specified field in a tuple, returning a new tuple with the updated value.
        * `merge`: Combines two tuples into a single tuple, with fields from the second tuple overwriting fields from the first tuple if they have the same name.
* `optionals`: Represents a value that may or may not be present.
    * Example: `(optional int)` represents an optional integer value.
    * Optionals can be either `some` (indicating that a value is present) or `none` (indicating that no value is present).
    * Example of creating an optional value:
    ```clarity
    (define-personal-data user2 (some 42)) ;; An optional with a value
    (define-personal-data user3 none) ;; An optional without a value
    ```
    * Functions usually return optionals to indicate the possibility of failure or absence of a value.
    * These functions are used to work with optionals:
        * `is-some`: Checks if an optional contains a value.
        * `is-none`: Checks if an optional is empty.
        * `unwrap`: Retrieves the value from an optional, assuming it is `some`. (will throw an error if it's `none`)
        * `unwrap!`: Similar to `unwrap`, but allows specifying a custom error message if the optional is `none`.
* `responses`: Represents the result of an operation that can either succeed or fail.
    * Example: `(response int string-ascii)` represents a response that can either be an integer (indicating success) or a string (indicating failure).
    * Responses can be either `ok` (indicating success) or `err` (indicating failure).
    * Example of creating a response value:
    ```clarity
    (define-personal-data result1 (ok 42)) ;; A successful response with a value
    (define-personal-data result2 (err "An error occurred")) ;; A failed response
    ```

### Blockchain Keywords
Clarity has several bult in blockchain keywords that allow interaction with the blockchain. Some of these include:
* `block-height`: Returns the current block height of the blockchain.
* `tx-sender`: Returns the principal of the transaction sender.
* `contract-caller`: Returns the principal of the contract caller.
* `get-block-info`: Retrieves information about a specific block, such as its timestamp and miner.
* `get-balance`: Retrieves the balance of a specific principal.
* `stx-transfer?`: Transfers STX tokens from one principal to another, returning a response indicating success or failure.
*  `burn-block-height`: Returns the block height at which the current contract was deployed.
* `get-contract-owner`: Returns the principal of the contract owner.
* `print`: Logs a message to the blockchain's event log.

### Storing Data.
Data members are private but not hidden. They can be accessed by anyone who can read the blockchain. Data members are mutable, meaning they can be changed after they are created. Hence we shouldn't store critical data on-chain. Data can be stored in three ways: constants, variables, and maps.
* `constants`: These are immutable values that are defined using the `define-constant` keyword. Constants can be of any data type and are typically used to store values that do not change, such as configuration settings or fixed parameters.
    * Example of defining a constant:
    ```clarity
    (define-constant MAX-SUPPLY 21000000)
    ```
    * They're immutable, so they cannot be changed after they are defined.
    * Constants are evaluated at run time, meaning their values are determined when the contract is executed.
* `variables`: These are mutable values that are defined using the `define-data-var` keyword. Variables can be of any data type and are typically used to store values that may change over time, such as user balances or contract state.
    * Example of defining a variable:
    ```clarity
    (define-data-var user-balance int 0)
    ```
    * Variables can be updated using the `set!` keyword. or using `var-set!` function.
    * It can also be retrieved using the `var-get` function.
* `Maps`: These are key-value pairs that are defined using the `define-map` keyword. Maps can be used to store collections of related data, such as user profiles or transaction histories.
    * Example of defining a map:
    ```clarity
    (define-map user-profiles {user-id: int} {name: string-ascii, age: int})
    ```
    * Maps can be updated using the `map-set` function, which takes a key and a value as arguments.
    * Maps can be retrieved using the `map-get` function, which takes a key as an argument and returns the corresponding value.
    * Maps can be deleted using the `map-delete` function, which takes a key as an argument and removes the corresponding key-value pair from the map. We also have the `map-insert` function for addning new pairs to the map. It won't update an already existing key.

### Functions

Functions in Clarity are defined using the `define-public` or `define-private` keywords. Public functions can be called by anyone, while private functions can only be called by other functions within the same contract. They are used to encapsulate logic and perform operations on data. Functions can be public, private or read-only.

* `Public functions`: These are functions that can be called by anyone, including external users and other contracts. Public functions are defined using the `define-public` keyword and can modify the contract's state.
    * Function signature is thus
    ```clarity
    (define-public (function-name (param1-name param1-type) (param2-name param2-type) ...)
      ;; function body
    )
    ```
    * Example of defining a public function:
    ```clarity
    (define-public (transfer sender recipient amount)
      (let ((sender-balance (var-get user-balance sender))
            (recipient-balance (var-get user-balance recipient)))
        (if (>= sender-balance amount)
            (begin
              (var-set user-balance sender (- sender-balance amount))
              (var-set user-balance recipient (+ recipient-balance amount))
              (ok true))
            (err "Insufficient balance"))))
    ```
    * Larger functions use the `begin` keyword to group multiple expressions together.
* `Private functions`: These are functions that can only be called by other functions within the same contract. Private functions are defined using the `define-private` keyword and cannot modify the contract's state.
    * Function signature is thus
    ```clarity
    (define-private (function-name (param1-name param1-type) (param2-name param2-type) ...)
      ;; function body
    )
    ```
    * Example of defining a private function:
    ```clarity
    (define-private (calculate-fee amount)
      (/ amount 100)) ;; 1% fee
    ```
    * function calls get precedence over other expressions, so we use parentheses to ensure the correct order of evaluation.
    * Private functions are typically used to encapsulate logic that is not intended to be exposed to external users or other contracts.
* function calls will get rolled back in the event of an error. This means that if a function call fails, any changes made to the contract's state during the function call will be reverted.
* `Read-only functions`: These are functions that can be called by anyone, but they do not modify the contract's state. Read-only functions are defined using the `define-read-only` keyword and are typically used to retrieve data from the contract. They don't incur gas fees .
    * Function signature is thus
    ```clarity
    (define-read-only (function-name (param1-name param1-type) (param2-name param2-type) ...)
      ;; function body
    )
    ```
    * Example of defining a read-only function:
    ```clarity
    (define-read-only (get-balance user)
      (var-get user-balance user))
    ```
    * Read-only functions can be called without incurring transaction fees, making them a cost-effective way to retrieve data from the contract.

### Control Flow and Error Handling
Clarity provides several control flow constructs to manage the execution of code based on certain conditions. These include `if`, `cond`, and `match`, as well as error handling mechanisms using `try!`, `unwrap!`, and `asserts!`.

* `if`: This construct allows you to execute different code blocks based on a boolean condition. It has the following syntax:
    ```clarity
    (if condition
        then-expression
        else-expression)
    ```
    * Example:
    ```clarity
    (define-public (check-balance user amount)
      (let ((balance (var-get user-balance user)))
        (if (>= balance amount)
            (ok true)
            (err "Insufficient balance"))))
    ```
* `cond`: This construct allows you to evaluate multiple conditions in sequence and execute the corresponding code block for the first condition that evaluates to true. It has the following syntax:
    ```clarity
    (cond
        (condition1 expression1)
        (condition2 expression2)
        ...
        (else default-expression))
    ```
    * Example:
    ```clarity
    (define-public (get-user-status user)
      (let ((age (var-get user-age user)))
        (cond
            ((< age 18) "Minor")
            ((< age 65) "Adult")
            (else "Senior"))))
    ```
* `try!`: This construct is used to handle errors in a more controlled manner. It allows you to attempt to execute an expression and catch any errors that may occur. It has the following syntax:
    ```clarity
    (try! expression)
    ```
    * Example:
    ```clarity
    (define-public (safe-divide a b)
      (try! (/ a b)))
    ```
* `unwrap!`: This construct is used to extract the value from an optional or response type, throwing an error if the value is not present. It has the following syntax:
    ```clarity
    (unwrap! optional-or-response)
    ```
    * Example:
    ```clarity
    (define-public (get-user-age user)
      (let ((age-optional (map-get user-ages {user-id: user})))
        (unwrap! age-optional)))
    ```
* `asserts!`: This construct is used to assert that a certain condition is true, throwing an error if the condition is false. It has the following syntax:
    ```clarity
    (asserts! condition error-message)
    ```
    * Example:
    ```clarity
    (define-public (transfer sender recipient amount)
      (let ((sender-balance (var-get user-balance sender)))
        (asserts! (>= sender-balance amount) "Insufficient balance")
        (var-set user-balance sender (- sender-balance amount))
        (var-set user-balance recipient (+ (var-get user-balance recipient) amount))
        (ok true)))
    ```
