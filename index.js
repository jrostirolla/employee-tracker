const inquirer = require('inquirer');
const mySQL = require('mysql2');
const cTable = require('console.table');
const { response } = require('express');

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
    Welcome to the supervisors
    terminal. Select an option
    below to begin!
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
    //TODO: fix output
    connection.query(
        `SELECT * FROM department`, function (err, result) {
            console.table(result)
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
                console.table(result)
            }
        );
    startPoint();
};

addRole = () => {
    // Call DB to pull all current roles from list 
    
    const resultArray = [];

        connection.query(
        `SELECT * FROM roles`, function (err, result) {
            
            roleArray.push(result)
            console.log(`\nThis is the filled array: ${result}`)
            console.log(`role array: ${roleArray}`)
            console.log(`role array: ${resultArray}`)
        },
        
    )

    addRole2(roleArray);
}

addRole = () => {
    const roleArray = [];
    
    connection.query(
        `SELECT * FROM department`, function (err, result) {  
            //test 1
            for (i = 0; i < result.length; i++) {
                roleArray.push(JSON.stringify(result[i].department_name)),
                console.log;
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
            //TODO: figure out how to add to mysql stuff
            const sql = `INSERT INTO roles
            VALUE (?)`
        const params = `${answers.newRole}, ${answers.roleSalary}, ${answers.departmentID}`

        connection.query(sql, params, (err,result) => {
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
                console.table(result)
            }
        );
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
            const sql = `INSERT INTO employee
                VALUE (?)`
            const params = `${answers.firstName}, ${answers.lastName}, ${answers.roleID}, ${answers.managerID}`

            connection.query(sql, params, (err,result) => {
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
    console.log('update role selected'),
    startPoint();
};



startPoint();