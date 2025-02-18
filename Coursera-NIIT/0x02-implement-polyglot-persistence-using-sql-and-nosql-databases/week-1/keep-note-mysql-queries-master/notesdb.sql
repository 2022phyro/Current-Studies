-- create a schema called `notesdb`
CREATE DATABASE IF NOT EXISTS notesdb;
-- Create the tables for Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory
USE notesdb;
-- Note table fields: note_id, note_title, note_content, note_status, note_creation_date
CREATE TABLE Note (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(20),
    content TEXT,
    status VARCHAR(32),
    creation_date DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id)
);
-- User table fields: user_id, user_name, user_added_date, user_password, user_mobile
CREATE TABLE User (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(32),
    password VARCHAR(256),
    mobile VARCHAR(20),
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
-- alter table User modify column user_added_date date
ALTER TABLE User MODIFY COLUMN added_date DATE DEFAULT (CURRENT_DATE);
-- Category table fields : category_id, category_name, category_descr, category_creation_date, category_creator
CREATE TABLE Category (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(32),
    descr TEXT,
    creation_date DATE DEFAULT (CURRENT_DATE),
    creator INTEGER,
    FOREIGN KEY (creator) REFERENCES User(id),
    PRIMARY KEY (id)
);
-- Reminder table fields : reminder_id, reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator
CREATE TABLE Reminder (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(32),
    descr TEXT,
    type VARCHAR(32),
    creation_date DATE DEFAULT (CURRENT_DATE),
    creator INTEGER,
    FOREIGN KEY (creator) REFERENCES User(id),
    PRIMARY KEY (id)
);
-- NoteCategory table fields : notecategory_id, note_id, category_id
CREATE TABLE NoteCategory (
    id INTEGER AUTO_INCREMENT NOT NULL,
    note_id INT,
    category_id INT,
    FOREIGN KEY (note_id) REFERENCES Note(id),
    FOREIGN KEY (category_id) REFERENCES Category(id),
    PRIMARY KEY (id)
);
-- NoteReminder table fields : notereminder_id, note_id, reminder_id
CREATE TABLE NoteReminder (
    id INTEGER AUTO_INCREMENT NOT NULL,
    note_id INT,
    reminder_id INT,
    FOREIGN KEY (note_id) REFERENCES Note(id),
    FOREIGN KEY (reminder_id) REFERENCES Reminder(id),
    PRIMARY KEY (id)
);
-- Usernote table fields : usernote_id, user_id, note_id
CREATE TABLE UserNote (
    id INTEGER AUTO_INCREMENT NOT NULL,
    note_id INT,
    user_id INT,
    FOREIGN KEY (note_id) REFERENCES Note(id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    PRIMARY KEY (id)
);
-- Insert the rows into the created tables (Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory)
INSERT INTO Note (title, content, status, creation_date) VALUES
('Meeting Notes', 'Discussion points for the meeting', 'Active', '2024-01-15'),
('Shopping List', 'Items to buy from the grocery store', 'Active', '2024-01-20');

INSERT INTO User (name, password, mobile) VALUES
('John Doe', 'password123', '1234567890'),
('Jane Smith', 'pass@word456', '9876543210');

INSERT INTO Category (name, descr, creator) VALUES
('Work', 'Category for work-related notes', 1),
('Personal', 'Category for personal notes', 2);

INSERT INTO Reminder (name, descr, type, creator) VALUES
('Meeting', 'Reminder for a meeting', 'Event', 1),
('Birthday', 'Reminder for a birthday', 'Event', 2);

INSERT INTO NoteCategory (note_id, category_id) VALUES
(1, 1),
(2, 2);

INSERT INTO NoteReminder (note_id, reminder_id) VALUES
(1, 1),
(2, 2);

INSERT INTO UserNote (user_id, note_id) VALUES
(1, 1),
(2, 2);
-- Fetch the row from User table based on Id and Password.
SELECT * FROM User WHERE id = 1 AND password = password123
-- Fetch all the rows from Note table based on the field note_creation_date.
SELECT * FROM Note WHERE creation_date <= (CURRENT_DATE);
-- Fetch all the Categories created after the particular Date.
SELECT * FROM Categories WHERE creation_date >= (CURRENT_DATE) - 1;
-- Fetch all the Note ID from UserNote table for a given User.
SELECT note_id UserNote WHERE user_id = 1 ;
-- Write Update query to modify particular Note for the given note id.
  UPDATE Note SET title = new_value WHERE id = 2

-- Fetch all the Notes from the Note table by a particular User.
SELECT n.id, n.title, n.content, n.status, n.creation_date FROM Note n 
INNER JOIN UserNote ON n.id = UserNote.note_id AND UserNote.user_id = 2;
-- Fetch all the Notes from the Note table for a particular Category.
SELECT n.id, n.title, n.content, n.status, n.creation_date FROM Note n 
INNER JOIN NoteCategory ON n.id = NoteCategory.note_id AND NoteCategory.category_id = 2;
-- Fetch all the reminder details for a given note id.
SELECT n.id, n.title, n.content, n.status, n.creation_date FROM Note n 
INNER JOIN NoteReminder ON n.id = NoteReminder.note_id AND NoteReminder.reminder_id = 2;
-- Fetch the reminder details for a given reminder id.
SELECT * from Reminder WHERE id = 1;
-- Write a query to create a new Note from particular User (Use Note and UserNote tables - insert statement).
INSERT INTO Note (title, content, status)
VALUES ('New Note Title', 'New Note Content', 'Active');

INSERT INTO UserNote (user_id, note_id)
VALUES (1, LAST_INSERT_ID());
-- Write a query to create a new Note from particular User to particular Category(Use Note and NoteCategory tables - insert statement)
INSERT INTO Note (title, content, status)
VALUES ('New Note2 Title', 'New Note2 Content', 'Active');
SET @note_id := LAST_INSERT_ID();

INSERT INTO UserNote (user_id, note_id)
VALUES (1, @note_id);

INSERT INTO NoteCategory (note_id, category_id)
VALUES (@note_id, 1);
-- Write a query to set a reminder for a particular note (Use Reminder and NoteReminder tables - insert statement)
INSERT INTO Reminder (name, descr, type, creation_date, creator)
VALUES ('Note Reminder', 'Reminder for the note', 'Event', CURRENT_DATE, <user_id>);

-- Insert a new record into the NoteReminder table to associate the reminder with a particular note
INSERT INTO NoteReminder (note_id, reminder_id)
VALUES (2, LAST_INSERT_ID());
-- Write a query to delete particular Note added by a User(Note and UserNote tables - delete statement)
DELETE FROM UserNote
WHERE user_id = 1 AND note_id = 3;

DELETE FROM Note
WHERE id = 3;
-- Write a query to delete particular Note from particular Category(Note and NoteCategory tables - delete statement)

DELETE FROM NoteCategory
WHERE note_id = 3 AND category_id = 1;

DELETE FROM Note
WHERE id = 3;