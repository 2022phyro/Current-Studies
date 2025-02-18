const usv = require('../Users/userService')
const asv = require('./authService')

//import the userService and authService module
//This function will registerUser it will take two parameters
//first the userData second the callback
//call the userService finduser method and also the userService register method
function registerUser(userData,done){
  usv.findUser(userData.email, (err, user) => {
    if (err) {
      done(err)
    } else {
      if (user) {
        done(user)
      } else {
        usv.registerUser(userData, done)
      }
    }
  })
    
}

//This function will loginUser 
//Use the method findUser of userService to first verify and if userfound than call
//the createToken method
function loginUser({ email, password }, done) {
  usv.findUser(email, (err, user) => {
    if (err) {
      done(err)
    } else {
      const verifiedUser = asv.verifyUser({email, password}, user)
      if (verifiedUser) {
        const jwtToken = asv.createJWT(user)
        done(undefined, user)
      } else {
        done({error: "User not verified"})
      }
    }
  })
}

module.exports = {
    registerUser,loginUser

}