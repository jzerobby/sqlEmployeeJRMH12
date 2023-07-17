const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connects to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        // MySQL username,
        user: 'root',
        // Adds MySQL password here
        password: 'Jmlb01693',
        database: 'employee_db'
    },
);

async function displayDepartments() {
    // Select all departments from the database
    let query = "select * from department"
    db.query(query, function (err, res) {
        console.table(res)
        inquirer.prompt({
            name: "mainMenu",
            type: "confirm",
            message: "do you want return back to main menu?"
        }).then((answers) => {
            if (answers.mainMenu) {
                handleOptions();
            } else {
                db.end()
            }
        })
    })
}

async function displayRoles() {
    // Displays all Roles from MYSQL
    let query = "select * from role"
    db.query(query, function (err, res) {
        console.table(res)
        inquirer.prompt({
            name: "mainMenu",
            type: "confirm",
            message: "do you want return back to main menu?"
        }).then((answers) => {
            if (answers.mainMenu) {
                handleOptions();
            } else {
                db.end()
            }
        })
    })
}

async function displayEmployees() {
    // Selects all Employees from MYSQL
    let query = "select * from employee"
    db.query(query, function (err, res) {
        console.table(res)
        inquirer.prompt({
            name: "mainMenu",
            type: "confirm",
            message: "do you want return back to main menu?"
        }).then((answers) => {
            if (answers.mainMenu) {
                handleOptions();
            } else {
                db.end()
            }
        })
    })
}

async function addDepartment() {
    // Implements a function to add department to department table
    let query = "insert into department (name) values (?)"
    inquirer.prompt([
        {
            //ask the user to what department they want to add
            name: "department",
            message: "What department you want to add?",
        },
    ]).then((answers) => {
        const params = answers.department
        console.log()
        db.query(query, params, function (err, res) {
            console.table(res)
            handleOptions();
        })
    })
}

async function addRole() {
    // A function to add Role to MYSQL
    let query = "select * from department"
    db.query(query, function (err, res) {
        console.log(res)
        // same from addDepartment except you need to ask name, salary and department_id
        inquirer.prompt([
            {
                name: "role",
                message: "What is the role?",
            },
            {
                name: "salary",
                message: "How much is the salary per hour?",
            },
            {
                name: "depID",
                type: "list",
                message: "What is the department ID?",
                choices: res.map((item) => ({ name: item.name, value: item.id }))
            },
        ]).then((answers) => {
            const role = answers.role;
            const salary = answers.salary;
            const depID = answers.depID;
            db.query("insert into role set ?", { title: role, salary: salary, department_id: depID })
            console.log(depID)
            console.table(depID)
            handleOptions();
        })
    })
}

async function addEmployee() {
    // A function to add Employee to database
    let query = "select * from role"
    db.query(query, function (err, res) {
        console.log(res)
        inquirer.prompt([
            {
                name: "firstName",
                message: "What is the first name?",
            },
            {
                name: "lastName",
                message: "What is the last name?",
            },
            {
                name: "managerID",
                message: "What is the manager ID??",
            },
            {
                name: "roleID",
                type: "list",
                message: "What is the role ID?",
                choices: res.map((item) => ({ name: item.title, value: item.id }))
            },
        ]).then((answers) => {
            const firstName = answers.firstName;
            const lastName = answers.lastName;
            const manID = answers.managerID
            const roleID = answers.roleID;
            db.query("insert into employee set ?", { first_name: firstName, last_name: lastName, manager_id: manID, role_id: roleID})
            console.log(roleID)
            console.table(roleID)
            handleOptions();
        })
    })
}

async function updateEmployee() {
    // Updates Employee role to MYSQL
    // ask user the id of employee and the updated role
    //.then connects to mysql, db.query (instead of select will use update)
    let query = "select * from role"
    db.query(query, function (err, res) {
        console.log(res)
        inquirer.prompt([
            {
                name: "employeeID",
                type: "input",
                message: "What is the employee ID?",
            },
            {
                name: "roleID",
                type: "list",
                message: "What is the role ID?",
                choices: res.map((item) => ({ name: item.title, value: item.id }))
            },
        ]).then((answers) => {
            const empID = answers.employeeID
            const roleID = answers.roleID;
            db.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleID }, { id: empID }],
            function(){
                handleOptions();
            })
        })
    })
}

// Function that handles all the option to be prompted
async function handleOptions() {
    const options = [
        'View ALL Departments',
        'View ALL Roles',
        'View ALL Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role'
    ]
    const results = await inquirer.prompt([{
        message: 'What would you like to do?',
        name: 'command',
        type: 'list',
        choices: options
    }]);
    if (results.command == 'View ALL Departments') {
        displayDepartments();
    } else if (results.command == 'View ALL Roles') {
        displayRoles();
    } else if (results.command == 'View ALL Employees') {
        displayEmployees();
    } else if (results.command == 'Add a Department') {
        addDepartment();
    } else if (results.command == 'Add a Role') {
        addRole();
    } else if (results.command == 'Add an Employee') {
        addEmployee();
    } else if (results.command == 'Update an Employee Role') {
        updateEmployee();
    }
}

handleOptions();