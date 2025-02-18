const reminderService = require("../service/reminder.service.js");

/* Call the create method of reminderService object and return the result back*/
exports.create = (newReminder, result) => {
    reminderService.create(newReminder, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Call the getAll method of reminderService object  and return the result back*/
exports.findAll = (name = null, result) => {
    reminderService.getAll(name, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Call the findById method of reminderService object  and return the result back*/
exports.findOne = (reminderId, result) => {
    reminderService.findById(reminderId, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Call the updateById method of reminderService object  and return the result back*/
exports.update = (reminderId, reminder, result) => {
    reminderService.updateById(reminderId, reminder, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Call the remove method of reminderService object  and return the result back*/
exports.delete = (reminderId, result) => {
    reminderService.delete(reminderId, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

/* Call the removeAll method of reminderService object  and return the result back*/
exports.deleteAll = (result) => {
    reminderService.deleteAll((err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
