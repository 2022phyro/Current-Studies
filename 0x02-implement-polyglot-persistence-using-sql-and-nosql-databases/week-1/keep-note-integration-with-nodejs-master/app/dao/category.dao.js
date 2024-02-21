const connection  = require('./db');
const sql = connection();

/* constructor to initialize category with category_name, category_description 
and category_creation_date as its properties*/

const Category = (category_name, category_description, category_creation_date) => {
  this.category_name = category_name;
  this.category_description = category_description;
  this.category_creation_date = category_creation_date;
};

/* 
  create should be a function that calls the query function on sql object
  to persist category data in MySQL notesdb schema using insert query
*/

Category.create = (note, result) => {
  sql.query("INSERT INTO Category SET ?", note, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created category: ", { id: res.insertId, ...note });
    return result(null, { id: res.insertId, ...note });
  });
};


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the category by the provided Id from the notesdb schema using select query
*/

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM Category WHERE id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Category with the id
    result({ kind: "not_found" }, null);
  });
};


/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the categories or categories with specific name from the notesdb 
  schema using select query
*/

Category.getAll = (name, result) => {
  let query = "SELECT * FROM Category";
  if (name) {
    query += ` WHERE category_name = '${name}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("categories: ", res);
    result(null, res);
  });
};
/* 
  updateById should be a function that calls query function on sql object 
  to update the category for the given id from the notesdb schema using update query
*/

Category.updateById = (categoryId, category, result) => {
  sql.query(
    "UPDATE Category SET category_name = ?, category_description = ?, category_creation_date = ? WHERE id = ?",
    [category.category_name, category.category_description, category.category_creation_date, categoryId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated category: ", { id: categoryId, ...category });
      result(null, { id: categoryId, ...category });
    }
  );
}
/* 
  remove should be a function that calls query function on sql object 
  to delete the category for the given id from the notesdb schema using delete query
*/
Category.remove = (categoryId, result) => {
  sql.query("DELETE FROM Category WHERE id = ?", categoryId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted category with id: ", categoryId);
    sql.query("DELETE FROM NoteCategory WHERE category_id = ?", categoryId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    result(null, res);
  });
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the categories from the notesdb schema using delete query
*/

Category.removeAll = (result) => {
  sql.query("DELETE FROM Category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.affectedRows} categories`);
    sql.query("DELETE FROM NoteCategory", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    result(null, res);
  });
};

module.exports = Category;
