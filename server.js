// Dependencies
//Specify which modules and files to require
var express = require("express");
var mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const cTable = require('console.table');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const deptTableJS = require('./deptTable');
const roleTableJS = require('./roleTable');
const empTableJS = require('./empTable');
// const chooseTable = require('./chooseTable');


// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "EmployeeTrackerDB"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    //Used start to run the full application
    returnToMain();
    chooseTable();
    //console.log("connected as id " + connection.threadId);
});

//Employee array
let employees = []

// Write code to use inquirer to gather information about the development team members,
//Used to ask questions about employees
function chooseTable() {
    inquirer.prompt([
        {
            type: "list",
            name: "whichTable",
            message: "Please select which table:",
            choices: ["Dept", "Role", "Employee", "Exit"]
        }
    ]).then((data) => {
        const { whichTable } = data


        switch (whichTable) {

            case "Dept":
                deptTableJS.deptTable(chooseTable, connection, returnToMain);
                break;
            case "Role":
                roleTableJS.roleTable(chooseTable, connection, returnToMain);
                break;
            case "Employee":
                empTableJS.employeeTable(chooseTable, connection, returnToMain)
                break;
            case "Exit":
                doneEntering()
                break;
            default:
                break;
        }
    })
};


// function deptTable() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "whichFunction",
//             message: "Please select which function:",
//             choices: ["View Depts", "Delete Dept", "Add Depts", "Return To Main"]
//         }
//     ]).then((data) => {
//         const { whichFunction } = data


//         switch (whichFunction) {

//             case "View Depts":
//                 returnToMain();
//                 viewDeptTable()

//                 break;
//             case "Add Depts":
//                 addDeptTable()
//                 break;
//             case "Delete Dept":
//                 returnToMain();
//                 displayDeptToDelete();
//                 break;
//             case "Return To Main":
//                 returnToMain();
//                 chooseTable()
//                 break;
//             default:
//                 break;
//         }
//     })
// };

// function roleTable() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "whichFunction",
//             message: "Please select which function:",
//             choices: ["View Roles", "Add Roles", "Delete Role", "Return To Main"]
//         }
//     ]).then((data) => {
//         const { whichFunction } = data


//         switch (whichFunction) {

//             case "View Roles":
//                 returnToMain();
//                 viewRoleTable()
//                 break;
//             case "Add Roles":

//                 addRoleTable();
//                 break;
//             case "Delete Role":
//                 returnToMain();
//                 displayRoleToDelete()
//             case "Return To Main":
//                 returnToMain();
//                 chooseTable()
//                 break;
//             default:
//                 break;
//         }
//     })
// };

// function employeeTable() {
//     inquirer.prompt([
//         {
//             type: "list",
//             name: "whichFunction",
//             message: "Please select which function:",
//             choices: ["View Employees", "Update Employee Role", "Add Employee", "Delete Employee", "Return To Main"]
//         }
//     ]).then((data) => {
//         const { whichFunction } = data


//         switch (whichFunction) {

//             case "View Employees":
//                 returnToMain();
//                 viewEmployeeTable()
//                 break;
//             case "Update Employee Role":
//                 returnToMain();
//                 displayEmpsToUpdate()
//                 break;
//             case "Add Employee":
//                 addEmployeeTable()
//                 break;
//             case "Return To Main":
//                 returnToMain();
//                 chooseTable()
//                 break;
//             case "Delete Employee":
//                 displayEmpsToDelete()
//                 break;
//             default:
//                 break;
//         }
//     })
// };

// //ADD TO TABLES
// function addDeptTable() {
//     inquirer.prompt([

//         {
//             type: "input",
//             name: "name",
//             message: "Dept name:"
//         }

//     ]).then(function (answer) {

//         console.log(answer)

//         console.log("Inserting a new dept...\n");
//         var query = connection.query(
//             "INSERT INTO department SET ?",
//             {
//                 name: answer.name
//             },
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " dept inserted!\n");
//                 // Call updateProduct AFTER the INSERT completes
//                 viewDeptTable()
//                 deptTable()

//             }
//         );



//     })
// };

// function addRoleTable() {

//     inquirer.prompt([

//         {
//             type: "input",
//             name: "title",
//             message: "Role Title:"

//         },
//         {
//             type: "input",
//             name: "salary",
//             message: "Salary:"

//         },
//         {
//             type: "input",
//             name: "department_id",
//             message: "Dept ID:"

//         }

//     ]).then(function (answer) {

//         console.log(answer)

//         console.log("Inserting a new role...\n");
//         var query = connection.query(
//             "INSERT INTO role SET ?",
//             {
//                 title: answer.title,
//                 salary: answer.salary,
//                 department_id: answer.department_id
//             },
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " role inserted!\n");
//                 // Call updateProduct AFTER the INSERT completes
//                 viewRoleTable()

//             }
//         );



//     })
// };


// function addEmployeeTable() {

//     inquirer.prompt([

//         {
//             type: "input",
//             name: "first_name",
//             message: "First Name:"

//         },
//         {
//             type: "input",
//             name: "last_name",
//             message: "Last Name:"

//         },
//         {
//             type: "input",
//             name: "role_id",
//             message: "Role ID:"

//         },
//         {
//             type: "input",
//             name: "manager_id",
//             message: "Manager ID:"

//         }

//     ]).then(function (answer) {

//         console.log(answer)

//         console.log("Inserting a new role...\n");
//         var query = connection.query(
//             "INSERT INTO employee SET ?",
//             {
//                 first_name: answer.first_name,
//                 last_name: answer.last_name,
//                 role_id: answer.role_id,
//                 manager_id: answer.manager_id
//             },
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " employee inserted!\n");
//                 // Call updateProduct AFTER the INSERT completes
//                 viewEmployeeTable()

//             }
//         );



//     })
// };





// function viewRoleTable() {
//     console.log("Viewing all Roles...\n");
//     connection.query("SELECT * FROM role", function (err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         console.table(res);
//         roleTable()

//     });

// };

// function viewEmployeeTable() {
//     console.log("Viewing all employees...\n");
//     connection.query("SELECT * FROM employee", function (err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         console.table(res);
//         employeeTable()

//     });

// };

function doneEntering() {

    connection.end();
    process.exit();

};

// function displayDeptToDelete() {
//     connection.query(`SELECT  * FROM department UNION SELECT 0,'GO BACK'`, function (err, data) {
//         if (err) throw err;
//         inquirer.prompt([
//             {
//                 type: "list",
//                 message: "Choose a department to delete:",
//                 name: "whichDepartment",
//                 type: "list",
//                 choices: function () {
//                     var updateArray = [];
//                     for (var i = 0; i < data.length; i++) {
//                         updateArray.push(data[i].id + "   |-" + data[i].name);
//                     }
//                     return updateArray;
//                 }

//             }
//         ])
//             .then(function (data) {
//                 const { whichDepartment } = data

//                 var deleteThisOne = parseInt(whichDepartment.substring(0, 5))
//                 if (deleteThisOne === 0) { deptTable() }
//                 else {

//                     connection.query(
//                         "DELETE FROM department WHERE ?",
//                         {
//                             id: parseInt(whichDepartment.substring(0, 2))
//                         },
//                         function (err, res) {
//                             if (err) throw err;
//                             console.log(res.affectedRows + " department(s) deleted!\n");
//                             // Call readProducts AFTER the DELETE completes
//                             deptTable()
//                         })



//                 }






//             });
//     });
// };

// -- role:
// -- id - INT PRIMARY KEY
// -- title -  VARCHAR(30) to hold role title
// -- salary -  DECIMAL to hold role salary
// -- department_id -  INT to hold reference to department role belongs to

// function displayRoleToDelete() {
//     connection.query(`SELECT  * FROM role UNION SELECT 0,'GO BACK',0,0`, function (err, data) {
//         if (err) throw err;
//         inquirer.prompt([
//             {
//                 type: "list",
//                 message: "Choose a role to delete:",
//                 name: "whichRole",
//                 type: "list",
//                 choices: function () {
//                     var updateArray = [];
//                     for (var i = 0; i < data.length; i++) {
//                         updateArray.push(data[i].id + "   |-" + data[i].title);
//                     }
//                     return updateArray;
//                 }

//             }
//         ])
//             .then(function (data) {
//                 const { whichRole } = data

//                 var deleteThisOne = parseInt(whichRole.substring(0, 5))
//                 if (deleteThisOne === 0) { roleTable() }
//                 else {

//                     connection.query(
//                         "DELETE FROM role WHERE ?",
//                         {
//                             id: parseInt(whichRole.substring(0, 2))
//                         },
//                         function (err, res) {
//                             if (err) {
//                                 console.log(err);
//                                 throw err;
//                                 roleTable()
//                             };
//                             console.log(res.affectedRows + " role(s) deleted!\n");
//                             // Call readProducts AFTER the DELETE completes
//                             roleTable()
//                         })



//                 }






//             });
//     });
// };


// function displayEmpsToDelete() {
//     connection.query(`SELECT  * FROM employee UNION SELECT 0,'GO', 'BACK',0,0`, function (err, data) {
//         if (err) throw err;
//         inquirer.prompt([
//             {
//                 type: "list",
//                 message: "Choose an employee to delete:",
//                 name: "whichEmployee",
//                 type: "list",
//                 choices: function () {
//                     var updateArray = [];
//                     for (var i = 0; i < data.length; i++) {
//                         updateArray.push(data[i].id + "   |-" + data[i].first_name + " " + data[i].last_name);
//                     }
//                     return updateArray;
//                 }

//             }
//         ])
//             .then(function (data) {
//                 const { whichEmployee } = data

//                 var deleteThisOne = parseInt(whichEmployee.substring(0, 5))
//                 if (deleteThisOne === 0) { employeeTable() }
//                 else {

//                     connection.query(
//                         "DELETE FROM employee WHERE ?",
//                         {
//                             id: parseInt(whichEmployee.substring(0, 2))
//                         },
//                         function (err, res) {
//                             if (err) {
//                                 throw err

//                             };
//                             console.log(res.affectedRows + " employee deleted!\n");
//                             // Call readProducts AFTER the DELETE completes
//                             employeeTable()
//                         })



//                 }






//             });
//     });
// };





// function displayEmpsToUpdate() {
//     connection.query(`SELECT  * FROM employee UNION SELECT 0,'GO', 'BACK',0,0`, function (err, data) {
//         if (err) throw err;
//         inquirer.prompt([
//             {
//                 type: "list",
//                 message: "Choose an employee role to update:",
//                 name: "whichEmployee",
//                 type: "list",
//                 choices: function () {
//                     var updateArray = [];
//                     for (var i = 0; i < data.length; i++) {
//                         updateArray.push(data[i].id + "   |-" + data[i].first_name + " " + data[i].last_name);
//                     }
//                     return updateArray;
//                 }

//             },
//             {
//                 type: "input",
//                 name: "role_id",
//                 message: "New Role ID:"

//             }
//         ])
//             .then(function (data) {
//                 const { whichEmployee } = data
//                 const { role_id } = data
//                 var deleteThisOne = parseInt(whichEmployee.substring(0, 5))
//                 if (deleteThisOne === 0) { employeeTable() }
//                 else {


//                     connection.query(
//                         "UPDATE employee SET ? WHERE ? ",
//                         [{
//                             role_id: role_id
//                         }, {
//                             id: parseInt(whichEmployee.substring(0, 2))
//                         }],
//                         function (err, res) {
//                             if (err) {
//                                 throw err

//                             };
//                             console.log(res.affectedRows + " employee updated!\n");
//                             // Call readProducts AFTER the DELETE completes
//                             employeeTable()
//                         })



//                 }






//             });
//     });
// };







// function addEmployeeTable() {

//     inquirer.prompt([

//         {
//             type: "input",
//             name: "first_name",
//             message: "First Name:"

//         },
//         {
//             type: "input",
//             name: "last_name",
//             message: "Last Name:"

//         },
//         {
//             type: "input",
//             name: "role_id",
//             message: "Role ID:"

//         },
//         {
//             type: "input",
//             name: "manager_id",
//             message: "Manager ID:"

//         }

//     ]).then(function (answer) {


//         console.log(answer)

//         var query = connection.query(
//             "INSERT INTO employee SET ?",
//             {
//                 first_name: answer.first_name,
//                 last_name: answer.last_name,
//                 role_id: answer.role_id,
//                 manager_id: answer.manager_id
//             },
//             function (err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " employee inserted!\n");
//                 // Call updateProduct AFTER the INSERT completes
//                 viewEmployeeTable()

//             }
//         );

//     }
//     )
// };



function returnToMain() {

    //Code adapted from https://morioh.com/p/a9514e994de1
    clear()
    console.log(
        chalk.yellow(
            figlet.textSync('Employee Tracker', { horizontalLayout: 'full' })
        )
    );
    //End code adaptation

}





