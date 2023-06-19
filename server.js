const inquirer = require('inquirer');
const mysql = require('mysql2');

// TODO connect to mysql database

async function displayDepartments() {
    // TODO implement a function to select all departments from MYSQL
}

async function displayRoles() {
    // TODO implement a function to select all Roles from MYSQL
}

async function displayEmployees() {
    // TODO implement a function to select all Employees from MYSQL
}

async function addDepartment() {
    // TODO implement a function to add department to MYSQL
}

async function addRole() {
    // TODO implement a function to add Role to MYSQL
}

async function addEmployee() {
    // TODO implement a function to add Employee to MYSQL
}

async function updateEmployee() {
    // TODO implement a function to update Employee role to MYSQL
}

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
        handleOptions();
    } else if (results.command == 'View ALL Roles') {
        displayRoles();
        handleOptions();
    } else if (results.command == 'View ALL Employees') {
        displayEmployees();
        handleOptions();
    } else if (results.command == 'Add a Department') {
        addDepartment();
        handleOptions();
    } else if (results.command == 'Add a Role') {
        addRole();
        handleOptions();
    } else if (results.command == 'Add an Employee') {
        addEmployee();
        handleOptions();
    } else if (results.command == 'Update an Employee Role') {
        updateEmployee();
        handleOptions();
    }
}

handleOptions();