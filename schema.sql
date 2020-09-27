DROP DATABASE IF EXISTS employees_db;

create database employees_db;
use employees_db;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE departments (
  departmentId INT auto_increment NOT NULL,
  departmentName VARCHAR(100) NOT NULL,
  PRIMARY KEY (departmentId)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  role VARCHAR(30),
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id),
  departmentId int,
  FOREIGN KEY (departmentId) REFERENCES departments(departmentId)
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  departmentId int,
  PRIMARY KEY (id),
  FOREIGN KEY (departmentId) REFERENCES departments(departmentId)
);