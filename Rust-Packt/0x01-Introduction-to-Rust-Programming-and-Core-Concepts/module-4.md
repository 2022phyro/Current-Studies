# Conditions and Loops


## Conditions
Conditional statements are used 
to decide the direction of the code based on certain variables or parameters. The primary control structure is teh `if` statement and more conditions can be combined with logical operators. Eg
```
let flag_1: boolean = true;
if flag_1 == true { // condition
    println!("The condition is true")//execute code block
}
```

We can chain conditions with the `if`,`else if`, `else` statements to chain similar conditions together to create a ladder
* We can also create a nested conditional statement with nested ifs statements 

### if let
* A way to conditiionally assign values to a variable
```
let value: <Datatype> = if condition {
} else {

};
```
* WE can also add else if blocks oto the conditional chain


## Match
* Similar to a switch state ment it's used to match one or more values to a variable or execute a particular code blokc. Eg
```
match value {
    condition_1 => {code block},
    condition_2 => { code block },
    ...
    condition_n => { code block },
_ => { default code block }
}

```
* All values returned by match must be of the same data type else an error is thrown by the rust compiler

## Loops
this is a way to carry out an action repeatedly for a certain number of times or while a certain condition is valid
* Rust have three main types of loop statements `loop`, `for`, `while` eg.

```
// loop
loop {
    code block
}
// while
while condition {
    code block
}

```
* While loop is ofen used in cases when we do not know the number of times we want to execute a code block
* For loop are used when we know the number of times we want to print. We can loop through ranges with the for loop . Eg
```
for i: usize in start..end {
    code block
}
// using data structures
let vec_1 = vec![1, 3, 4, 5, 6, 7]
for val in vec_1 {
    code block
}
```

* `break` statements terminates loopes whenever they are encountered inside the loop and return control of the program to the first statement outside the loop.
* `continue`, skips the remainder of the code block and begins the next iteration on the loop..
