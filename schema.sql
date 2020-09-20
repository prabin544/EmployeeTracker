DROP DATABASE IF EXISTS employees_db;

create database employees_db;
use employees_db;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  salary INTEGER(100) NOT NULL,
  manager VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);