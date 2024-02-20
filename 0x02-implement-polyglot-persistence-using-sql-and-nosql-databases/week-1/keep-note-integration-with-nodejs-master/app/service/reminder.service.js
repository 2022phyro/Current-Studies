const reminderDAO = require('../dao/reminder.dao')

/* Create and Save a new Reminder by calling reminderDAO create method.
   Depending on the return value, it should return the results or the error message*/  
   exports.create = (reminderData, result) => {
      return reminderDAO.create(reminderData, result)
   };

   /* Retrieve all notes by calling reminderDAO getAll method.
    Depending on the return value, it should return the results or the error message*/  
   exports.getAll = (result) => {
      return reminderDAO.getAll(result)
   };
   
   /* Find a single Reminder by Id by calling reminderDAO findById method.
   Depending on the return value, it should return the results or the error message*/  
   exports.findById = (reminderId, result) => {
      return reminderDAO.findById(reminderId, result)
   }; 
   
   /* Update a Reminder identified by the id by calling reminderDAO updateById method.
   Depending on the return value, it should return the results or the error message*/   
   exports.updateById = (reminderId, reminderData, result) => {
      return reminderDAO.updateById(reminderId, reminderData, result)

   };
   
   /* Delete a Reminder with the specified id by calling reminderDAO remove method.
   Depending on the return value, it should return the results or the error message*/  
   exports.remove = (reminderId, result) => {
      return reminderDAO.remove(reminderId, result)
   };
   
   /* Delete all Reminders by calling reminderDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/  
   exports.removeAll = (result) => {
      return reminderDAO.removeAll(result)
   };