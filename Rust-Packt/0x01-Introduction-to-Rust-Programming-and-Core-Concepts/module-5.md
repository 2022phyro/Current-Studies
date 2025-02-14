# Implementing Stack
* Two major actions on a stack are the push and pop.
* Stack operates on the First in First Out or FIFO system.
* We can implement a stack using a vec datatype or any other similar datatype..

## Postfix and expression evaluation...
This is an application of stack and the process is to convert the expression into a postfix expression and then use the postfix expression to compute the solution
* Math expressions are made up of operands (numbers, values etc) and operators ( + - * / etc ).
* In postfix, the operator are placed after the operand
* the usual mathematical expressions we know are considered as infix forms...

## Expression evaluation using postfix...algorithm
We can evaluate expressions using postfix using the following rules.
* These are the priorities of the operators: (`+`, `-`) => (`*`, `/`) => `^`
* If the scanned operator is less than or equal to the top of the stack in priority, then we pop the elements till we have a low priority operator
* the popped elements will be added to the postfix expression
* if we have an opening parenthesis, push it to the stac
* if we have a closing parenthesis, pop elements until we reach the opening priority
* if we meet an operator, then add it to the stack
* whatever left in the stack is popped and added to the postfix.

## Express evaluation
* For a postfix string, if we want to evaluate it, we go from left to right
 - if it's an operand, add it to the stack
 - If it's an operator (sign), pop the last two elements from the stack, use the first as the RHS of the operand and the other as the LHS to evaluate...
