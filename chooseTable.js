const inquirer = require("inquirer");
const deptTableJS = require('./deptTable');

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
                deptTableJS.deptTable(chooseTable);
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
};

module.exports = { chooseTable, "hello": "goodbye" };
