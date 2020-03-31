const inquirer = require("inquirer");
const chooseTable = require('./chooseTable');
var mysql = require("mysql");

console.log(chooseTable)

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "EmployeeTrackerDB"
});


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
                console.log(chooseTable)
                chooseTable()
                break;
            default:
                break;
        }
    })
}


//ADD TO TABLES
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

function viewDeptTable() {
    console.log("Viewing all Depts...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        deptTable()

    });

};

module.exports = {
    deptTable,
    addDeptTable
};
