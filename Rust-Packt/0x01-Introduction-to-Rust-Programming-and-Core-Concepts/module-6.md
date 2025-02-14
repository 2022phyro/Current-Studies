# Structs

* Used to create complex datatypes
* Declared using the `struct` keyword
* Structs more or less define a new data type and we can make them mutable or immutable as well as change them.
* We can also have tuple structures which are simply named tuples in form
* An `impl` block is used to define methods that are attached to the struct
Eg 
```rust
struct Person {
    name: String;
    age: u32;
    gender: char;
    salary: i32;
}
impl Person {
    fn greet(&self) -> void {
        println!("Hello {self.name}")
    }
}
struct Point (i32, i32) // tuple structure
```

## Traits
* abstract definition of a shared behaviour amongst different types
* A type's behavior consists of the function we can call on that type. Different types share the same function and behaviour if we can call the same function on them. 
* We use trait definitions to group function signatures together to define a set of behaviours..
* All function signatures defined in a trait must be implemented for a struct with that trait. ie we can't define some function associated with the trait and leave others...
* if we define the function in the strait instead of just writing the function signature, that becomes the default implementatio for the function...
Eg 
```
// Same trait implemented for two structs, Person and Student.

trait GeneralInfo {
    fn info(&self) -> (&str, u8, char);
    fn country_info(&self) -> str;
}
impl GeneralInfo for Person {
    fn info(&self) -> (&str, u8, char) {
    (&self.name, self.age, self.gender)
    }
    fn country_info(&self) -> &str {
        &self.citizenship;
    }
}
`impl GeneralInfo for Student {
    fn info(&self) -> (&str, u8, char) {
    &self.name_std, self.age, self.gender)
    }
    fn country_info(&self) -> &str {
        &self.citizenship;
    }
}
```

## Enums

* A datatype that contains variants of a specific data type..
* Used to specify choices of a singular data type or related entity
* defined using the `enum` keyword..
* By default, enums are given default sequential variables for the enum options.
* We can have `impl` blocks for enums
Eg 
```
enum Transport {
    Car, // 0
    Train, // 1
    Air // 2
}
// Enums with different default values
enum Transport {
    Car = 15,
    Train = 19,
    Air = 30,
}
// Enums with specified datatypes for the variants
enum Transport {
    Car(i32),
    Train(i32),
    Air(i32),
}
```
* We can use enums as a hack to create complex data structures eg, by "tricking" the vector datatype to create or allow it to to carry multiple values...


## Generics

* This allows us to create "generic" types that are not defined at first but then can be specified later on or inferred via the program.
* Useful when we have methods, structs, etc that can be applied to several use cases of different datatypes and then avoid redundancy
* It helps minimize code duplication and as well as follow DRY principles
* We can make use of generics in the case of structs to create structs with values that could apply to any place
* We can set impl function for the struct but then we must make note of all the traits that are needed to implement it.
Eg 
```rust
//Specifies a datatype for T
fn square<T> (x: T) -> T {
    x * x
}
// Specifies a range for the T by limiting it to types with certain traits, in this case the multiplication and copy trait
fn square<T: sts::ops::Mul<Output =T> + Copy> (x: T) -> T {
    x * x
}
// Another way to define the Generics in case the list gets too wrong
fn square<T> (x: T) -> T
where T: sts::ops::Mul<Output =T> + Copy> {
    x * x
}
// Struct with a generic type
struct Point<T> (T, T);
// we can then make use of it thus
let p1: Point<i32> = Point(2, 3);
let p2: Point<f64> = Point(2.4, 4.5);
// Implementing a function for the point
// Adding the traits for Debug to limit values of T to types that have implemented the Debug trait
impl Point<T: std::fmt::Debug> {
    fn print(&self) {
        println!("The values of the point coordinates are {:?}", self.x)
    }
}
```

## Option and Result Enum
### Option Enum
* Used to capture a failure or lack of value
* Contains two enums `None` and `Some`
* None denotes failure or lack of value, while Some encapsulates any value
* We can capture the value of the `Some` variant using a variable inside it.
* We can use the value of the `Some` itself using the **unwrap** method
Eg
```rust
let mut disease: Option<None> = None;
disease = Some(String::from("Measles"));
// check what kind of disease using the match
match disease {
    Some(name: String) => println!("You have {name}"),
    None => println!("You're free for now"),
}
println!("The disease is {}", disease.unwrap());
```

### Result Enum
* Used to denote success or error
* We can use it to implement basic error checking in our codes by specifying values to expect in the case of an error or success.
* We can as well make use of the match statement to correctly match or perform different cases in regards to the enum
* Result has two variants `Ok`, and `Err`

### HashMaps

* Similar to python dicts in understand... hashmaps are used to store data with a specific key which is hashed. 
* Hashmaps have different functions for handling their operations. like `insert`, `get`, etc
Eg
```
let mut person: HashMap(<&str, i32)> = HashMap::new();
person.insert("nouman", 23);
```
* Hashmaps have different applications as important data structures, can be used in operations that require O(1) complexity for lookups and inserts
