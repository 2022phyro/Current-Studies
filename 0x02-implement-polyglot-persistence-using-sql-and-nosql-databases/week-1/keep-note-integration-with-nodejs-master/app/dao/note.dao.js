const connection  = require('./db');

console.log(connection)
/*
variable to store connection object to perform CRUD operations using connection module
*/
// const sql = connection();
// console.log(sql)
/* constructor to initialize note with note_title, note_content, note_status,
 note_creation_date,note_id and reminder_id  as its properties*/
const ms = require('mysql')
const sql = ms.createConnection({
  host: '35.175.129.108',
  user: 'afam',
  password: 'afam1234#',
  db: "notesdb",
  port: 3306
})
const Note = function(id, title, content, status, creation_date, category_id, reminder_id) {
  this.note_id = id
  this.note_title = title
  this.note_content = content
  this.note_status = status
  this.note_creation_date = creation_date,
  this.category_id = category_id
  this.reminder_id = reminder_id
};

/* 
  create should be a function that calls the query function on sql object to persist note 
  data in MySQL notesdb schema using insert query. Write separate insert queries to insert row
  in Note, NoteCategory and NoteReminder tables
*/

Note.create = function(noteData, result) {
  const rem = noteData.reminder_id
  const cg = noteData.category_id

  delete noteData.reminder_id
  delete noteData.category_id
  sql.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err)
      result(err)
    } else {
      console.log("Successfully connected")
    }
    sql.query("INSERT INTO Note SET ?", noteData, function(err, res) {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        const id = res.insertedId
        console.log("Created note:", { id: res.insertId, ...noteData });
        if (cg) {
          sql.query("INSERT INTO NoteCategory SET ?", {note_id: id, category_id: cg}, (err, res) => {
            if (err) {
              result(err, null)
            } else {
              console.log("Successfully created category")
            }
          });
        }
        if (rem) {
          sql.query("INSERT INTO NoteReminder SET ?", {note_id: id, reminder_id: rem}, (err, res) => {
            if (err) {
              result(err, null)
            } else {
              console.log("Successfully created reminder")
            }
          })
        }
        result(null, { id: res.insertId, ...noteData });
      }
    });
  })
};
/* 
  findById should be a function that calls the query function on sql object 
  to fetch the note by the provided Id from the notesdb schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables
*/

Note.findById = function(noteId, result) {
  sql.query("SELECT * FROM Note WHERE id = ?", noteId, (err, res) => {
    if (err) {
      console.error("Error", err)
      result(err, null)
    } else {
      console.log("Found item", noteId)
      result(null, res[0])
    }
  })
};



/* 
  getAll should be a function that calls the query function on sql object to fetch all 
  the notes or notes with specific title from the notesdb   schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables.
*/

Note.getAll = function(result) {
  sql.query("SELECT * FROM Note", (err, res) => {
    if (err) {
      console.error("Error", err)
      result(err, null)
    } else {
      console.log("Found items")
      result(null, res)
    }
  })
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the note for the given id from the notesdb schema using update query
*/

Note.updateById = function(noteId, noteData, result) {
  const rem = noteData.reminder_id
  const cg = noteData.category_id

  delete noteData.reminder_id
  delete noteData.category_id
  sql.query("UPDATE Note SET ? WHERE id = ?", [noteData, noteId], (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Updated category:", noteId);
      if (cg) {
        sql.query("INSERT INTO NoteCategory SET ?", {note_id: id, category_id: cg}, (err, res) => {
          if (err) {
            result(err, null)
          } else {
            console.log("Successfully created category")
          }
        });
      }
      if (rem) {
        sql.query("INSERT INTO NoteReminder SET ?", {note_id: id, reminder_id: rem}, (err, res) => {
          if (err) {
            result(err, null)
          } else {
            console.log("Successfully created reminder")
          }
        })
      }
      result(null, res);
    }
  });
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the note for the given id from the notesdb schema using delete query
*/
Note.remove = function(noteId, result) {
  sql.query("DELETE FROM NoteCategory WHERE note_id = ?", noteId, (err, res) => {
    if (err) {
      console.error("Error", err)
      return result(err, null)
    } else {
      console.log("Deleted reminders")
    }
  })
  sql.query("DELETE FROM NoteReminder WHERE note_id = ?", noteId, (err, res) => {
    if (err) {
      console.error("Error", err)
      return result(err, null)
    } else {
      console.log("Deleted reminders")
    }
  })
  sql.query("DELETE FROM Note WHERE id = ?", noteId, (err, res) => {
    if (err) {
      console.error("Error", err)
      return result(err, null)
    } else {
      console.log("Deleted item", noteId)
      result(null, res)
    }
  })
};
/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the notes from the notesdb schema using delete query
*/
Note.removeAll = function(noteId, result) {
  sql.query("DELETE FROM NoteCategory", (err, res) => {
    if (err) {
      console.error("Error", err)
      return result(err, null)
    } else {
      console.log("Deleted all categories")
    }
  })
  sql.query("DELETE FROM NoteReminder", (err, res) => {
    if (err) {
      console.error("Error", err)
      return result(err, null)
    } else {
      console.log("Deleted all notes reminders")
    }
  })
  sql.query("DELETE FROM Note", (err, res) => {
    if (err) {
      console.error("Error", err)
      result(err, null)
    } else {
      console.log("Deleted all")
      result(null, "deleted")
    }
  })
};

module.exports = Note;