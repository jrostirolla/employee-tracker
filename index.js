const inquirer = require('inquirer');
const mySQL = require('mysql2');
const cTable = require('console.table');

const connection = mySQL.createConnection (
    {
        host: 'localhost',
        user: 'root',
        //TODO: change this before upload to github
        password: 'Surveyor!47',
        database: 'company_db'
    },
    console.log("Connection to 'company_db' established")
)

startPoint = () => {

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'taskSelector',
                message: "What would you like to do today?",
                choices: [
                    'view all departments',
                    'add a department',
                    'view all roles',
                    'add a role',
                    'view all employees',
                    'add an employee',
                    'update an employee role',
                    'exit program'
                ]
            }
        ]).then((answers) => {
            let job = answers.taskSelector;
            switch (job) {
                case 'view all departments':
                    viewDepartments()
                        break;
                case 'add a department':
                    addDepartment()
                        break;
                case 'view all roles':
                    viewRoles()
                        break;
                case 'add a role':
                    addRole()
                        break;
                case 'view all employees':
                    viewEmployee()
                        break;
                case 'add an employee':
                    addEmployee()
                        break;
                case 'update an employee role':
                    updateRole()
                        break;
                case 'exit program':
                    console.log('\n So long, Pal!')
                    connection.end();
                        break;
            }

            // if (answers.taskSelector === 'view all departments') {
            //     viewDepartments();
            // } else if (answers.taskSelector === 'add a department') {
            //     addDepartment();
            // } else if (answers.taskSelector === 'view all roles') {
            //     viewRoles();
            // } else if (answers.taskSelector === 'add a role') {
            //     addRole();
            // } else if (answers.taskSelector === 'view all employee') {
            //     viewEmployee();
            // } else if (answers.taskSelector === 'add an employee') {
            //     addEmployee();
            // } else if (answers.taskSelector === 'update an employee role') {
            //     updateRole();
            // } else if (answers.taskSelector === 'exit program') {
            //     console.log('\nSo long pal!')
            // } else {
            //     console.log(err)
            //     startPoint();
            // }
        })
};

viewDepartments = () => {
    //TODO: populate console with all departments here
    connection.query(
        `SELECT * FROM departments`, function (err, res) {

        }
    )

    console.log('view departments selected'),
    startPoint();
};

addDepartment = () => {
    console.log(`
    ==================
    Department Creator
    ==================
    `),
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: "What is the name of your new department?"
            }
        ]).then((answers) => {
            //TODO: figure out how to add to mysql stuff
        })
    startPoint();
};

viewRoles = () => {

        //TODO: populate console with all roles here

    console.log('view role selected'),
    startPoint();
};

addRole = () => {
    console.log(`
    ==================
       Role Creator
    ==================
    `),
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newRole',
                message: "What is the name of your new role?"
            }, {
                type: 'input',
                name: 'roleSalary',
                message: "What is the salary for your new role?"
            }, {
                type: 'list',
                name:'departmentID',
                message: "Which department does this role belong to?",
                choices: [
                    //TODO: figure out how to access the department DB for this entry
                ]
            }
        ]).then((answers) => {
            //TODO: figure out how to add to mysql stuff
        }).then(startPoint());
    
};

viewEmployee = () => {

        //TODO: populate console with all employees here

    console.log('view employee selected'),
    startPoint();
};

addEmployee = () => {
    console.log(`
    ==================
     Employee Creator
    ==================
    `),
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newEmployee',
                message: "What is the name of your new Employee?"
            }, {
                type: 'input',
                name: 'firstName',
                message: "What is their first name?"
            }, {
                type: 'input',
                name: 'lastName',
                message: "What is their last name?"
            }, {
                type: 'list',
                name:'roleID',
                message: "What role does this person have?",
                choices: [
                    //TODO: figure out how to access the role DB for this entry
                ]
            }, {
                type: 'list',
                name:'managerID',
                message: "Who is this persons manager?",
                choices: [
                    //TODO: figure out how to access the employee DB for this entry
                ]
            }
        ]).then((answers) => {
            //TODO: figure out how to add to mysql stuff
        })
    startPoint();
};

updateRole = () => {
    console.log('update role selected'),
    startPoint();
};



startPoint();