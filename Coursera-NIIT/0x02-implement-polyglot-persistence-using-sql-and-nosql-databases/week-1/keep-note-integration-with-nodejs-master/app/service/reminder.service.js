const reminderDAO = require('../dao/reminder.dao')

/* Create and Save a new Reminder by calling reminderDAO create method.
   Depending on the return value, it should return the results or the error message*/  
exports.create = (newReminder, result) => {
   reminderDAO.create(newReminder, (err, res) => {
      if (err) {
         result(err, null);
      } else {
         result(null, res);
      }
   });
};

   /* Retrieve all reminders by calling reminderDAO getAll method.
    Depending on the return value, it should return the results or the error message*/  
exports.getAll = (name, result) => {
   reminderDAO.getAll(name, (err, res) => {
      if (err) {
         result(err, null);
      } else {
         result(null, res);
      }
   });
};
   
   /* Find a single Reminder by Id by calling reminderDAO findById method.
   Depending on the return value, it should return the results or the error message*/  
exports.findById = (reminderId, result) => {
   reminderDAO.findById(reminderId, (err, res) => {
      if (err) {
         result(err, null);
      } else {
         result(null, res);
      }
   });
};
   
/* Update a Reminder identified by the id by calling reminderDAO updateById method.
Depending on the return value, it should return the results or the error message*/   
exports.updateById = (id, reminder, result) => {
   reminderDAO.updateById(id, reminder, (err, res) => {
      if (err) {
         result(err, null);
      } else {
         result(null, res);
      }
   });
};

/* Delete a Reminder with the specified id by calling reminderDAO remove method.
Depending on the return value, it should return the results or the error message*/  
exports.remove = (id, result) => {
   reminderDAO.remove(id, (err, res) => {
      if (err) {
         result(err, null);
      } else {
         result(null, res);
      }
   });
};

/* Delete all Reminders by calling reminderDAO removeAll method.
Depending on the return value, it should return the results or the error message*/  
exports.removeAll = (result) => {
   reminderDAO.removeAll((err, res) => {
      if (err) {
         result(err, null);
      } else {
         result(null, res);
      }
   });
};