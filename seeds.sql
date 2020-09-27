INSERT INTO departments VALUES (1, 'HR');
INSERT INTO departments VALUES (2, 'IT');
INSERT INTO departments VALUES (3, 'Payroll');

INSERT INTO employees(firstName, lastName, departmentId) VALUES ('Harry', 'Potter', 1);
INSERT INTO employees(firstName, lastName, departmentId) VALUES ('Jon', 'Clark',2);
INSERT INTO employees(firstName, lastName, departmentId) VALUES ('cody', 'smith',3);

INSERT INTO roles(role, salary, departmentId) VALUES ('Recruiter', 50000, 1);
INSERT INTO roles(role, salary, departmentId) VALUES ('Tech Lead', 60000,2);
INSERT INTO roles(role, salary, departmentId) VALUES ('Accountant', 40000,3)