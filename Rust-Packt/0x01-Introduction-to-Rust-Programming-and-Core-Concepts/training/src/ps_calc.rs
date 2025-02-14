use std::io;

fn check_priority(head: &String, val: &String) -> bool {
    if val == "(" {
        return true;
    }
    if val == ")" && head != "(" {
        return false;
    } else if val == ")" && head == "(" {
        return true;
    }
    let values = ["(", ")", "+", "-", "*", "/", "^"];
    let priorities = [0, 0, 1, 1, 2, 2, 3];
    let index_of_val = values.iter().position(|&r| r == *val).unwrap();
    let index_of_head = values.iter().position(|&r| r == *head).unwrap();
    return priorities[index_of_val] > priorities[index_of_head];
}

fn is_operator (val: &str) -> bool {
    let operators = ["(", ")", "+", "-", "*", "^", "/"];
    operators.contains(&val)
}

fn prep_string(string: String) -> Vec<String> {
    let mut result = vec![];
    let mut sub_str = String::from("");
    for val in string.chars() {
        if val == ' '{
            continue;
        } else if is_operator(&val.to_string()) == false {
            if val.is_numeric() || val == '.' {
                sub_str.push(val);
            } else {
                println!("Invalid input detected");
            }
        } else {
            if sub_str.len() != 0 {
                result.push(sub_str);
                sub_str = "".to_string();
            }
            result.push(val.to_string());
        }
    }
    if sub_str.len() != 0 {
        result.push(sub_str);
    }
    result
}

fn create_postfix_input (stack: Vec<String>) -> Vec<String> {
    let mut check_stack: Vec<String> = vec![];
    let mut result_stack: Vec<String> = vec![];
    for val in stack {
        if is_operator(&val) {
            if check_stack.len() == 0 {
                check_stack.push(val);
                continue;
            }
            let operator = check_stack[check_stack.len() - 1].clone();
            while check_priority(&operator, &val) == false && check_stack.len() > 0 {
                let head = check_stack.pop().unwrap();
                if !(head == "(" || head == ")") {
                    result_stack.push(head);
                }
            }
            check_stack.push(val)
        } else {
            result_stack.push(val);
        }
    }
    while check_stack.len() > 0 {
        let head = check_stack.pop().unwrap();
        if !(head == "(" || head == ")") {
            result_stack.push(head);
        }
    }
   result_stack
}
fn calculate(operand:String, lhs: String, rhs: String) -> f64 {
    let _lhs: f64 = lhs.parse().unwrap();
    let _rhs: f64 = rhs.parse().unwrap();
    match operand.as_str() {
        "+" => {
            return _lhs + _rhs
        },
        "-" => {
            return _lhs - _rhs
        },
        "*" => {
            return _lhs * _rhs;
        },
        "/" => {
            return _lhs / _rhs;
        },
        "^" => {
            return _lhs.powf(_rhs);
        },
        _ => {return 0.0}
    }
}
pub fn eval_postfix(string: String) -> String {
    let prep = prep_string(string);
    let mut postfix = create_postfix_input(prep);
    postfix.reverse();
    let mut count = postfix.len() - 1;
    while postfix.len() > 1 {
        if !is_operator(&postfix[count]) {
            count -= 1;
            continue;
        }
        let lhs = postfix.pop().unwrap();
        let rhs = postfix.pop().unwrap();
        let operand = postfix.pop().unwrap();
        let res = calculate(operand, lhs, rhs);
        postfix.push(res.to_string());
        count = postfix.len() - 1;
    }
    return postfix.pop().unwrap();
}

fn main () {
    // Create a mutable String to store the input
    println!("Enter something:> ");
    loop {
       let mut input = String::new();
       io::stdin().read_line(&mut input)
            .expect("Failed to read input");
        let result = eval_postfix(input.trim().to_string());
        println!("Ans: {}", result);
    }
}
