// Dependencies
//Specify which modules and files to require
var express = require("express");
var mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const cTable = require('console.table');

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
                deptTable()
                break;
            case "Role":
                roleTable()
                break;
            case "Employee":
                employeeTable()
                break;
            case "Exit":
                doneEntering()
                break;
            default:
                break;
        }
    })
}

// and to create objects for each team member (using the correct classes as blueprints!)
//Used to ask more questions about the manager employee and generate the html
function deptTable() {
    inquirer.prompt([
        {
            type: "list",
            name: "whichFunction",
            message: "Please select which function:",
            choices: ["View Depts", "Add Depts", "Return To Main"]
        }
    ]).then((data) => {
        const { whichFunction } = data


        switch (whichFunction) {

            case "View Depts":
                viewDeptTable()
                break;
            case "Add Depts":
                addDeptTable()
                break;
            case "Return To Main":
                chooseTable()
                break;
            default:
                break;
        }
    })
}

function roleTable() {
    inquirer.prompt([
        {
            type: "list",
            name: "whichFunction",
            message: "Please select which function:",
            choices: ["View Roles", "Add Roles", "Return To Main"]
        }
    ]).then((data) => {
        const { whichFunction } = data


        switch (whichFunction) {

            case "View Roles":
                viewRoleTable()
                break;
            case "Add Roles":

                addRoleTable();
                break;
            case "Return To Main":
                chooseTable()
                break;
            default:
                break;
        }
    })
}

function employeeTable() {
    inquirer.prompt([
        {
            type: "list",
            name: "whichFunction",
            message: "Please select which function:",
            choices: ["View Employees", "Add Employee", "Return To Main"]
        }
    ]).then((data) => {
        const { whichFunction } = data


        switch (whichFunction) {

            case "View Employees":
                viewEmployeeTable()
                break;
            case "Add Employee":
                addEmployeeTable()
                break;
            case "Return To Main":
                chooseTable()
                break;
            default:
                break;
        }
    })
}


function addDeptTable() {
    inquirer.prompt([

        {
            type: "input",
            name: "name",
            message: "Dept name:"
        }

    ]).then(function (answer) {

        console.log(answer)

        console.log("Inserting a new dept...\n");
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.name
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " dept inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                viewDeptTable()
                deptTable()

            }
        );



    })
};

//title,salary,deptid
function addRoleTable() {

    inquirer.prompt([

        {
            type: "input",
            name: "title",
            message: "Role Title:"

        },
        {
            type: "input",
            name: "salary",
            message: "Salary:"

        },
        {
            type: "input",
            name: "department_id",
            message: "Dept ID:"

        }

    ]).then(function (answer) {

        console.log(answer)

        console.log("Inserting a new role...\n");
        var query = connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                viewRoleTable()

            }
        );



    })
};


//first_name,last_name,role_id,manager_id
function addEmployeeTable() {

    inquirer.prompt([

        {
            type: "input",
            name: "first_name",
            message: "First Name:"

        },
        {
            type: "input",
            name: "last_name",
            message: "Last Name:"

        },
        {
            type: "input",
            name: "role_id",
            message: "Role ID:"

        },
        {
            type: "input",
            name: "manager_id",
            message: "Manager ID:"

        }

    ]).then(function (answer) {

        console.log(answer)

        console.log("Inserting a new role...\n");
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                viewEmployeeTable()

            }
        );



    })
};


function viewDeptTable() {
    console.log("Viewing all Depts...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        deptTable()

    });

}

function viewRoleTable() {
    console.log("Viewing all Roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        roleTable()

    });

}

function viewEmployeeTable() {
    console.log("Viewing all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        employeeTable()

    });

}

function doneEntering() {


    console.log("Ending...")

}





//Used start to run the full application
chooseTable()
