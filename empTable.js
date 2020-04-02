const inquirer = require("inquirer");
// const chooseTable = require('./chooseTable');
var mysql = require("mysql");

// console.log(chooseTable)

const employeeTable = (chooseTable, connection, returnToMain) => {
    inquirer.prompt([
        {
            type: "list",
            name: "whichFunction",
            message: "Please select which function:",
            choices: ["View Employees", "View Manager's Employees", "Add Employee", "Update Employee Role", "Delete Employee", "Return To Main"]
        }
    ]).then((data) => {
        const { whichFunction } = data


        switch (whichFunction) {

            case "View Employees":
                returnToMain();
                viewEmployeeTable(chooseTable, connection, returnToMain);
                break;

            case "View Manager's Employees":
                returnToMain();
                viewManagerEmployees(chooseTable, connection, returnToMain);
                break;
            case "Update Employee Role":
                // returnToMain();
                displayEmpsToUpdate(chooseTable, connection, returnToMain)
                break;
            case "Add Employee":
                addEmployeeTable(chooseTable, connection, returnToMain)
                break;
            case "Return To Main":
                // returnToMain();
                chooseTable()
                break;
            case "Delete Employee":
                displayEmpsToDelete(chooseTable, connection, returnToMain)
                break;
            default:
                break;
        }
    })
}


//ADD TO TABLES
function addEmployeeTable(chooseTable, connection, returnToMain) {

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
                returnToMain();
                console.log(res.affectedRows + " employee inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                viewEmployeeTable(chooseTable, connection, returnToMain)

            }
        );



    })
};



function displayEmpsToDelete(chooseTable, connection, returnToMain) {
    connection.query(`SELECT  * FROM employee UNION SELECT 0,'GO', 'BACK',0,0`, function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Choose an employee to delete:",
                name: "whichEmployee",
                type: "list",
                choices: function () {
                    var updateArray = [];
                    for (var i = 0; i < data.length; i++) {
                        updateArray.push(data[i].id + "   |-" + data[i].first_name + " " + data[i].last_name);
                    }
                    return updateArray;
                }

            }
        ])
            .then(function (data) {
                const { whichEmployee } = data

                var deleteThisOne = parseInt(whichEmployee.substring(0, 5))
                if (deleteThisOne === 0) { employeeTable(chooseTable, connection, returnToMain) }
                else {

                    connection.query(
                        "DELETE FROM employee WHERE ?",
                        {
                            id: parseInt(whichEmployee.substring(0, 2))
                        },
                        function (err, res) {
                            if (err) {
                                throw err

                            };
                            returnToMain();
                            console.log(res.affectedRows + " employee deleted!\n");
                            // Call readProducts AFTER the DELETE completes
                            employeeTable(chooseTable, connection, returnToMain)
                        })



                }






            });
    });
};





function displayEmpsToUpdate(chooseTable, connection, returnToMain) {
    connection.query(`SELECT  * FROM employee UNION SELECT 0,'GO', 'BACK',0,0`, function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Choose an employee role to update:",
                name: "whichEmployee",
                type: "list",
                choices: function () {
                    var updateArray = [];
                    for (var i = 0; i < data.length; i++) {
                        updateArray.push(data[i].id + "   |-" + data[i].first_name + " " + data[i].last_name);
                    }
                    return updateArray;
                }

            },
            {
                type: "input",
                name: "role_id",
                message: "New Role ID:"

            }
        ])
            .then(function (data) {
                const { whichEmployee } = data
                const { role_id } = data
                var deleteThisOne = parseInt(whichEmployee.substring(0, 5))
                if (deleteThisOne === 0) { employeeTable(chooseTable, connection, returnToMain) }
                else {


                    connection.query(
                        "UPDATE employee SET ? WHERE ? ",
                        [{
                            role_id: role_id
                        }, {
                            id: parseInt(whichEmployee.substring(0, 2))
                        }],
                        function (err, res) {
                            if (err) {
                                throw err

                            };
                            returnToMain();
                            console.log(res.affectedRows + " employee updated!\n");
                            // Call readProducts AFTER the DELETE completes
                            employeeTable(chooseTable, connection, returnToMain)
                        })



                }






            });
    });
};







function addEmployeeTable(chooseTable, connection, returnToMain) {

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
                returnToMain();
                console.log(res.affectedRows + " employee inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                viewEmployeeTable(chooseTable, connection, returnToMain)

            }
        );

    }
    )
};


function viewEmployeeTable(chooseTable, connection, returnToMain) {
    console.log("Viewing all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        employeeTable(chooseTable, connection, returnToMain)

    });

};



function viewManagerEmployees(chooseTable, connection, returnToMain) {
    connection.query(`SELECT  * FROM employee UNION SELECT 0,'GO', 'BACK',0,0`, function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Choose an employee:",
                name: "whichEmployee",
                type: "list",
                choices: function () {
                    var updateArray = [];
                    for (var i = 0; i < data.length; i++) {
                        updateArray.push(data[i].id + "   |-" + data[i].first_name + " " + data[i].last_name);
                    }
                    return updateArray;
                }

            }

        ])
            .then(function (data) {
                const { whichEmployee } = data
                // const { role_id } = data
                var deleteThisOne = parseInt(whichEmployee.substring(0, 5))
                if (deleteThisOne === 0) { employeeTable(chooseTable, connection, returnToMain) }
                else {


                    connection.query(
                        "SELECT * FROM employee WHERE ? ",
                        [{
                            manager_id: whichEmployee
                        }, {
                            id: parseInt(whichEmployee.substring(0, 2))
                        }],
                        function (err, res) {
                            if (err) {
                                throw err

                            };
                            returnToMain();
                            console.table(res);
                            // Call readProducts AFTER the DELETE completes
                            if (res.length === 0) { console.log("No employees found."); }
                            employeeTable(chooseTable, connection, returnToMain)
                        })



                }






            });
    });
};





module.exports = {
    employeeTable

};
