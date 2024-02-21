
-- create a schema called `notesdb`
CREATE DATABASE notesdb;
USE notesdb;
-- Create the tables for Note, Category, Reminder, NoteReminder and NoteCategory

-- Note table fields: note_id, note_title, note_content, note_status, note_creation_date
 CREATE TABLE IF NOT EXISTS Note (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    note_title VARCHAR(100) NOT NULL,
    note_content TEXT NOT NULL,
    note_status VARCHAR(70),
    note_creation_date DATETIME DEFAULT NOW()
 );
-- Category table fields : category_id, category_name, category_descr, category_creation_date
CREATE TABLE IF NOT EXISTS Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_descr TEXT,
    category_creation_date DATETIME DEFAULT NOW()
);
-- Reminder table fields : reminder_id, reminder_name, reminder_descr, reminder_type, reminder_creation_date
CREATE TABLE IF NOT EXISTS Reminder (
    reminder_id INT AUTO_INCREMENT PRIMARY KEY,
    reminder_name VARCHAR(100) NOT NULL,
    reminder_descr TEXT,
    reminder_type VARCHAR(70) DEFAULT 'email',
    reminder_creation_date DATETIME DEFAULT NOW()
);
-- NoteCategory table fields : notecategory_id, note_id, category_id
CREATE TABLE IF NOT EXISTS NoteCategory (
    notecategory_id INT AUTO_INCREMENT PRIMARY KEY,
    note_id INT,
    category_id INT,
    FOREIGN KEY (note_id) REFERENCES Note (note_id),
    FOREIGN KEY (category_id) REFERENCES Category (category_id)
);
-- NoteReminder table fields : notereminder_id, note_id, reminder_id
CREATE TABLE IF NOT EXISTS NoteReminder (
    notereminder_id INT AUTO_INCREMENT PRIMARY KEY,
    note_id INT,
    reminder_id INT,
    FOREIGN KEY (note_id) REFERENCES Note (note_id),
    FOREIGN KEY (reminder_id) REFERENCES Reminder (reminder_id)
);
-- Execute all the queries in Mysql workbench 
