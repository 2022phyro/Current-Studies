# Deep Dive into Traits

## Trait Bounds

Trait bounds allow us to use generics for different traits provided taht they implement a particular trait. eg we can bind a trait to a function. Bound to ensure that the required type should at least implement that trait. should have the `Double` trait implemented. Eg
```
fn my_func<T: RequiredTrait>(parameter: T) {
    ... // Do some things with the function
}
```

## Associated Types

* This types limit what a user can do.
* In it's own way, it limits what a user can do by setting particular or grouping types together.
```
#[derive(Debug)]
struct Kmh {
    value: u32,
}

#[derive(Debug)]
struct Km {
    value: u32,
}


#[derive(Debug)]
struct Mph {
    value: u32,
}
#[derive(Debug)]
struct Miles {
    value: u32,
}


impl Kmh {
    fn distance_in_three_hours(&self) -> Km {
        Km {
            value: self.value * 3,
        }
    }
}

impl Mph {
    fn distance_in_three_hours(&self) -> Miles {
        Miles {
            value: self.value * 3,
        }
    }
}




/* 
trait DistanceThreeHours {
    type Distance;
    fn distance_in_three_hours(&self) -> Self::Distance;
}

impl DistanceThreeHours for Kmh {
    type Distance = Km;
    fn distance_in_three_hours(&self) -> Self::Distance{
        Self::Distance {
            value: self.value * 3,
        }
    }
}

impl DistanceThreeHours for Mph {
    type Distance = Miles;
    fn distance_in_three_hours(&self) -> Self::Distance {
        Self::Distance {
            value: self.value * 3,
        }
    }
}
```


## Trait items

* Refers to all items part of a trait declarations
* These include

### Self

```
trait MyTrait {
    fn fn_1() -> i32
    fn fn_2() -> Self
}

struct A; // Unit struct
struct B; // Unit struct

impl MyTrait for A {
    fn fn_1() -> i32 {
        5
    }
    fn fn_2() -> Self {
        A
    }
}
```

* Basically Self refers to the type for which we are implementing the trait

### Trait functions and methods

* Trait functions don't make use of the self parameter
* Trait functions cannot be used with instances. They can onl y be used with the default trait or type eg.
```
trait Trait {
 fn fn_1() -> i32

}
impl Trait for i32 {
 fn fn_2() -> Self {
        A
    }

}

```
* A common trait function is the new function used to create new values of a data type
* Trait methods make use of the self parameter and can be called by instances of that data type that implements the trait.


### Generic types, associated types

* Use associated types when there should only be one default implementation of the type
* Use generic types when there can be many possible implementations of the same trait etc for a single type


## Scope of a Trait
* This refers to where a Trait is visible.
* usually a trait is visible only in the module where it is defined.
* By making use of the `pub` keyword, we can increase the scope of a trait to external crates/modules.
* We may have a trait definition in one module and its implementation in another module. We just have to make sure that the place, wherever we are bringing this into, has to be in scope.

### Trait methods with the same name for a type
* When we have a trait with a method which is implemented for a specific type, and the type itself also has an implementation for the same method, then the compiler defaults to calling the method that is directly implemented on the type itself.
```
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;
impl Pilot for Human {
    fn fly(&self) {
        println!("This is you captain speaking");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("I can fly due to magical powers");
    }
}

impl Human {
    fn fly(&self) {
        println!("Waving arms but unable to fly");
    }
}

let person = Human;
person.fly();

Pilot::fly(&person); // Allows us to invoke the trait's own implementation of the method
Wizard::fly(&person); // Same here...

```

### Super Traits
* This allows one trait to inherit methods and associated types from another trait.
* This is similar to inheritance in OOP like python.
* The trait being inherited from is the super trait.
* Any type that implements the child trait must also implement the super trait.
* Even when we use it as Generic types, using the sub trait will still enable us to have all the methods of the parent traits. eg
```
trait Person {
    fn name(&self) -> &str;
}

trait Student: Person {
    fn complete_info(&self) -> (&str, u8, &str);
}
```

### Combo traits
* This is allows one trait to inherit from multiple super traits eg
```
trait Programmer {
    fn fav_language(&self) -> String;
}

trait CompSciStudent: Programmer + Student {
    fn git_username(&self) -> String;
}
```

### Marker Traits

* This trait doesn't require any method to be implemented, Moreover, it
also does not have any trait items. Instead, it serves as a way to add metadata or constraints to a type. Marker traits are useful in Rust, because they allow us to commute additional information about a type to the compiler without requiring any actual functionality to be mplemented.
* They are used to mention constraints for a type.

### Auto Traits

* these are traits that are implemented for a type if all the members implement the particular trait. Eg like options of an enum or members ofa struct. Eg: 
```
#[derive(Clone)]
struct Me {
    name: String;
    info: String;
}
```
Here Clone is automatically implemented as its members also implement the clone traiti.


## Some useful traits
There are several useful structs we can use to add more functionality to our code which includes
* `PartialEq`: which we can use to establish equality comparison
* `PartialOrd` which we can use to establish comparisons of greater or less


## Static vs Dynamic Dispatch

* When code involves generics, Rust needs to  know what exactly is being implemented, which version or type of the generic is being called in the final function
* This is referred to as dispatch
* We can have either`static dispatch` or `dynamic dispatch`
* `Monomorphization` means the compiler creates different versions of a generic type function for each type used to call it. This is what let's static dispatch handle generics.
* Static dispatch becomes inefficient when we have a lot of objects

* Dynamic dispatch make use of trait objects to define these versions but ensure that they're only created at runtime time and only for those data types we actually use in our code.

### Trait objects

* Thisi s a reference to a trait and makes use of the `dyn` keyword just like how the `self` is a reference to the data type.
* This is used to ensure that only one version of the final generic type function exists at runtime.

