const categoryDAO = require('../dao/category.dao')

/* Create and Save a new Category by calling categoryDAO create method.
   Depending on the return value, it should return the results or the error message*/  
   exports.create = (categoryData, result) => {
      return categoryDAO.create(categoryData, result)
   };

   /* Retrieve all Categories by calling categoryDAO getAll method.
    Depending on the return value, it should return the results or the error message*/  
   exports.getAll = (result) => {
      return categoryDAO.getAll(result)
   };
   
   /* Find a single Category by Id by calling categoryDAO findById method.
   Depending on the return value, it should return the results or the error message*/  
   exports.findById = (categoryId, result) => {
      return categoryDAO.findById(categoryId, result)
   }; 
   
   /* Update a Category identified by the id by calling categoryDAO updateById method.
   Depending on the return value, it should return the results or the error message*/   
   exports.updateById = (categoryId, categoryData, result) => {
      return categoryDAO.updateById(categoryId, categoryData, result)

   };
   
   /* Delete a Category with the specified id by calling categoryDAO remove method.
   Depending on the return value, it should return the results or the error message*/  
   exports.remove = (categoryId, result) => {
      return categoryDAO.remove(categoryId, result)
   };
   
   /* Delete all Categories by calling categoryDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/  
   exports.removeAll = (result) => {
      return categoryDAO.removeAll(result)
   };