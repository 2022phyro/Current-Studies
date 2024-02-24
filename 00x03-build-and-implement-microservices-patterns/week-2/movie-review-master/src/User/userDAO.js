require('../dbconfig/dbfile')
const User = require('./userModel')

//create async function saveUser to save user in database taking two parameters
//user object and a callback
//return callback 
const saveUser = async (user, done) => {
    try {
        const newUser = await new User(user).save();
        done(null, newUser)
    } catch (err) {
        console.error(err)
        callback(err, null)
    }
}


//create async function getUserById to get userid from database taking three parameters
//user object, userId and a callback
//return callback 

const getUserById = async (userId, callback) => {
    try {
        const user = await User.findOne({ userId: userId }).lean().exec();
        callback(null, User)
    } catch (err) {
        console.error(err)
        callback(err, null)
    }
}

module.exports = { saveUser, getUserById }