###

## Initializing structs
When initializing structs, the best way to do so for the struct is to define a `new` function in the impl block that'll serve as a constructor of sorts. There all our manipulations would take place and allow us make certain fields or functions private, and still make use of the struct elsewhere. It is also nice to implement the default trait for a particular struct as it can allow us to create items with default values
```
struct Me {
    name: &str
    class: String
}

impl Me  {
    pub fn new(name: &str, class: String) -> Self {
        Self {
            name,
            age
        }
    }
}
impl Default for Me {
    pub fn default () -> Self {

    }
}
```


## Function inputs and coercion
When creating a function, parameter should be set to types that are coercion targets. Eg setting a function parameter to `String`, `String` is coerced to `&str`, so it would better to use `&str` to type the functon as it would make it more flexible and allow us to make use of it with various other values.

## Iterating through Option.

We can make use of the `if let` syntax to successfully iterate through a large number of values where we're expecting an  `Option` enum. One thing to note, the option enum implements the `into_iter` function so it can be used with iterators.


## Disabling mutability for finalized objects
If we have a mutable object that we'll need to perform data on, and then the data won't change, we can make that  possible using a setting style. we'dassign it to a block where all the manipulation takes place
```
let data = { 
    let data = [1, 2, 3, 4, 5]; // Shadow the outer variable
    data.sort();
    data;
}
```
For structs, it is better to make use of a wrapper struct that'll wrap out taget struct, we could then  implement the `Deref` for the outer struct and then thus, we'd have made its content immutable.


## String concatenation
Often concatenation of Strings would pass ownership on to the result variable. Hence, when adding strings to avoid transfer of ownership, we make use of references to do so.


## Efficient Programming Tips

### Better Match statements

* We can create better match statements, where needed to improve readability, and syntax. Consider below

```
let cancer: bool = true;
let smoking: bool = false;

match cancer {
    true => match smoking {
        true => println!("Your cancer is due to smoking");
        false => println!("You should see a doctor the cancer may have other causes");
    }
    false => match smoking {
        true => println!("Smoking is dangerous and may cauuse cancer");
        false => println!("You're good to go");
    }
}
```
The above match statement can be simplified by the use of tuples to handle the different conditions eg
```
match (cancer, smoking) => {
    (true, true) => println!("Your cancer is due to smoking");
    (true, false) => println!("You should see a doctor to know why you have cancer");
    (false, true) => println!("Smoking is dangerous and may cause cancer");
    (false, false) => println!("You're good to go");
}
```
ie hence make use of tuple matching to create more concise match sttements

### Strings
* When writing strings with multiple quotes inside, we can make use of the rust string which would automatically escape it for us. This is referred to as string literals, and it's great for processing these strings as well as json strings. Eg
* The hashes after the `r` determine the end. if we have such a sequence `"#` inside the string, we can change the markers to `r##"..."##` and so on...
```
let eg_1 = r#"The big "man" has done a lot of damage"#; // End with the hash
let eg_2 = r#"{
    "name": "John",
    "age": 42,
    "sex": "M"
}"#;
let eg_3 = r##"Hello "#World##;
```

## Builder Pattern

This is used to like handle scenarios where we have too complicated data types with a lot of fields, structures, methods, etc.. So we'd make use of the builder pattern to handle these cases 
