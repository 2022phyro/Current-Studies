const mongoose = require("mongoose");

const { MONGO_URI } = process.env
const Mongo_URI = MONGO_URI || 'mongodb://localhost:27017/usermoviesdb';
exports.connect = () => {
  mongoose.connect(Mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Database connection error, Exiting...!');
    console.log(err);
    process.exit(1);
  });

};
