const connection = require('./db');

/*
variable to store connection object to perform CRUD operations using connection module
*/
var sql = connection();

/* constructor to initialize note with note_title, note_content, note_status,
 note_creation_date,note_id and reminder_id  as its properties*/
const Note = function (note_title, note_content, note_status, note_creation_date, note_id, reminder_id) {
  this.note_title = note_title
  this.note_content = note_content
  this.note_status = note_status
  this.note_creation_date = note_creation_date
  this.note_id = note_id
  this.reminder_id = reminder_id
};

/* 
  create should be a function that calls the query function on sql object to persist note 
  data in MySQL notesdb schema using insert query. Write separate insert queries to insert row
  in Note, NoteCategory and NoteReminder tables
*/

Note.create = function (newNote, result) {
  let category_id = newNote.category_id
  let reminder_id = newNote.reminder_id
  delete newNote.category_id
  delete newNote.reminder_id
  sql.query("INSERT INTO Note SET ?", newNote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newNote.id = res.insertId;
    console.log("created note: ", newNote.id);
    if (category_id) {
      sql.query("INSERT INTO NoteCategory SET ?", { note_id: newNote.id, category_id: category_id }, (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
      });
    }
    if (reminder_id) {
      sql.query("INSERT INTO NoteReminder SET ?", { note_id: newNote.id, reminder_id: reminder_id }, (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
      });
    }
    return result(null, { id: res.insertId, ...newNote });
  });
};


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the note by the provided Id from the notesdb schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables
*/

Note.findById = (noteId, result) => {
  sql.query(`
  SELECT n.note_id, n.note_title, n.note_content, n.note_status,
  n.note_creation_date, 
  GROUP_CONCAT(DISTINCT nc.category_id) AS category_ids, 
  GROUP_CONCAT(DISTINCT nr.reminder_id) AS reminder_ids FROM Note n 
  LEFT JOIN NoteCategory nc ON n.note_id = nc.note_id LEFT JOIN NoteReminder nr 
  ON n.note_id = nr.note_id WHERE n.note_id = ? GROUP BY n.note_id`, [noteId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found note: ", res[0]);
      let note = res[0]
      note.category_ids = note.category_ids? note.category_ids.split(',') : []
      note.reminder_ids = note.reminder_ids? note.reminder_ids.split(','): []
      result(null, note);
      return;
    }
  });
};

/* 
  getAll should be a function that calls the query function on sql object to fetch all 
  the notes or notes with specific title from the notesdb   schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables.
*/

Note.getAll = (title, result) => {
  let query = `
  SELECT n.note_id, n.note_title, n.note_content, n.note_status,
  n.note_creation_date, 
  GROUP_CONCAT(DISTINCT nc.category_id) AS category_ids, 
  GROUP_CONCAT(DISTINCT nr.reminder_id) AS reminder_ids FROM Note n 
  LEFT JOIN NoteCategory nc ON n.note_id = nc.note_id LEFT JOIN NoteReminder nr 
  ON n.note_id = nr.note_id GROUP BY n.note_id`;
  query += title ? title: "";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      const final = res.map((note) => {
        note.category_ids = note.category_ids? note.category_ids.split(',') : []
        note.reminder_ids = note.reminder_ids? note.reminder_ids.split(','): []
        return note
      });
      result(null, final);
      return;
    }
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the note for the given id from the notesdb schema using update query
*/

Note.updateById = (noteId, note, result) => {
  sql.query(
    "UPDATE Note SET note_title = ?, note_content = ?, note_status = ? WHERE note_id = ?",
    [note.note_title, note.note_content, note.note_status, noteId],
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
      console.log("updated note: ", { id: noteId, ...note });
      result(null, { id: noteId, ...note });
    }
  );
}

/* 
  remove should be a function that calls query function on sql object 
  to delete the note for the given id from the notesdb schema using delete query
*/
Note.remove = (noteId, result) => {
  sql.query("DELETE FROM Note WHERE note_id = ?", noteId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    sql.query("DELETE FROM NoteCategory WHERE note_id = ?", noteId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    sql.query("DELETE FROM NoteReminder WHERE note_id = ?", noteId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    console.log("deleted note with id: ", noteId);
    result(null, res);
  });
}

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the notes from the notesdb schema using delete query
*/
Note.removeAll = (result) => {
  sql.query("DELETE FROM Note", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.affectedRows} notes`);
    sql.query("DELETE FROM NoteCategory", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    sql.query("DELETE FROM NoteReminder", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    result(null, res);
  });
}

module.exports = Note;