const fs = require('fs');
const users = require('./users.json')
const store = './src/Users/users.json'
//This method will findUser
function findUser(email,done){
    const user = users.find((user) => user.email == email)
    if (user) {
        return done(undefined, user)
    } else {
        return done("User not found")
    }
   
}

//This method will register user
function registerUser(userData,done){
   users.push(userData)
   fs.writeFile(store, JSON.stringify(users), 'utf-8', (err) => {
    if (err) {
        return done("An error occurred")
    } else {
        return done(undefined, userData)
    }
   })
    //call fileWrite method and write the user in json file
  
}

module.exports = {
    findUser,registerUser
}