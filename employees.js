let mysql = require("mysql2");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pravin123",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runsearch();
});

function runsearch() {
  inquirer
    // what we're asking!
    // remember that name, type, message, choices all comes from the inquirer documentation
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all department",
        "View all roles",
        "Add employee",
        "Add department",
        "Add role",
        "exit"
      ],
    })
    // this is what when we select the prompt answer from the terminal
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          // using the switch case we pick a function we want to run for our next inquirer question
          employeeSearch();
          break;
        case "View all department":
          // using the switch case we pick a function we want to run for our next inquirer question
          deptSearch();
          break;
        case "View all roles":
          // using the switch case we pick a function we want to run for our next inquirer question
          roleSearch();
          break;
        case "Add employee":
          // using the switch case we pick a function we want to run for our next inquirer question
          addEmployee();
          break;
        case "Add department":
          // using the switch case we pick a function we want to run for our next inquirer question
          addDepartment();
          break;
        case "Add role":
          // using the switch case we pick a function we want to run for our next inquirer question
          addRole();
          break;
        //ending the connection if the user chooses to
        case "exit":
          connection.end();
          break;
      }
    });
}

function employeeSearch() {
  // connection.query("SELECT employees.id, employees.firstName, employees.lastName, role.title, role.salary, role.department_id FROM employees INNER JOIN role on employees.role_id = role.department_id;", function (err, res) {
    connection.query("SELECT firstName, lastName, departmentName, role FROM employees JOIN departments on employees.departmentId = departments.departmentId JOIN roles on roles.departmentId = employees.departmentId", function (err, res) {
    if (err) throw err;
    console.table(res);
    runsearch();
  });
}

function deptSearch() {
  connection.query("SELECT departmentName FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    runsearch();
  });
}

function roleSearch() {
  connection.query("SELECT role FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    runsearch();
  });
}

function addEmployee() {
  connection.query("SELECT role FROM roles", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter new employee's first name: "
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter new employee's last name: "
      },
      {
        type: "list",
        name: "departmentId",
        message: "Please choose the new employee's role",
        choices: res.map(role => role.role)
      }
    ]).then(function (answers) {
      if (answers.departmentId === 'HR'){
        answers.departmentId = 1;
      }else if(answers.departmentId === 'Tech Lead'){
        answers.departmentId = 2;
      }else{
        answers.departmentId = 3;
      }
      var query = "INSERT INTO employees SET ?";
      connection.query(query,
        {
          firstName: answers.firstName,
          lastName: answers.lastName,
          departmentId: answers.departmentId
        },
        function (err, res) {
          if (err) throw err;
          employeeSearch();
          runsearch();
        });
    });
  });
}

function addDepartment (){
  inquirer.prompt(
    {
      type: "input",
      name: "departmentName",
      message: "Please enter new department name: "
    }).then(function(answer){
      var query = "INSERT INTO departments SET ?";
      connection.query(query,
        {
          departmentName: answer.departmentName,
        },
        function (err, res) {
          if (err) throw err;
          deptSearch();
          runsearch();
        });
    });
}

function addRole (){
  connection.query("SELECT departmentName FROM departments", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "input",
        name: "role",
        message: "Please enter new Role: "
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter salary for this role: "
      },
      {
        type: "list",
        name: "departmentName",
        message: "Please choose the department for this role",
        choices: res.map(departmentName => departmentName.departmentName)
      }
      ]).then(function(answers){
        if (answers.departmentId === 'HR'){
          answers.departmentId = 1;
        }else if(answers.departmentId === 'Tech Lead'){
          answers.departmentId = 2;
        }else{
          answers.departmentId = 3;
        }
        var query = "INSERT INTO roles SET ?";
        connection.query(query,
          {
            role: answers.role,
            salary: answers.salary,
            departmentId: answers.departmentId
          },
          function (err, res) {
            if (err) throw err;
            roleSearch();
            runsearch();
          });
      });
  });
}
