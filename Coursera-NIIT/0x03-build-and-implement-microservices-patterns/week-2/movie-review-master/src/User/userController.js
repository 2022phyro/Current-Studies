

//import Service layer
const userService = require('./userService')
function saveUser(user, done) {
    //call service saveUser function and pass the parameter
    userService.saveUser(user,done);    
 }
 
 
 
 function getUserById(userId,done){
      //call service getUserById function and pass the parameter
     userService.getUserById(userId,done);
    
 }
module.exports = {saveUser,getUserById}