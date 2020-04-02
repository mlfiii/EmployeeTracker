const inquirer = require("inquirer");
// const chooseTable = require('./chooseTable');
var mysql = require("mysql");

// console.log(chooseTable)

// // MySQL DB Connection Information (remember to change this with our specific credentials)
// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "password",
//     database: "EmployeeTrackerDB"
// });


const roleTable = (chooseTable, connection, returnToMain) => {
    inquirer.prompt([
        {
            type: "list",
            name: "whichFunction",
            message: "Please select which function:",
            choices: ["View Roles", "Add Roles", "Delete Role", "Return To Main"]
        }
    ]).then((data) => {
        const { whichFunction } = data


        switch (whichFunction) {

            case "View Roles":
                returnToMain();
                viewRoleTable(chooseTable, connection, returnToMain);
                break;
            case "Add Roles":

                addRoleTable(chooseTable, connection, returnToMain);
                break;
            case "Delete Role":
                returnToMain();
                displayRoleToDelete(chooseTable, connection, returnToMain)
                break;

            case "Return To Main":
                returnToMain();
                chooseTable()
                break;
            default:
                break;
        }
    })
}


//ADD TO TABLES
function addRoleTable(chooseTable, connection, returnToMain) {

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
                returnToMain();
                console.log(res.affectedRows + " role inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                viewRoleTable(chooseTable, connection, returnToMain)

            }
        );



    })
};
function viewRoleTable(chooseTable, connection, returnToMain) {
    console.log("Viewing all Roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        roleTable(chooseTable, connection, returnToMain)

    });

};


function displayRoleToDelete(chooseTable, connection, returnToMain) {
    connection.query(`SELECT  * FROM role UNION SELECT 0,'GO BACK',0,0`, function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Choose a role to delete:",
                name: "whichRole",
                type: "list",
                choices: function () {
                    var updateArray = [];
                    for (var i = 0; i < data.length; i++) {
                        updateArray.push(data[i].id + "   |-" + data[i].title);
                    }
                    return updateArray;
                }

            }
        ])
            .then(function (data) {
                const { whichRole } = data

                var deleteThisOne = parseInt(whichRole.substring(0, 5))
                if (deleteThisOne === 0) { roleTable(chooseTable, connection, returnToMain) }
                else {

                    connection.query(
                        "DELETE FROM role WHERE ?",
                        {
                            id: parseInt(whichRole.substring(0, 2))
                        },
                        function (err, res) {
                            if (err) {
                                console.log(err);
                                // throw err;
                                return next(err);
                                roleTable(chooseTable, connection, returnToMain)
                            };
                            returnToMain();
                            console.log(res.affectedRows + " role(s) deleted!\n");
                            // Call readProducts AFTER the DELETE completes
                            roleTable(chooseTable, connection, returnToMain)
                        })



                }






            });
    });
};


module.exports = {
    roleTable

};
