const inquirer = require('inquirer');
const mySQL = require('mysql2');
const cTable = require('console.table');
const { response } = require('express');
const { registerPrompt } = require('inquirer');

const connection = mySQL.createConnection (
    {
        host: 'localhost',
        user: 'root',
        //TODO: Change to your MySQL password
        password: 'Surveyor!47',
        database: 'company_db'
    },
    console.log("Connection to 'company_db' established\n")
)

startPoint = () => {
    console.log(`
===========================
    Welcome back to the 
    supervisors terminal. 
    Select an option 
    below to begin!
===========================
    `)
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
        })
};

viewDepartments = () => {
    connection.query(
        `SELECT * FROM department`, function (err, result) {
            console.log(`\n`)
                cTable(result)
                for (i = 0; i < result.length; i++){
                console.log(`\n`)
                }
        }
    );
   startPoint()
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
            const sql = `INSERT INTO department (department_name)
            VALUE (?)`
        const params = answers.newDepartment;

        connection.query(sql, params, (err,result) => {
            if (err) {
                console.log(err)
            }
            });   
            console.log("\nNew department added!\n") 
            startPoint();
        });
};

viewRoles = () => {
        //TODO: fix output
        connection.query(
            `SELECT * FROM roles`, function (err, result) {
                console.log(`\n`)
                console.table(result)
                for (i = 0; i < result.length-2; i++){
                console.log(`\n`)
                }
            }
        );
    startPoint();
};

addRole = () => {
    const roleArray = [];
    
    connection.query(
        `SELECT * FROM department`, function (err, result) {  
            //test 1
            for (i = 0; i < result.length; i++) {
                roleArray.push(result[i].department_name);

            }
        }     
    ),
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
                choices: roleArray
            }
        ]).then((answers) => {
            let refinedAnswer;

            for (i = 0; i < roleArray.length; i++) {
                if (answers.departmentID === roleArray[i]) {
                    refinedAnswer = [i];
                }
            }

            const sql = `INSERT INTO roles (title, salary, department_id)
            VALUE ("${answers.newRole}", ${answers.roleSalary}, ${refinedAnswer})`

        connection.query(sql, (err,result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('New role added')
            }
            });    
            startPoint()
        });
};

viewEmployee = () => {
        //TODO: fix output
        connection.query(
            `SELECT * FROM employee`, function (err, result) {
                console.log(`\n`)
                console.table(result)
                for (i = 0; i < result.length - 3; i++){
                console.log(`\n`)
                }
            }
        );
    startPoint();
};

addEmployee = () => {
    const roleArray = [];
    const employeeArray = [];

    connection.query(
        `SELECT * FROM roles`, function (err, result) {  
            //test 1
            for (i = 0; i < result.length; i++) {
                roleArray.push(result[i].title);
            }
        }     
    ),    
    connection.query(
        `SELECT * FROM employee`, function (err, result) {  
            //test 1
            for (i = 0; i < result.length; i++) {
                employeeArray.push(result[i].first_name + " " + result[i].last_name);
            }
        }     
    ),
    console.log(`
    ==================
     Employee Creator
    ==================
    `),
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the first name of your new Employee?"
            }, {
                type: 'input',
                name: 'lastName',
                message: "What is their last name?"
            }, {
                type: 'list',
                name:'roleID',
                message: "What role does this person have?",
                choices: roleArray
            }, {
                type: 'list',
                name:'managerID',
                message: "Who is this persons manager?",
                choices: employeeArray
            }
        ]).then((answers) => {
            let roleAnswer;
            let managerAnswer;

            for (i = 0; i < roleArray.length; i++) {
                if (answers.roleID === roleArray[i]) {
                    roleAnswer = [i];
                }
            }

            for (i = 0; i < employeeArray.length; i++) {
                if (answers.managerID === employeeArray[i]) {
                    managerAnswer = [i];
                }
            }

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUE ("${answers.firstName}", "${answers.lastName}", ${roleAnswer}, ${managerAnswer})`

            connection.query(sql, (err,result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('New employee added')
                }
            });    
        startPoint()
        })
    
};

updateRole = () => {
    let firstName = [];
    let lastName = [];
    const roleArray2 = [];
    const employeeArray2 = [];

    connection.query(
        `SELECT * FROM roles`, function (err, result) {  
            //test 1
            for (i = 0; i < result.length; i++) {
                roleArray2.push(result[i].title);
            }
        }     
    ),    
    connection.query(
        `SELECT * FROM employee`, function (err, result) {  
            //test 1
            for (i = 0; i < result.length; i++) {
                employeeArray2.push(result[i].first_name + " " + result[i].last_name);
            }
        }     
    ),

    console.log('CODE REACHED HERE 302'),

    console.log(`
    ==================
     Employee Updater
    ==================
    `),
    inquirer
        .prompt([
            {
                type: "input",
                name: "dummyInput",
                message: "How are you feeling today?"
            }, {
                type: 'list',
                name: 'updaterName',
                message: "What is the name of the employee you wish to update?",
                choices: employeeArray2
            }, {
                type: 'list',
                name: 'newRole',
                message: "What would you like their role to be?",
                choices: roleArray2,
            }
        ]).then((answers) => {
            let roleAnswer;
            let firstNameUpdate;
            let lastNameUpdate;

            for (i = 0; i < roleArray2.length; i++) {
                if (answers.newRole === roleArray2[i]) {
                    roleAnswer = [i];
                }
            }

            for (i = 0; i < firstName.length; i++) {
                if (answers.updaterName === employeeArray2[i]) {
                    firstNameUpdate = firstName[i];
                }
            }

            for (i = 0; i < lastName.length; i++) {
                if (answers.updaterName === employeeArray2[i]) {
                    lastNameUpdate = lastName[i];
                }
            }

            console.log('CODE REACHED HERE 348')

            const sql = `UPDATE employee
                        SET role_id = "${roleAnswer}"
                        WHERE first_name = "${firstNameUpdate}" AND last_name = "${lastNameUpdate}"`

                        console.log('CODE REACHED HERE 354')
                    
            connection.query(sql, (err,result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('New employee added')
                }
            });       
            startPoint(); 
        });

};



startPoint();