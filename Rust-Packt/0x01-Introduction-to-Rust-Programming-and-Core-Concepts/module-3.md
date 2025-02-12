# Ownership and primitive types...
* These are the three basic rules of ownership
  - Each value in Rust has a variable called it's owner
  - There can be only one owner at a time
  - When the owner goes out of scope, the value will be dropped

* Primitive datatypes implement the *Copy* trait which copies it's data to a reference thus creating a new value. Complex datatypes implement the *Move* which means that the reference is sent to the second value thus passing ownership
* Primitive types are stored on the stack while complex types are stored on the heap, similar to allocation of memory in C
* We can "borrow" or reference values making use of the `&` sign to create a read_only reference of a character Eg.

```
let st: String = String::from("Hello ownership");
let s2: String = st; // wrong
println!("st {}, s2 {}", st, s2) ; // Throws an error

let s3: &String = st; // right
println!("st: {} s3: {}", st, s3)
```

* When variables that implement Move trait are written in code blocks, all of the variables are dropped and the memory used to store them is freed.

## Application Memory - Heap and Stack...
the memory in a typical rust segment can be divided into four
* **Code/Text** which stores all the code used in the program...
* **Global** stores all global variables which are accessible everywhere in the code
* **Stack** Stores all function calls, local variables, and then the primitive data types.
* The above storage segments don't change at run time hence, their sizes can be calculated at runtime...unlike the heap
* **Heap** Stores all non primitive data types. It is not calculated at runtime per se as the computer has to keep allocating memory on the heap for new complex data that it encounters during the course of the program. when we assign a data that will be stored on the heap, the computer reserves memory on the heap for us and then gives us a pointer to that memory bloc. This is what is transferred via referencing and move, etc...

## Functions and Ownership

* For variables stored on the stack, when they're passed into a function, the variable is copied and not moved, thus the variable in the function will be different from the one outside and would be dropped off later on..
* For the variables stored on the heap is passed to a function, the variable's reference is moved into the function and once the function completed, the scope ends, the value will drop and trying to get it later on will lead to an error...(as we've already dropped the value as it left the function call)
* To avoid the above, we'd make use of a reference so that we don't assume "ownership" of the variable. If we want to edit the variable, we should use a mutable reference ie `&mut var_`.

## Mutable and Immutable References

* We can only have one mutable reference in scope
* We can have manay immutable references in scope
* We cannot have both mutable and immutable references to the same value
* References are scoped
* Data should not change when immutable refernces are in scope.

 ## Dereferencing
When you borrow a value, to access the data lying underneath, you need to make use of the dereference operator `*`








