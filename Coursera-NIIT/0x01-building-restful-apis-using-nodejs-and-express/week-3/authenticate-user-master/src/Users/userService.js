//import dao layer
const dao = require('./userDAO')
function findUser(email,done){
    return dao.findUser(email, done);
    //call the userdao finduser method
    
}

function registerUser(userData,done){
    return dao.registerUser(userData, done);
    //call the userdao registeruser method
   
}


module.exports={
    findUser, registerUser
}