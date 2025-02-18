const categoryService = require("../service/category.service.js");

/* Call the create method of categoryService object and return the result back*/
exports.create = (newCategory, result) => {
    categoryService.create(newCategory, (err,result) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Call the getAll method of categoryService object and return the result back */
exports.findAll = (name = null, result) => {
    categoryService.getAll(name, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
/* Call the findById method of categoryService object and return the result back */
exports.findOne = (categoryId, result) => {
    categoryService.findById(categoryId, (err, data) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, data);
    });
};

/* Call the updateById method of categoryService object and return the result back */
exports.update = (categoryId, category, result) => {
    categoryService.updateById(categoryId, category, (err, data) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, data);
    });
};

/* Call the remove method of categoryService object and return the result back */
exports.delete = (categoryId, result) => {
    categoryService.remove(categoryId, (err, data) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, data);
    });
};

/* Call the removeAll method of categoryService object and return the result back */
exports.deleteAll = (result) => {
    categoryService.removeAll((err, data) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, data);
    });
};