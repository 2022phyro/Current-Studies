/**
 * Linked lists have a last in first out structure hence appending would replace the previous head,
 * and popping will remove the previous list..
 * we can add other functions like clear, traverse, loop, etc.
 */

struct Node {
    element: i32,
    next: Option<Box<Node>>,
}

impl Node {
    fn new(elem: &i32) -> Self {
        Node { elem, None }
    }

    fn add() -> {

    }
    fn pop() {

    } 
    fn print() {

    }
}
