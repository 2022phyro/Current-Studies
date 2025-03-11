# Macros

* Macros provide ways of writing codes that write other codes.
* Macros can either be declarative or procedural
* This section deals with declarative macros
* Declarative macros have a match pattern syntax as shown below. Each rule should have like on the lhs a pattern to match and the rhs code to operate. the macro substitutes the code into the main program
* The Lhs can be almost anything which can be parsed. But the rhs has to be valid rust code
```
macro_rules! macro_name {
    () => {...};
    () => {...};
    () => {...};
}
macro_rules! demo {
    () => { 1 + 1 };

    (Hey to match this##) => {
        println!("You found nonsense here")
    };
    
    ($e1: expr, $e2: expr) => {
        $e1 + e2
    }; // This capture adds the two expressions provided
}
// main

fn main() {
...
demo!(Hey to match this##);
demo!(2, 5)
}
```

## Captures
* This are useful patterns written according to a given semantic
* Captures are written as $ followed by a name and a colon and the kinf of capture may be an expression, type or an identifier
* The macro will strictly match the system parsed so something like `demo!(5, "hello")` is valid match, but it's not Rust safe code as you can't add string and numbers


* You can call macros with any form of brackets and you can create your rules with any kind of brackets hence
```rust
demo![] // Valid
demo!{} // Valid
```

* We can view the expansion of our macro in our code by making use of `cargo-expand, macro-expand`. Install using `cargo install cargo-expand, cargo install nightly` As it makes use of nightly as a version


### Capturing types
* We can write a macro for let's say to simplify taking input
* Here we are trying to capture types.
* We wrap a code block inside double braces instead of a single one to le the system treat it as a code block expression so we can assign this to a variable

```rust
macro_rules input {
    ($t: ty) => {{
        let mut n = String::new()
        std::io::stdin()
        .read_line(&mut n)
        .expect("failed to read input");
        
        let n: $t = n.trim().parse().expect("Invali input");
        n
    }}
}
// main
fn main() {
    let var: String = input!(String)
}

```
* Macros make code more readable by extracting the more unpleasant on ugly details, keeping it neat.

### Identifiers
* Identifiers are something in our program that has some name associated with them, such as variables or something like function names with the help of which we are able to identify something inside the code.
* Indentifiers let you cross the boundaries of the code in order to carry out operations on your external variable via macro code
```
macro_rules! adder {
    ($var: ident) => {
        $var = $var + 1;
    }
}
fn main() {
    ...
    let mut x: i32 = 4;
    adder!(x)
    println!(x) // x is now 5
}
```
* Macros don't take ownership so we had to take note of our ownership rules and avoid reassigning

### Repeating patterns
* They are essentially patterns that are repeating, and we would like to make substitutions for each of the repeated pattern.
* Repeating patterns let us create as much patterns as possible.
* The syntax for the rule is `$(value_to_repeat: expr), *`
* the `,` tells us the delimiter, then the `+` means 0 or 1 times while the `*` means 0 or more times.
* If we don't specify a delimeter, it will default to space.
* We can also use other delimeters like semi colons, colons, etic
* We wrap the expression we want to repeat in `$(...)*` where * is the rule pattern
```
macro_rules! string_add {
    () => {
        String::new();
    
    };
    ($some_str: expr) => {{
        let mut temp_str = String::new();
        temp_str.push_str($osme_str);
        temp_str
    }}
    ($(some_str: expr), *) => {{
        let mut temp_str = String::new();
        $(temp_str.push_str($some_str);)*
        temp_str
    }}

}
```

### Unit Types, Expression vs Statements, Partial Move

#### Unit Types
* This has only one type and one value
```
let x: () = ();
```
* This is useful for code blocks or functions that may carry out actions but don't return anything. We can use the unit type for that scenarios. Actually, Rust sees such functions as implicitly returning a unit value.

#### Expression vs Statements
* Expressions are something that evaluates to a value and returns that value, while Statements are instructions that do something but does not return a value, or rather they return a unit value. Eg
```
let num: i32 = 10  // Statement;

num += 5 // Expression;
```
* Code blocks that return a value qualify as expressions. Functions that do not return values are considered as statements.
* Any instruction that doesn't return anything is a statement and if it returns something, is an expression

#### Partial Move
* The partial move is typically seen in the context of structures. When we try to destructure parts of an instance of a structure, we can use both the by move and by reference. Doing this will return in a partial move of the structure instance, which means that parts of the instance of the structure will be moved, while other parts will stay. In such a case, the variable referring to the instance cannot be used afterwards as a whole. However, the parts that are only referenced and not moved can still be used.
* To avoid partial move, when using struct members that implement the `Move` trait, we should make use of referencing instead of assigning those members directly.

### As_ref and Partial Move in Option (Or other Enums)
* This is used to borrow items as references rather than take ownership of them at once. Usually in a match statement, we may have code that may be *owned* at runtime. Eg
```rust
let some_opt: Option<String> = Some("Alice".to_owned());
match some_opt {
    Some(inner_value: String) => println!("Name is {}", inner_value),
    None => println!("No name given")
}

println!("{:?}", some_opt); // Error because we took ownership in the Some match case.
```
* We can fix this by borrowing this value as a reference instead of an owned. When using the `as_ref`, we return an Option Enum reference to the inner value and not a reference to the Option as a whole
ie 
```
&some_opt //An Option refernce
some_opt.as_ref() // A reference to the inner value of the Option enum
```

* The `as_mut` function gives a mutable reference to the inner data

### Take and swap and replace.
* The `take` and `swap` from the `std::mem` allows us to take a value and swap it out from another, letting us avoid extra memory allocation..Eg. Consider this enum
* Take swaps out a value for a default value, thus allowing us to avoid extra memory allocation
* `Replace` is similar to take but it swaps out the destination with the source value ie it swaps one value with another, and then returns the default value
* `Swap` This function is also similar but it swaps two values together ie 
```
let s1 = "James"
let s2 = "Yanner"
swap (&mut s1 &mut s2) // Would swap these values so that s1 has the value of the first and s2 has the value of the second.
```


## Question mark operator
* The question mark is typically used along with the result enum. More specifically, it will grab the value inside the Ok variant, in case of Ok variant. It is convenient way for unwrapping the Ok variant.
* It quickly lets us unwrap a Result enum without necessarily panicking our code ie
```
let val = Ok(4)

let unwrapped = val? // this would unwrap this value, in the case of an error it would also hold the error string.
```
* The question mark operator could also be used in the same way for the Option enum ie (Some, None)
* This can also be applied to all expressions that result in a Result eenum ie even functions that return a result enum

 ## Testing
* Testing is very important because as Dijkstra said __Testing can be used to show the presence of bugs but never their absence__
* test functions are usually inside a test module
* we denote a test function with the test trait, then other functions in the test module that don't have the test trait wouldn't be run as tests.
```rust

#cfg[(test)] // Tells Rust to run the tests
mod tests {
    #[test]
    fn it_works () { // A test function as it is marked by the test crate.
        assert_eq!(123, 123)
    }
}
```
* we can write more tests in the default ways using the normal testing routines.. 
* The `#[should_panic]` trait lets us write a function that should fail with a particular error.

### Running tests
* `cargo test`: run the test in default mode
* `cargo test test_fn_name` tests a particular function
* We have other ways of running tests via the command line to fulfill different functions.

### Integration tests
* This verifies that the unit of codes work together as expected to give a particular result..
* In rust, integration tests are usually written in a seperate file. They cannot import files from the binary crate but from the library crate...
