-- Create the database
CREATE DATABASE CONNECT;

-- Switch to the new database
USE CONNECT;

-- Create the SignUpTable
CREATE TABLE UsersTable (
    UserId VARCHAR(255) PRIMARY KEY NOT NULL,
    UserName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    Status VARCHAR(255) ,
    Password VARCHAR(255) NOT NULL,
    IsDeleted INT DEFAULT 0,
    IsEmailSent INT DEFAULT 0
);
INSERT INTO UsersTable (UserId, UserName, Email, Password, Role)
VALUES 
    ('1', 'AdminUser', 'admin@example.com', 'adminpasswordhash', 'Admin'),
    ('2', 'OfficialUser', 'official@example.com', 'officialpasswordhash', 'Official'),
    ('3', 'CitizenUser', 'citizen@example.com', 'citizenpasswordhash', 'Citizen');


