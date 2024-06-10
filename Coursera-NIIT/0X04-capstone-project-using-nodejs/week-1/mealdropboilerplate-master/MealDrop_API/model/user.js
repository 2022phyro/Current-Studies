const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true},
    zipcode: { type: String, required: true },
    signed_up_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);