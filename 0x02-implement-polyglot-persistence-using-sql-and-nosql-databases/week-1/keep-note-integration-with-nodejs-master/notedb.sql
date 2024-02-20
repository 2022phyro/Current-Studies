
-- create a schema called `notesdb`
CREATE DATABASE IF NOT EXISTS notesdb;
USE notesdb;
-- Create the tables for Note, Category, Reminder, NoteReminder and NoteCategory

-- Note table fields: note_id, note_title, note_content, note_status, note_creation_date
  CREATE TABLE Note (
    note_id INTEGER AUTO_INCREMENT NOT NULL,
    note_title VARCHAR(20),
    note_content TEXT,
    note_status VARCHAR(32),
    note_creation_date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (note_id)
);

-- Category table fields : category_id, category_name, category_descr, category_creation_date
CREATE TABLE Category (
    category_id INTEGER AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(32),
    category_descr TEXT,
    category_creation_date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (category_id)
);

-- Reminder table fields : reminder_id, reminder_name, reminder_descr, reminder_type, reminder_creation_date
CREATE TABLE Reminder (
    reminder_id INTEGER AUTO_INCREMENT NOT NULL,
    reminder_name VARCHAR(32),
    reminder_descr TEXT,
    reminder_type VARCHAR(32),
    reminder_creation_date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (reminder_id)
);

-- NoteCategory table fields : notecategory_id, note_id, category_id
CREATE TABLE NoteCategory (
    notecategory_id INTEGER AUTO_INCREMENT NOT NULL,
    note_id INT,
    category_id INT,
    FOREIGN KEY (note_id) REFERENCES Note(note_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    PRIMARY KEY (notecategory_id)
);
-- NoteReminder table fields : notereminder_id, note_id, reminder_id
CREATE TABLE NoteReminder (
    notereminder_id INTEGER AUTO_INCREMENT NOT NULL,
    note_id INT,
    reminder_id INT,
    FOREIGN KEY (note_id) REFERENCES Note(note_id),
    FOREIGN KEY (reminder_id) REFERENCES Reminder(reminder_id),
    PRIMARY KEY (notereminder_id)
);

-- Execute all the queries in Mysql workbench 
-- create a schema called `notesdb`
