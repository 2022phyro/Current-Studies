const todolist = require('./todolist')

//Define a function that gets all the todos from the 
// todolist array declared asynchronously after 2 seconds
getAllTodos = () => {
    return new Promise((resolve,reject)=>{
       setTimeout(() => {
	    return resolve(todolist); 
	}, 500) 
   })     
}
// Define a function to add a todo to the todolist array
createTodo = (todo) => {
   return new Promise((resolve,reject)=>{
	setTimeout(() => {
		if (!todo) {
			reject('No data to be added');
		}
		todolist.push(todo);
		resolve(todolist )
 	}, 500)      
   })
}
module.exports ={
    createTodo,getAllTodos
}
