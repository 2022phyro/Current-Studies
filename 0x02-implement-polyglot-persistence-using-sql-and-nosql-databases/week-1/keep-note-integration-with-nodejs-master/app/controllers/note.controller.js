const noteService = require("../service/note.service.js");

/* Call the create method of noteService object and return the result back*/
exports.create = (noteData, result) => {
    return noteService.create(noteData, result)
 };

/* Call the getAll method of noteService object and return the result back */
exports.findAll = (result) => {
    return noteService.getAll(result)
 };;

/* Call the findById method of noteService object and return the result back */
exports.findOne = (noteId, result) => {
    return noteService.findById(noteId, result)
 };

/* Call the updateById method of noteService object and return the result back */
exports.update = (noteId, noteData, result) => {
    return noteService.updateById(noteId, noteData, result)

 };

/* Call the remove method of noteService object and return the result back */
exports.delete = (noteId, result) => {
    return noteService.remove(noteId, result)
 };

/* Call the removeAll method of noteService object and return the result back */
exports.deleteAll = (noteId, result) => {
    return noteService.remove(noteId, result)
};
