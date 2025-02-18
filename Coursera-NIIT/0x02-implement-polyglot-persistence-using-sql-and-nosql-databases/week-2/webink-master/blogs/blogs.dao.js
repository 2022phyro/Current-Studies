const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = "blogmanagementDB";

const saveBlog = async function (blog, done) {
    // establish connection with mongo
    await client.connect();
    // insert blog document to blogs collection of blogmanagementDB database
    const insertResult = await client.db(dbName).collection("blogs").insertOne(blog);

    // store the insert command result in insertResult

    if (!insertResult) {
        console.log("Error in saving blog, ERROR::");

        // EXITING
        return done("Failed to save blog due to data errors..!");
    }

    // EXITING with results
    return done(null, blog);

}

const findBlogs = async function (done) {
    // establish connection with mongo
    await client.connect();

    // fetch all blogs from blogs collection of blogmanagementDB database

    const findResult = await client.db(dbName).collection("blogs").find({}).toArray();
    
    // store the find command result in findResult

    if (!findResult) {
        console.log("Error in fetching blogs");

        // EXITING
        return done("Failed to fetch blogs due to data errors..!");
    }

    // EXITING with results
    return done(null, findResult);
}


module.exports = {
    saveBlog,
    findBlogs,
}