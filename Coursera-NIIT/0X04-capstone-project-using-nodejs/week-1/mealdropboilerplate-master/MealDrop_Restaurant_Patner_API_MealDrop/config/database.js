const mongoose = require("mongoose");

const { DATABASE } = process.env;
// const DB = process.env.DATABASE.replace(
//     '<password>',
//     process.env.DATABASE_PASSWORD
//   );
exports.connect = () => {
    mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Database connection error, Exiting...!');
        console.log(err);
        process.exit(1);
    });
}
