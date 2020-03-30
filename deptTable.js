
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


// module.exports = deptTableJS;
