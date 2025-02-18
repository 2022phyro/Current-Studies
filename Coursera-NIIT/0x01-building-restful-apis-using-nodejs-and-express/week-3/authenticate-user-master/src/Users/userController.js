const usv = require('./userService')

//import userService


function findUser(email,done){
    //call userService findUser method and pass the parameters
   return usv.findUser(email, done)
}

module.exports = {
    findUser
}