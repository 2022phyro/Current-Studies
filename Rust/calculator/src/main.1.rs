use std::io::{stdin, stdout, Write};

fn read_question(line: &mut String) {
    print!("Phyro> ");
    let _=stdout().flush();
    stdin().read_line(line).expect("Did not enter a correct string. Please remember the instructions");
}

fn return_num_or_none(text: &str) -> Option<i32> {
    text.parse().ok()
}
fn attempt_line(values: Vec<&str>) -> i32{
    let mut result: i32 = 0;
    let length = values.len();
    let mut reduced_vec = Vec::new();
    match length {
        0 => return 0,
        1 => {
            if let Some(num) = return_num_or_none(values[0]) {
                result = num;
            } else {
                panic!("Invalid Number");
            }
        }, 
        _ => {
            // Go through the string bodmas like
            // first division
            match values.iter().position(|&x| x == "/") {
                Some(idx) => {
                    let mut current = String::new();
                    reduced_vec.extend_from_slice(&values[0..idx - 1]);
                    if idx >= 1 {
                        let a: i32 = values[idx - 1].parse().expect("Invalid value");
                        if length > idx + 1 {
                            let b: i32 = values[idx + 1].parse().expect("Invalid value");
                            current = (a / b).to_string();
                            reduced_vec.push(&current);
                         if length >= idx + 2 {
                            reduced_vec.extend_from_slice(&values[idx + 2..length]);        
                        }

                        }
                    }
                    return attempt_line(reduced_vec);
                },
                _ => (),

            }
            match values.iter().position(|&x| x == "*") {
                Some(idx) => {
                    let mut current = String::new();
                    reduced_vec.extend_from_slice(&values[0..idx - 1]);
                    if idx >= 1 {
                        let a: i32 = values[idx - 1].parse().expect("Invalid value");
                        if length > idx + 1 {
                            let b: i32 = values[idx + 1].parse().expect("Invalid value");
                            current = (a * b).to_string();
                            reduced_vec.push(&current);
                         if length >= idx + 2 {
                            reduced_vec.extend_from_slice(&values[idx + 2..length]);        
                        }

                        }
                    }
                    return attempt_line(reduced_vec);
                },
                _ => (),

            }
            match values.iter().position(|&x| x == "+") {
                Some(idx) => {
                    let mut current = String::new();
                    reduced_vec.extend_from_slice(&values[0..idx - 1]);
                    if idx >= 1 {
                        let a: i32 = values[idx - 1].parse().expect("Invalid value");
                        if length > idx + 1 {
                            let b: i32 = values[idx + 1].parse().expect("Invalid value");
                            current = (a + b).to_string();
                            reduced_vec.push(&current);
                         if length >= idx + 2 {
                            reduced_vec.extend_from_slice(&values[idx + 2..length]);        
                        }

                        }
                    }
                    return attempt_line(reduced_vec);
                },
                _ => (),

            }
            match values.iter().position(|&x| x == "-") {
                Some(idx) => {
                    let mut current = String::new();
                    reduced_vec.extend_from_slice(&values[0..idx - 1]);
                    if idx >= 1 {
                        let a: i32 = values[idx - 1].parse().expect("Invalid value");
                        if length > idx + 1 {
                            let b: i32 = values[idx + 1].parse().expect("Invalid value");
                            current = (a - b).to_string();
                            reduced_vec.push(&current);
                         if length >= idx + 2 {
                            reduced_vec.extend_from_slice(&values[idx + 2..length]);        
                        }

                        }
                    }
                    return attempt_line(reduced_vec);
                },
                _ => (),

            }
 
 
 
        },
    }
    return result
}
fn print_intro() {
    let name = r#" _____  
 |  __ \ 
 | |__) |
 |  ___/ 
 | |     
 |_|

Welcome to the Rusty Calculator!

Instructions:
1. Enter a mathematical expression using the following operators:
   - Addition: +
   - Subtraction: -
   - Multiplication: *
   - Division: /

2. Each number and operator must be separated by spaces.
   Example: `3 + 5`, `10 - 2`, `6 * 7`

3. To exit the calculator, type:
   - `exit`
   - `q`

4. If you enter an invalid expression, the calculator will inform you of the error.

Happy calculating! 😊
 "#;
    println!("{}", name)

}
fn main() {
    let mut line  = String::new();
    print_intro();
    loop {
        read_question(& mut line);
        if line.is_empty() {
            continue;
        }
        if (line == "exit") || (line == "q") {
            println!("Thanks for trying this rusty calculator 😁😁😁");
            break;
        }
        let values : Vec<&str> = line.split_whitespace().collect();
        println!("{:#?}", values);
        let answer: i32 = attempt_line(values);
        println!("{}", answer);
        line.clear();
    }
}
