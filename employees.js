// Requirements/ Imports
var mysql = require("mysql2");
var inquirer = require("inquirer");

// How to connect to Mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db"
});
​
connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});
​
// what is actually inside our runSearch function
function runSearch() {
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
        //ending the connection if the user chooses to
        case "exit":
          connection.end();
          break;
      }
    });
}
​
// this is where we ask our next question because we called this function on line 43
function employeeSearch() {
    var query = "SELECT * FROM employees_db.employees";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
    });
}

