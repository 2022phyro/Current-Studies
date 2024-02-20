const connection  = require('./db');
sql = connection();

/* constructor to initialize category with category_name, category_description 
and category_creation_date as its properties*/

const Category = function() {
  this.sql = sql
};

/* 
  create should be a function that calls the query function on sql object
  to persist category data in MySQL notesdb schema using insert query
*/

Category.create = function(categoryData, result) {
  // Execute the SQL query to insert a new category into the database
  sql.query("INSERT INTO Category SET ?", categoryData, function(err, res) {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      console.log("Created category:", { id: res.insertId, ...categoryData });
      result(null, { id: res.insertId, ...categoryData });
    }
  });
};


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the category by the provided Id from the notesdb schema using select query
*/

Category.findById = function(categoryId, result) {
  sql.query("SELECT * FROM Category WHERE id = ?", categoryId, (err, res) => {
    if (err) {
      console.error("Error", err)
      result(err, null)
    } else {
      console.log("FOund item", categoryId)
      result(null, res[0])
    }
  })
};


/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the categories or categories with specific name from the notesdb 
  schema using select query
*/

Category.getAll = function(result) {
  sql.query("SELECT * FROM Category", (err, res) => {
    if (err) {
      console.error("Error", err)
      result(err, null)
    } else {
      console.log("Found item")
      result(null, res)
    }
  })
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the category for the given id from the notesdb schema using update query
*/

Category.updateById = function(categoryId, categoryData, result) {
  // Execute the SQL query to update the category by categoryId
  sql.query("UPDATE Category SET ? WHERE id = ?", [categoryData, categoryId], (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Updated category:", categoryId);
      result(null, res); // Return the result of the update operation
    }
  });
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the category for the given id from the notesdb schema using delete query
*/
Category.remove = function(categoryId, result) {
  sql.query("DELETE FROM Category WHERE id = ?", categoryId, (err, res) => {
    if (err) {
      console.error("Error", err)
      result(err, null)
    } else {
      console.log("Deleted item", categoryId)
      result(null, res)
    }
  })
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the categories from the notesdb schema using delete query
*/

Category.removeAll = function(categoryId, result) {
  sql.query("DELETE FROM Category", (err, res) => {
    if (err) {
      console.error("Error", err)
      result(err, null)
    } else {
      console.log("Deleted all")
      result(null, res[0])
    }
  })
};

module.exports = Category;
