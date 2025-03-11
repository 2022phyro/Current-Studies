# Rust Modules
* Thsi gaves us a way to organize our code, as well as encapsulate them according to the functions they perform or the problems they solve.

## Crates
* Crates are Rust's default way of handling modules and files
* Crates are composed of modules
* Crates are methods of organizing and encapsulating code according to files and the functions they perform
* Crates can be divided into Binary and Library crates
* **Binary crate** is a code which one can execute while **library crate** is the one that can be used by other programs
* Library crates can be referenced from the binary crates
* We can only have one library crate which is usually named `lib.rs`
* To make functions, structs etc in the private crate to be available in the main service we have to declare them as public using the `pub` function. Eg
```
pub fn my_func() {
    println!("A public function");
}
```
* We can define other library crate file except the main lib.rs but we'd have to call or note them thus. Eg if we create two files `file_1.rs` and `file_2.rs`, we'd have to note them in the lib.rs
```
pub mod file_1;
pub mod file_2;
```
* we can define a module inside a file using the `mod` keyword and then defining functions, structs, etc within the braces. Eg
```
// in file_1.rs
mod basic_math {
    pub fn size_add(num1 &i32, num2: &i32) -> i32 {
        num1 * num2;
    }
}
// in the main fn
use file_1::basic_math::size_add;

size_add(3, 4);
```
* When creating structs in modules, we have to make the struct members public using the `pub` for the compiler to recognize them
* For enums, the enum have to be defined as public using `pub` for it to be identified by the compiler outside of its crate/file/module. Making an enum public makes all the other variants of the enum public.


## Cargo tools to visualize module trees
We can use the `cargo_modules` utility to show us more details and an in-depth visualization of our module trees
* The best syntax for creating modules is 
```
|__module
   |__mod.rs
   |__garden.rs
   |__vegetable.rs

// mod.rs
mod garden;
mod vegetable;
```


## Reexporting using `pub use`
* we can make use of the `pub use` syntax to declare top level modules into scope, letting us import and use them in other programs without having to reference their full path
* We often use a constructor for the purpose of creating new structs. this prevents us from making all the fields public. This is the constructor usually denoted as `new`
