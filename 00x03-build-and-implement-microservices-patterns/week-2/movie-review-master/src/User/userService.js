//import DAO layer
const userDao = require('./userDAO')
function saveUser(user, done) {
  //call DAO saveUser function and pass the parameter
  userDao.saveUser(user,done);
   
}



function getUserById(userId,done){
    //call DAO getUserById function and pass the parameter
    userDao.getUserById(userId,done);
   
}

module.exports = { saveUser,getUserById }