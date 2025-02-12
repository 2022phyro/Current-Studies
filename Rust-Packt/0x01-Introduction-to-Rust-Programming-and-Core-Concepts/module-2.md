# Basic Concepts


## Introduction
### Printing:
The default way to print is with the `println!` macro. The println! macro expects string to print something other than a string, we make use of placeholders. The same can apply for other data types. Eg
```rust
fn main() {
	println!("Hello, world!");
	println!("I'm a Rustacean!");
	println!("My age is {}", 20);
	println!("My age is {20}");
}
```
The `print!` macro is similar to the println! macro, but it does not add a newline at the end of the output. Eg

### Variables:
Variables serve as addresses for data stored in the computer memory. Variables usually have a name, a datatype and a value that goes with it. Eg
```rust
let x: i32 = 15;
```
The compiler will try to infer the types if they are not provided. Unlike other languages, we have to specify a variable as mutable in order to change it later
```rust
let mut x: i32 = 15;
x = 10 // good
```
Variables must have only letters, digits and underscores, can only start with letter or underscore and they are case sensitive

### Datatypes

Datatypes tell us what kind of data to expect from the system...Datatypes in rust are either *scalar* or *compound*
#### Scalar data types
These include

* Integers
 - Used to represent numbers
 - Either **signed** or **unsigned**
 - Signed integers can store both positive and negative integers, while unsigned integers can only store positive numbers
 - We have four types with different ranges and the datatype name gives us insight into the number of bits used to store a number ie `i8`, `i16`, `i32`, `i64` and `u8`, `u16`, `u32`, and `u64`
* Floats
 - Divided into `f32` and `f64`
 - Used to store fractional or decimal numbers
* Boolean
  - Has only `true` or `false`
  - used to express conditions and different states
  - The result of a logical operation is a boolean
* Characters
  - Represents characters, unicode or special characters
  - enclosed in single quotes. Eg `'James'`

#### More on variables, Shadowing

* We can declare multiple data types using comma seperated lists...
```rust
let (a: i23, b: u64) = (-23, 324);
println!("Different bases: base 8 {:o}, base 16 {:x} and base 2 {:b}, 24, 24, 24)
```
* To add variables of different data types, we can try to convert them to the same datatype.using the **as** keyword, we could force them to assume a particular datatpe for that instant eg:
```rust
let ni: i32 = 14;
let ma: f64 = 14.4;

let m = ni + ma; // wrong
let m = ma + ni as f64; // right
```

#### Shadowing
* Declaring a variable that has already been declared. We can "shadow" a variable in different ways
* similar to redeclaring a variable
* We can change its value, mutability and datatype
* We can also change it inside code brackets
* Inside a code bracket, the concept of lifetimes and scope come into play and the data will revert to what it was before the bracket
* **shadowing is always carried out with let**

#### Constants
* Never change during the duration of the program
* the datatype MUST be written
* one cannot use the mut keyboard with it
* Declared with the `const` keyword. eg
* Naming convention is uppercase with underscores to seperate words
```rust
const MAX_AGE: u32 = 16
```

### Compound Data types

* Can hold collections or complex data types
* includes:

* **String** and **&str**
 - &str represents fixed length strings,
 - created by setting to double quotes eg `let sme = "Hello Rust" // (&str)`
 - are actually pointers to string slices in memory
 - String represents mutable strings
 - instantiated with the `String` data type
 - We can perform operations on then eg `let mut grow_string = String::from("This is a String data type")`
 - String has different methods that allows us to perform operations on strings including `push, pop, push_str, len, is_empty, len` etc
* **Tuples**
 - Enclosed with brackets
 - cannot change in size
 - We can destructure a tuple and assign its values to different variables
 - we can also use indexing with tuples to access the data at different points
 - we can have nested tuples
 - Eg `let tuple_1 = (13, 14, 'hello');`
 - We can have an empty tuple.

* **Arrays**
 - items in an array must all be of the same type
 - we can define an array by making use of square brackets eg:
```
let arr : [i32, 3] = [1, 3, 5];
let arr_all: [&str, 4] = ["unknown, 4];
```
 - we can male use of slices in rust arrays just like othe rlanguages ... eg
```rust
let arr : [i32, 5] = [1, 2, 3, 4, 5];
let slice_1 = &arr[1..3] // will not include the item at position 3
let slice_2 =  &arr[1..=3] // will include the item at position 3
```
 - Arrays have other methods like `len`, etc

* **Vectors**
 - Similar to arrays
 - Collection of similar elements that can be resized as needed. Hence we can think of it as a "resizable" array
 - Instantiated using the vec macro eg `let mut my_vec: Vec<i32> = vec![1, 2, 3]`
 - We can use indexing on vectors to access values and characters... as well as slices
 - Vectors also have their own utility functions that make it easier to make use of the data type



