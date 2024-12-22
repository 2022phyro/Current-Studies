use std::io::{stdin, stdout, Write};
static OPS: [&str; 4] = ["/", "*", "+", "-"];

fn read_question(line: &mut String) {
    print!("\x1b[33mPhyro> \x1b[0m");
    let _=stdout().flush();
    stdin().read_line(line).expect("Did not enter a correct string. Please remember the instructions");
}

fn return_num_or_none(text: &str) -> Option<f64> {
    text.parse().ok()
}
fn process_values<'a>(op: &str, val: &Vec<&'a str>, heap: &mut Vec<String>) -> Result<f64, Box<dyn std::error::Error>> {
    let length = val.len();
    if let Some(i) = val.iter().position(|x| *x == op) {
     heap.extend(val[0..i - 1].iter().map(|&s| s.to_string()));
     if i >= 1 {
        let a: f64 = val[i - 1].parse()?;
        if i + 1 == length {
            return Err("Syntax Error!".into());
        }
        let b: f64 = val[i + 1].parse()?;
        if b == 0.0 && op == "/" {
            return Err("Zero division error".into());
        }
        let current = match op {
            "/" => a / b,
            "*" => a * b,
            "+" => a + b,
            "-" => a - b,
            _ => return Err("Invalid operation".into())
        };
        heap.push(current.to_string());
        if length >= i + 2 {
                heap.extend(val[i + 2..length].iter().map(|&s| s.to_string()));
        }
            return Ok(current);
        }
    }
    return Err("Syntax Error!".into());
}
fn attempt_line(values: Vec<&str>) -> Result<f64, Box<dyn std::error::Error>>{
    let length = values.len();
    let mut heap = Vec::new();
    let mut result: Result<f64, Box<dyn std::error::Error>> = Err("Hakuna".into());

   match length {
        0 => return Ok(0.0),
        1 => {
         if let Some(num) = return_num_or_none(values[0]) {
                return Ok(num);
            } else {
                return Err("Invalid Number".into());
            }
        },
        _ => {
            for op in &OPS {
                result = process_values(op, &values, &mut heap);
                if result.is_ok() {
                    //println!("{:?}", heap);
                    return attempt_line(heap.iter().map(|s| s.as_str()).collect());
                }
            };
        },
   }
    result
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

4. If you enter an invalid expression, the calculator will inform you of syntax error. Please be meaningful.

Happy calculating! 😊
 "#;
    println!("\x1b[36m{}\x1b[0m", name)

}
fn main() {
    print_intro();
    loop {
        let mut line  = String::new();
        read_question(& mut line);
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        if (line == "exit") || (line == "q") {
            println!("Thanks for trying this rusty calculator 😁😁😁");
            break;
        }
        let values : Vec<&str> = line.split_whitespace().collect();
        match attempt_line(values) {
            Ok(num) => println!("\x1b[32m{}\x1b[0m", num),
            Err(err) => println!("\x1b[31m{}\x1b[0m", err),
        }
    }
}
