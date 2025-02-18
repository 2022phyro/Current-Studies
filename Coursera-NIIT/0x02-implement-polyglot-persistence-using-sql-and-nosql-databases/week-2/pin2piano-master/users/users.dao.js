const { v4: uuidv4 } = require("uuid");
const Users = require("./users.entity");
/* 
  saveUser should be a function that calls the save() function on Users Model 
  to persist user data in MongoDB Users collection of shoppingcartDB
*/
const saveUser = (userReq, done) => {
  userReq.userId = uuidv4();
  const user = new Users(userReq);
  user.save((err, savedUser) => {
    if (err) {
      return done(err);
    }
    return done(null, savedUser);
  });
}

/* 
  findUsers should be a function that calls the find() function on Users Model 
  to fetch all documents from Users collection of shoppingcartDB
*/
const findUsers = (done) => {
  Users.find().lean().exec((err, results) => {
    if (err) {
      return done(err);
    }
    return done(null, results);
  });
}

/* 
  getUserByEmail should be a function that calls the findOne() function on Users Model 
  to fetch User document from Users collection of shoppingcartDB,
  containing data of Users for given email
*/
const getUserByEmail = (email, done) => {
  Users.findOne({ email: email }).lean().exec((err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
};

/* 
  getUserById should be a function that calls the findOne() function on Users Model 
  to fetch User document from Users collection of shoppingcartDB,
  containing data of Users for given userId
*/
const getUserById = (userId, done) => {
  Users.findOne({ userId: userId }).lean().exec((err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
};

/* 
  updateUserDetails should be a function that calls the findOneAndUpdate() 
  function on Users Model that fetches user by id from Products collection of shoppingcartDB and updates it
*/
const updateUserDetails = (userId, updatedUser, done) => {
  Users.findOneAndUpdate({ userId: userId }, updatedUser, { new: true }, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
};

module.exports = {
  saveUser,
  findUsers,
  getUserByEmail,
  updateUserDetails,
  getUserById
}