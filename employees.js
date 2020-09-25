let mysql = require ("mysql2");
let inquirer = require ("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pravin123",
    database: "employees_db"
});

connection.connect(function (err){
    if (err) throw err;
    runsearch();
});

function runsearch(){
    inquirer
    // what we're asking!
    // remember that name, type, message, choices all comes from the inquirer documentation
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by Manager",
          "Add employee",
          "Remove employee",
          "Update Employee role",
          "Update employee manager",
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
        case "View all employees by department":
        // using the switch case we pick a function we want to run for our next inquirer question
        empByDept();
        break;
        case "View all employees by Manager":
        // using the switch case we pick a function we want to run for our next inquirer question
        empByMgr();
        break;
        case "Add employee":
        // using the switch case we pick a function we want to run for our next inquirer question
        addEmployee();
        break;
        //ending the connection if the user chooses to
        case "exit":
          connection.end();
          break;
      }
    });
}

function employeeSearch() {
    var query = "SELECT * FROM employees_db.employees";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
    });
}

function empByDept(){
    inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter department you would like to search: ",
    }).then (function (answer){
        var query = "SELECT * FROM employees_db.employees where ?";
        connection.query(query, { department: answer.department }, function (err, res) {
            if (err) throw err;
            console.table(res)
        });
    });
}

function empByMgr(){
  inquirer
  .prompt({
    name: "manager",
    type: "input",
    message: "Enter manager you would like to search: ",
  }).then (function (answer){
      var query = "SELECT * FROM employees_db.employees where ?";
      connection.query(query, { manager: answer.manager }, function (err, res) {
          if (err) throw err;
          console.table(res)
      });
  });
}

function addEmployee(){
  inquirer
  .prompt( [
    {
    name: "first_name",
    type: "input",
    message: "Enter employee first name: "
    },
    {
    name: "last_name",
    type: "input",
    message: "Enter employee last name: "
    },
    {
    name: "manager",
    type: "input",
    message: "Enter manager name: "
    },
    {
    name: "department",
    type: "input",
    message: "Enter department name: "
    },
    {
    name: "title",
    type: "input",
    message: "Enter employee title: "
    },
  ]).then (function (answers){
      console.log(answers);
      var query = "INSERT INTO employees (?) VALUES (?)";
      connection.query(query, { first_name: answers[0].first_name }, { last_name: answers[1].last_name }, { manager: answers[2].manager }, 
        { department: answers[3].department },{ title: answers[4].title }, function (err, res) {
          if (err) throw err;
          console.table(res)
      });
  });
}