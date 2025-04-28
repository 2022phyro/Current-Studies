# File Handling

This is used to handle numerous files using Rust libraries. Rust provides us with capabilities to create files and directories as well as creating files, appending, etc. The crux of all this is the `fs` module which contains all these tools and more
Eg

```
   // -------------------------------------------
   // 			Basic File Handling
   // -------------------------------------------
use std::fs::*; 
use std::io::{BufRead, BufReader, Read, Write}; 
use std::path::Path; 

fn basic_file_handling() -> std::io::Result<()> {
    let path_loc = r"D:\my_text.txt"; 
    let path = Path::new(path_loc); 
    // let mut file = File::create(path)?; 

    //file.write(b"let's put this in the file")?; 
    // file.write("let's put this in the file".as_bytes())?; 


    // let mut file = OpenOptions::new().append(true).open(path)?;
    // file.write("\n www.includehelp.com\n".as_bytes())?;
    
    // let str1 = "nouman"; 
    // file.write(str1.as_bytes())?; 


    // let some_vec = vec![1,2,3,4,5,6]; 
    // let str_from_vec = some_vec
    // .into_iter()
    // .map(|a| format!("{} \n", a.to_string()))
    // .collect::<String>();

    // file.write(str_from_vec.as_bytes())?;

    // let (name, age) = ("Joseph", 40); 
    // let formatted_str = format!("I am {} and my name is {}", name, age); 
    // file.write(formatted_str.as_bytes())?;

    // let mut file = File::open(path)?; 
    // let mut contents = String::new(); 
    // file.read_to_string(&mut contents)?; 
    // println!("The file contains {:?}", contents); 


    let mut file = File::open(path)?; 
    let file_buffer = BufReader::new(file); 
    for lines in file_buffer.lines(){
        println!("{:?}", lines?);
    }
    Ok(())

}
fn main(){
    basic_file_handling();
}
```

## Regex

* This stands for regular expressions. It is used to search for patterns inside text and this can be used to identify, find and replace, etc...
* Rust does not provide regex handling in the standard library so we make use of a crate called *regex*
* In rust, the patterns are created as rust strings ie `r"..."`
See examples of regex pattens below
```
   // -------------------------------------------
   // 			Regular Expression Basics 
   // ------------------------------------------- 
 
   extern crate regex; 
   use regex::Regex; 
   fn main() {
    // let re = Regex::new(r"[prt].ain").unwrap(); 
    // let text = "rrrain spain none";      

    // // println!("The text has a match {:?}", re.is_match(text)); 
    // // println!("The text has a match {:?}", re.find(text)); 

    // for cap in re.captures_iter(text) {
    //     println!("match: {:?}", &cap[0]);
    // }

    // let re = Regex::new(r"gr[ae]y").unwrap(); 
    // let text = "gray grey graye"; 

    // for cap in re.captures_iter(text) {
    //     println!("match: {:?}", &cap[0]);
    // }

    // let re = Regex::new(r"[^a-z]ain").unwrap(); 
    // let text = "main pain tain rain but not 0ain"; 

    // for cap in re.captures_iter(text) {
    //     println!("match: {:?}", &cap[0]);
    // }


    // let re = Regex::new(r"\d\d\d\d\d\d").unwrap(); 
    // let re = Regex::new(r"^\d......").unwrap(); 
    // let text = "My phone number is 816030 and the second phone number is 816694"; 

    // for cap in re.captures_iter(text) {
    //     println!("match: {:?}", &cap[0]);
    // }

    // let re = Regex::new(r"^aba").unwrap(); 
    // let text  = "ba abaa bc"; 

    // for cap in re.captures_iter(text) {
    //     println!("match: {:?}", &cap[0]);
    // }

    //let re = Regex::new(r"bc$").unwrap(); 
    // let re = Regex::new(r"^bc$").unwrap(); 
    // let text = "bc";
    
    // //let text = "aba abc bc"; 

    // for cap in re.captures_iter(text) {
    //     println!("match: {:?}", &cap[0]);
    // } 

    // let re = Regex::new(r"^\d\d$"); 
    // let text = "89";

    let re = Regex::new(r"\b\w*").unwrap();
    let text = "Hi my name is nouman"; 

    for cap in re.captures_iter(text) {
        println!("match: {:?}", &cap[0]);
    }
}
```

### Repetitions, quantifiers and capturing groups

