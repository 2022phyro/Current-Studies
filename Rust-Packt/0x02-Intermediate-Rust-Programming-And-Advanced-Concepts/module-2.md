# Smart Pointers

Smart pointers allow us to store memory on the heap instead of the stacck. This can be useful for different scenarios.
* The simplest of the smart pointers is the **Box** datatype
* Smart pointers are structs, but with the difference that they implement the `#Deref` and `#Drop` traits
* The Deref  is possible because the Smart pointers are treated like pointers to a specific value and hence can be dereferenced to store the inner data stored in the memory.
* Implementing the Drop trait allows us to specify custom code that happens when a smart pointer goes out of scope
* Box and other smart pointers are like a memory safe abstraction of Malloc(C).
```rust
struct MySmartPointer { value: i32 }

// Deref aspect

impl Deref for MySmartPointer {
    type Target = i32;
    fn deref(&self) -> &i32 { // not "i32" so that the pointer don't loose it's inner data
        &self.value        
    }

}

impl Drop for MuSmartPointer {
    fn drop(&mut self) {
    // Custom code could be written here to show that the smart pointer has gone out of scope. Eg
    println!("Dropping my smart pointer");
    }
}
```


## Linked lists

* This is a fundamental data structure in programming that allows traversal in only one direction. 
* This can be implemented using smart pointers.

Eg:
```
struct Node {
    element: i32,
    next: Option<Box<Node>>, // Option to 
}
```
## Deref Coercion

When making use of smart pointers, the pointers are forcefully dereferenced. Basically, Rust checks if the pointer implements the Deref trait and use it and recursively keeps checking the deref traits of the returned values and then finally we have the last one that is returned.

## RC Smart Pointer

* The RC smart pointer is used in cases when we want to have a variable with multiple owners. this breaks the usual Rust single owner rule.
* The RC smart pointer allows us to have multiple owners of a variable. It then keeps track of how many owners, or users, the data has and will clean up the data only when there are no more references/data to use. Eg
```
let a = Rc::new("Hello");
let b = Rc::clone(&a); // Using clone unlike other implementations doesn't create a new copy of it but rather increments the count of owners stored in the Rc count.
let c = Rc::clone(&a);
```

## Refcell Smart pointer

* This is similar to the Box pointer.  The major difference between the Refcell and the Box pointer is that the Box pointer enforces borrowing rules at compile time. However, the Refcell pointer enforces this borrowing at runtime. This may be tricker as we may miss errors that could have been caught at compile time, that may crash your code at runtime.
* In RefCell, the borrow will remain until these variables leave scope in which case they will be dropped
* Rust doesn't allow mutable refernces to an immutable value but RefCells, allows us to borrow **mutable** references to an immutable value.
* Like Box, it makes use of the #Deref trait which means it can be treated as a reference or like a pointer.
* Combining Rc and RefCell pointers, we can create data that is both mutable and usuable by multiple owners :joy:


