const noteDAO = require('../dao/note.dao')

/* Create and Save a new Note by calling noteDAO create method.
   Depending on the return value, it should return the results or the error message*/  
   exports.create = function(newNote, result) {
      noteDAO.create(newNote, (err, res) => {
          if (err) {
              console.log('error: ', err);
              result(err, null);
          } else {
            console.log("yaya")
              result(null, res);
          }
      });
  };   

   /* Retrieve all notes by calling noteDAO getAll method.
    Depending on the return value, it should return the results or the error message*/  
    exports.getAll = function(title, result) {
      noteDAO.getAll(title, (err, res) => {
          if (err) {
              console.log('error: ', err);
              result(null, err);
          } else {
              result(null, res);
          }
      });
  };
  

   /* Find a single Note by Id by calling noteDAO findById method.
   Depending on the return value, it should return the results or the error message*/  
   exports.findById = (noteId, cb) => {
      noteDAO.findById(noteId, (err, data) => {
         if (err) {
         cb(err, null);
         return;
         }
         cb(null, data);
      });
   };
   
   /* Update a Note identified by the id by calling noteDAO updateById method.
   Depending on the return value, it should return the results or the error message*/   
   exports.updateById = (noteId, note, cb) => {
      noteDAO.updateById(noteId, note, (err, data) => {
         if (err) {
         cb(err, null);
         return;
         }
         cb(null, data);
      });
   };
   
   /* Delete a Note with the specified id by calling noteDAO remove method.
   Depending on the return value, it should return the results or the error message*/  
   exports.remove = (noteId, cb) => {
      noteDAO.remove(noteId, (err, data) => {
         if (err) {
         cb(err, null);
         return;
         }
         cb(null, data);
      });
   };
   
   /* Delete all Notes by calling noteDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/  
   exports.removeAll = (cb) => {
      noteDAO.removeAll((err, data) => {
         if (err) {
         cb(err, null);
         return;
         }
         cb(null, data);
      });
   };