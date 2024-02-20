const connection = require('./db');
sql = connection();

/* constructor to initialize reminder with reminder_name, reminder_description and
reminder_creation_date as its properties*/

const Reminder = function() {
  this.name = "Reminder"
};

/* 
  create should be a function that calls the query function on sql object
  to persist reminder data in MySQL notesdb schema using insert query
*/

Reminder.create = function(reminderData, result) {
  sql.query("INSERT INTO Reminder SET ?", reminderData, (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Created reminder:", { id: res.insertId, ...reminderData });
      result(null, { id: res.insertId, ...reminderData });
    }
  });
};


/* 
  findById should be a function that calls the query function on sql object 
  to fetch the reminder by the provided Id from the notesdb schema using select query
*/

Reminder.findById = function(reminderId, result) {
  sql.query("SELECT * FROM Reminder WHERE id = ?", reminderId, (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Found reminder:", reminderId);
      result(null, res[0]);
    }
  });
};


/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the reminders or reminders with specific title from the notesdb 
  schema using select query
*/

Reminder.getAll = function(result) {
  sql.query("SELECT * FROM Reminder", (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Found reminders");
      result(null, res);
    }
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the reminder for the given id from the notesdb schema using update query
*/

Reminder.updateById = function(reminderId, reminderData, result) {
  sql.query("UPDATE Reminder SET ? WHERE id = ?", [reminderData, reminderId], (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Updated reminder:", reminderId);
      result(null, res);
    }
  });
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the reminder for the given id from the notesdb schema using delete query
*/
Reminder.remove = function(reminderId, result) {
  sql.query("DELETE FROM Reminder WHERE id = ?", reminderId, (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Deleted reminder:", reminderId);
      result(null, res);
    }
  });
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the reminders from the notesdb schema using delete query
*/
Reminder.removeAll = function(result) {
  sql.query("DELETE FROM Reminder", (err, res) => {
    if (err) {
      console.error("Error:", err);
      result(err, null);
    } else {
      console.log("Deleted all reminders");
      result(null, res);
    }
  });
};

module.exports = Reminder;
