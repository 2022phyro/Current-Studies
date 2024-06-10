const mongoose = require('mongoose');

/*
Define Schema for Users with following fields with type and validation criteria as specified in the format:
[Field :: Type :: Validation Criteria]

UserId :: String :: Mandatory and Unique, 
UserName :: String :: Mandatory, 
Email :: String :: Mandatory, 
OrdersPlaced :: Number :: Mandatory with Default Value 0, 
Tags :: Array :: Mandatory, 
Description :: String :: Mandatory with Default Value Empty String, 
UpdatedOn :: Date :: Mandatory with Default Value Current Date, 
UpdatedBy :: String :: Mandatory
*/

const schema = mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    ordersPlaced: {type: Number, required: true, default: 0},
    tags: {type: Array, required: true},
    description: {type: String, required: true, default: ""},
    updatedOn: {type: Date, required: true, default: Date.now},
    updatedBy: {type: String, required: true}
}, {
    collection: 'users'
});

module.exports = mongoose.model('users', schema);
