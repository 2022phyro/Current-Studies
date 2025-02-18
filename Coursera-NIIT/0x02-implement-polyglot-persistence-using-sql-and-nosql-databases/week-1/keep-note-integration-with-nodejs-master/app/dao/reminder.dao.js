const connection = require('./db');
sql = connection();

/* constructor to initialize reminder with reminder_name, reminder_description and
reminder_creation_date as its properties*/

const Reminder = (reminder_name, reminder_descr, reminder_creation_date, reminder_type) => {
  this.reminder_name = reminder_name;
  this.reminder_descr = reminder_descr;
  this.reminder_creation_date = reminder_creation_date;
  this.reminder_type = reminder_type;
};

/* 
  create should be a function that calls the query function on sql object
  to persist reminder data in MySQL notesdb schema using insert query
*/

Reminder.create = (reminder, result) => {
  sql.query("INSERT INTO Reminder SET ?", reminder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created reminder: ", { id: res.insertId, ...reminder });
    return result(null, { id: res.insertId, ...reminder });
  });
}


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the reminder by the provided Id from the notesdb schema using select query
*/

Reminder.findById = (reminderId, result) => {
  sql.query(`SELECT * FROM Reminder WHERE id = ${reminderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found reminder: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Reminder with the id
    result({ kind: "not_found" }, null);
  });
}


/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the reminders or reminders with specific title from the notesdb 
  schema using select query
*/

Reminder.getAll = (name, result) => {
  let query = "SELECT * FROM Reminder";
  if (title) {
    query += ` WHERE reminder_name = ${name}`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("reminders: ", res);
    result(null, res);
  });
}

/* 
  updateById should be a function that calls query function on sql object 
  to update the reminder for the given id from the notesdb schema using update query
*/

Reminder.updateById = (id, reminder, result) => {
  sql.query(
    "UPDATE Reminder SET ? WHERE id = ?", [reminder, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Reminder with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated reminder: ", { id: id, ...reminder });
      result(null, { id: id, ...reminder });
    }
  );
}


/* 
  remove should be a function that calls query function on sql object 
  to delete the reminder for the given id from the notesdb schema using delete query
*/
Reminder.remove = (id, result) => {
  sql.query("DELETE FROM Reminder WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Reminder with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted reminder with id: ", id);
    sql.query("DELETE FROM NoteReminder WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    result(null, res);
  });
}


/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the reminders from the notesdb schema using delete query
*/
Reminder.removeAll = (result) => {
  sql.query("DELETE FROM Reminder", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(`deleted ${res.affectedRows} reminders`);
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

module.exports = Reminder;
