const users = require('./users')
// Define a function that returns a promise to get all users and return a promise
const getAllUsers = ()=>{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			return resolve(users)
		}, 500);
	})
}
//Define a function to create a new user and return a promise
const createUser = (user) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!user) {
				return reject("No user to be added");
			}
			users.push(user);
			return resolve(user)
		});
	})
    
 }
// Define a function to get a user by id and return a promise
const getAUserByID = (id) =>{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const result = users.filter((u) => u.id === id);
			if (result && result.length > 0) {
				return resolve(result);
			} else  {
				return reject("User does not exist");
			}		
		}, 500);
	})
    
}
// Define an async function that calls the createUser and getAllUsers function using await 
// and returns all users
const displayUsers = async (user) => {
   const allUsers = null;
   await createUser(user)
    allUsers = await getAllUsers()
   return allUsers; 
}
//Define a async  function to display a specific user by Id
// return the user 
const displayAUser = async(id) =>{
    const user = null;
    user = await getAUserByID(id);
    return user;
}

module.exports = {
    getAllUsers, getAUserByID, createUser, displayAUser, displayUsers
} 
