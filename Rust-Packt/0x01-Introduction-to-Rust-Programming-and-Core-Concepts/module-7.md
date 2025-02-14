# Lifetimes

* Lifetimes tell us how long a variable or reference remains valid
* Lifetimes help to create memory safe code
* Lifetimes tries to handle the case of `dangling references` (a form of reference which doesn't really point to anything) eg 
```
let i: &i32;
{
    let j: i32 = 5;
    i = &j // dangling reference because outside this scope this value j will not exist again
}
```
* The problem of dangling specifiers is usually experienced in functions
* Another problem is that of undetermined lifetimes, where a reference is being returned from a function but the program cannot specify which lifetime it is returning. Eg
```
fn some_fn(s_1: &str, s_2: &str) -> &str {
    s_1
}

let s1 = "Hello";
let v: &str;
{
    let s2: String = String::from("World");
    v = some_fn(s1, s2.as_str()); // error as the program doesn't know if the result is from s1 or s2, and then s2's scope doesn't extend beyond the code block while s1 does...
}
```

## Lifetime specifiers
* We can add lifetime parameters to a function to tell the compiler how long we expect a program to remain valid.
* We can as well add lifetime specifiers to a struct if we have a danger of a dangling reference
Eg
```
let a: i32 = 5;
let b: i32 = 10;
let res: i32  = greater(&a, &b);

fn greater<'a, 'b>(i: &'a i32, j: &'a i32) ->&'a i32 {
    if i > j {
        i
    }
    j
}

// lifetimes in structs

struct Person<'a> {
    name: &'a str,
    age: i32,
}
```
## Eliding Lifetimes
* **Lifetime Illusion** is a feature where Rust is able to infer the lifetimes of the arguments, and parameters of a function or program. For it to do so, there are three rules that come into play
 - Each parameter that is a reference gets its own lifetime parameter
 - If ther is exactly only one input lifetime parameter, that lifetime is assigned to all output lifetime parameters.
 - If there are multiple input lifetime parameters, but one of them is `&self` or `&mut self`, the lifetime of self is assigned to all  output lifetime parmeters.

## Closures

* These are anonymous functions that we can create in rust, similar to Python's lambda functions or JS arrow functions
* closures are powerful when combined or passed to other functions
* Examples of closures
* closures capture the variables of the code segment which it is a part of
* the ownersip and lifetime rules are the same as functions.
```
let anony = || println!("This is anonymous function");
anony();

// Closure taking arguments
let y = 4;

let square = |num: i32| println!("The product of this call argument and y is {}", num * y);
square(16);
```
* Closures can infer the input and output types themselves. However if we try to call the closure with a different type of input, the Rust compiler will throw an error or complain. 
* We can also pass closures as arguments to functions. Eg:
```
// We define a generic F that expects a function that takes a number and returns a boolean
fn div<F: Fn(i32) -> bool>(x: i32, y: i32, f: F) {
    if f(y) {
        println!("The division of {} and {} is {}", x, y, x / y)
    } else {
        println!("Division by zero is not permitted")
    }
}

let check_div = |y: i32| {if y == 0 {false} else {true}};
// Call the function
div(5, 10, check_div);
```




    
