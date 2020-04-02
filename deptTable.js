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


const deptTable = (chooseTable, connection, returnToMain) => {
    inquirer.prompt([
        {
            type: "list",
            name: "whichFunction",
            message: "Please select which function:",
            choices: ["View Depts", "Add Depts", "Delete Dept", "Return To Main"]
        }
    ]).then((data) => {
        const { whichFunction } = data
        console.log(chooseTable)

        switch (whichFunction) {

            case "View Depts":
                returnToMain();
                viewDeptTable(chooseTable, connection, returnToMain)
                break;
            case "Add Depts":
                // returnToMain();
                addDeptTable(chooseTable, connection, returnToMain)
                break;
            case "Delete Dept":
                returnToMain();
                displayDeptToDelete(chooseTable, connection, returnToMain)
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
function addDeptTable(chooseTable, connection, returnToMain) {
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
                returnToMain();
                console.log(res.affectedRows + " dept inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                // viewDeptTable(chooseTable, connection, returnToMain)

                deptTable(chooseTable, connection, returnToMain)

            }
        );



    })
};

function viewDeptTable(chooseTable, connection, returnToMain) {
    console.log("Viewing all Depts...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        deptTable(chooseTable, connection, returnToMain)

    });

};


function displayDeptToDelete(chooseTable, connection, returnToMain) {
    connection.query(`SELECT  * FROM department UNION SELECT 0,'GO BACK'`, function (err, data) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Choose a department to delete:",
                name: "whichDepartment",
                type: "list",
                choices: function () {
                    var updateArray = [];
                    for (var i = 0; i < data.length; i++) {
                        updateArray.push(data[i].id + "   |-" + data[i].name);
                    }
                    return updateArray;
                }

            }
        ])
            .then(function (data) {
                const { whichDepartment } = data

                var deleteThisOne = parseInt(whichDepartment.substring(0, 5))
                if (deleteThisOne === 0) { deptTable(chooseTable, connection, returnToMain) }
                else {

                    connection.query(
                        "DELETE FROM department WHERE ?",
                        {
                            id: parseInt(whichDepartment.substring(0, 2))
                        },
                        function (err, res) {
                            if (err) throw err;
                            returnToMain();
                            console.log(res.affectedRows + " department(s) deleted!\n");

                            deptTable(chooseTable, connection, returnToMain)
                        })



                }






            });
    });
};



module.exports = {
    deptTable

};
