const noteDAO = require('../dao/note.dao')

/* Create and Save a new Note by calling noteDAO create method.
   Depending on the return value, it should return the results or the error message*/  
   exports.create = (noteData, result) => {
      return noteDAO.create(noteData, result)
   };

   /* Retrieve all notes by calling noteDAO getAll method.
    Depending on the return value, it should return the results or the error message*/  
   exports.getAll = (result) => {
      return noteDAO.getAll(result)
   };
   
   /* Find a single Note by Id by calling noteDAO findById method.
   Depending on the return value, it should return the results or the error message*/  
   exports.findById = (noteId, result) => {
      return noteDAO.findById(noteId, result)
   }; 
   
   /* Update a Note identified by the id by calling noteDAO updateById method.
   Depending on the return value, it should return the results or the error message*/   
   exports.updateById = (noteId, noteData, result) => {
      return noteDAO.updateById(noteId, noteData, result)

   };
   
   /* Delete a Note with the specified id by calling noteDAO remove method.
   Depending on the return value, it should return the results or the error message*/  
   exports.remove = (noteId, result) => {
      return noteDAO.remove(noteId, result)
   };
   
   /* Delete all Notes by calling noteDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/  
   exports.removeAll = (noteId, result) => {
      return noteDAO.remove(noteId, result)
   };