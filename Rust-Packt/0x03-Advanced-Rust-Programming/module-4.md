# Unsized Types

## Unsized types and references to them

* A type is `sized` if it's size in bytes is known at runtime. If not it is `unsized`
* Primitives eg `i32` ,`f32`, etc are typed. Arrays and tuples of primitives are also sized too. All types composed of primitive types, like hashmaps, structs, etc are all sized
* The `size_of::<DATA_TYPE>` function tells us the size of a data type
* Pointers or references are also sized.
*  Slices of all kinds, arrays, strings, etc are unsized
* Trait objects are also unsized at compile time
* A reference /pointer is one machine word in size. A machine word is the unit of data that can be moved between storage and processor of a computer. it's processor dependent and we refer to it as 32-bit (8 bytes) and 64-bit (16 bytes) in everyday tongue. Pointers to sized types are one machine word long ie on a 32 bit machine, 8 bytes and refernces to unsized types are two machine words ie 16 bytes on the same machine.


## Possibly sized property
* Auto traits are automatically implemented for a type if certain conditions are met. Marker traits simply indicate a type possesses a certain property. All auto traits are marker traits
* The `Sized` trait is both an auto trait and a marker trait and the auto implementation occurs depending on the members of the trait.
* This trait is often applied as a bound to every generic Trait parameter
We can make the Sized trait optional using the ?Sized contraint Eg
```
fn print_all<T: ?Sized>(t: &T) {
    ...
}
```
This would allow us take advantage of both a sized and unsized types there


## Zero Sized types in Rust
* Zero sized types refers to types without size at runtime

### Never Types
* this is part of the Never Types... and is available in the nigthly version of Rust.
* Never Types refers to types that never return. Basically they either panic or continue in an infinite loop.

### Unit Type
* this represents a lack of meaningful value. it is the type of the unit value ie `()`
* Represents a parenthesis eg
```
let x: () = ();
```
* Functions that don't return a value actually under the hood returns a unit data type

### Differences between Unit and Never types
|----|----|
|Unit Type | NeverTypes|
|No meaningful value |Never produces a value|
|Function returning unit always return normally|Function returning never, will never return normally|
|single value, which can not be coerced| No associated value, and can be coerced to all types.|

### Unit Structs
* These are structs with no fields..eg and hence no types

```
struct Admin;
struct User;
```
* They are used mainly as markers and can be applied in a concept like authentication to differentiate different roles..
* Unit Structs make use of the `Move` trait and not the `Copy` trait because they're structs...


### Phantom Data;
* Phantom data is a marker structure with zero size.
* It helps in expressing the relationships and constraints between types without introducing any runtime overhead.


## Coercion in Unsized Types

* This occurs when a sized type is transformed into an unsized type, similar to deref coercion which was covered earlier in the course. Let us refresh the deref coercion. The deref coercion occurs for automatic conversion of a reference to a type into a reference to another type. Specifically when using methods and functions that expect a certain type, it occurs when a type gets coerced into another type following an
operation
* In deref coercion, the type changes, but in unsized coercion, the property of the type changes from sized to unsized
