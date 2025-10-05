# Traits

In Clarity, traits are a way to define shared behavior that can be reused across different smart contracts. Traits allow developers to create modular and composable code by encapsulating common functionality in a single place. This is similar to interfaces in other programming languages like solidity or traits in Rust.

## Defining Traits
Traits are defined using the `define-trait` keyword, followed by the trait name and a list of function signatures that the trait requires. Here's an example of defining a simple trait:

```clarity
(define-trait my-trait
  (get-value (uint) (response uint uint))
  (set-value (uint) (response bool uint)))
```
In this example, we define a trait called `my-trait` that requires two functions: `get-value` and `set-value`. The `get-value` function takes a `uint` as an argument and returns a `response` type that can either be a `uint` or an error code (also a `uint`). The `set-value` function takes a `uint` as an argument and returns a `response` type that can either be a `bool` or an error code.

## Implementing Traits
To implement a trait in a smart contract, you use the `impl-trait` keyword followed by the trait name and the function implementations. Here's an example of implementing the `my-trait` defined above:

```clarity
(impl-trait my-trait
  (get-value (arg)
    (ok 42)) ; Example implementation returning a fixed value
  (set-value (arg)
    (ok true))) ; Example implementation returning success
```
* Traits are deployed as their own contract to the network. so when we call the impl-trait keyword, we call it with the trait's contract principal
* Every function signature declared in the trait must be implemented to that order. Of course there can be different implementations for different contracts. and more functions can be added to the contract outside of the trait.
*  A single contract can implement multiple traits.

## Using Traits
Once a trait is implemented in a contract, you can use the functions defined in the trait just like any other function in the contract. Here's an example of using the `my-trait` functions:

```clarity
(define-public (use-my-trait)
  (let ((value (get-value 42)))
    (match value
      (ok v) (set-value v)
      (err e) (print e))))
```
In this example, we define a public function `use-my-trait` that calls the `get-value` function from the `my-trait` trait. We use pattern matching to handle the response, calling `set-value` if the call was successful or printing an error code if it failed.
* Traits can be used to define common interfaces for different contracts, allowing for polymorphism and code reuse.
Things like fungible tokens (FTs) and non-fungible tokens (NFTs) can be defined as traits, allowing different token contracts to implement the same interface and be used interchangeably. In fact, majority of them are defined as traits to guide and ensure reproducibility across code behaviour.