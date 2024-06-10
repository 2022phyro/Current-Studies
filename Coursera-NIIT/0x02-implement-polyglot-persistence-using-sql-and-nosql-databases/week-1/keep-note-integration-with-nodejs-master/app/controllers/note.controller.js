const noteService = require("../service/note.service.js");

/* Call the create method of noteService object and return the result back*/
exports.create = (newNote, result) => {
    noteService.create(newNote, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

/* Call the getAll method of noteService object and return the result back */
exports.findAll = (title = null, result) => {
    noteService.getAll(title , (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

/* Call the findById method of noteService object and return the result back */
exports.findOne = (noteId, result) => {
    noteService.findById(noteId, (err, data) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, data);
  });
};

/* Call the updateById method of noteService object and return the result back */
exports.update = (noteId, note, result) => {
    noteService.updateById(noteId, note, (err, data) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, data);
  });
}

/* Call the remove method of noteService object and return the result back */
exports.delete = (noteId, result) => {
    noteService.remove(noteId, (err, data) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, data);
  });
}

/* Call the removeAll method of noteService object and return the result back */
exports.deleteAll = (result) => {
    noteService.removeAll((err, data) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, data);
  });
}
