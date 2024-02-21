const categoryDAO = require('../dao/category.dao')

/* Create and Save a new Category by calling categoryDAO create method.
   Depending on the return value, it should return the results or the error message*/  
exports.create = (newCategory, result) => {
    categoryDAO.create(newCategory, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Retrieve all categories by calling categoryDAO getAll method.
 Depending on the return value, it should return the results or the error message*/  
exports.getAll = (name, result) => {
    categoryDAO.getAll(name, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Find a single Category by Id by calling categoryDAO findById method.
Depending on the return value, it should return the results or the error message*/  
exports.findById = (categoryId, result) => {
    categoryDAO.findById(categoryId, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Update a Category identified by the id by calling categoryDAO updateById method.
Depending on the return value, it should return the results or the error message*/   
exports.updateById = (id, category, result) => {
    categoryDAO.updateById(id, category, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Delete a Category with the specified id by calling categoryDAO remove method.
Depending on the return value, it should return the results or the error message*/  
exports.remove = (id, result) => {
    categoryDAO.remove(id, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Delete all Categories by calling categoryDAO removeAll method.
Depending on the return value, it should return the results or the error message*/  
exports.removeAll = (result) => {
    categoryDAO.removeAll((err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};