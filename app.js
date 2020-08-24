const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root:-Fisher3385-@localhost/employee_db')

const addEmployee = () => {
  console.log('Adding Employee')
  db.query('SELECT * FROM role', (err, roles) => {
    if (err){console.log(err)}
    
    roles = roles.map(role => ({
      name: role.title,
      value: role.id
    }))
    
    db.query('SELECT * FROM employee', (err, employees) => {
      if (err){console.log(err)}
      
      employees = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))

      employees.unshift({name: 'None', value: null})
      
      inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name"
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Choose a role for the employee',
          choices: roles
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Choose a manager for the employee:',
          choices: employees
        }
      ])
      .then(employee => {
        console.log(employee)
        db.query('INSERT INTO employee SET ?', employee, (err) => {
          if (err){console.log(err)}
          console.log('Employee Created!')
          landingPrompt()
        })
      })
      .catch(err => console.log(err))
    })
  })
}

const viewEmployees = () => {
  console.log('Viewing Employees')
  db.query(`
  SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role 
  ON employee.role_id = role.id
  LEFT JOIN department
  ON role.department_id = department.id
  LEFT JOIN employee manager
  ON manager.id = employee.manager_id
  `, (err, employees) => {
    if (err) {console.log(err)}
    console.table(employees)
      landingPrompt()
  })
}

const updateRole = () => {
  console.log('Updating Employees')
  db.query('SELECT * FROM employee', (err, employees) => {
    if (err){console.log(err)}

    employees = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }))

    db.query('SELECT * FROM role', (err, roles) => {
      if (err) { console.log(err) }

      roles = roles.map(role => ({
        name: role.title,
        value: role.id
      }))
    

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee would you like to change?',
          choices: employees
        },
        {
          type: 'list',
          name: 'role',
          message: 'What role do they have?',
          choices: roles
          
        }
      ])
      .then(res => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [res.role, res.employee])
        console.log('Updated!')
        landingPrompt()
      })
      .catch(err => {console.log(err)})
  })
})
}

const addDepartment = () => {
  console.log('Adding Department')
}

const viewDepartments = () => {
  console.log('Viewing Departments')
  db.query(`
  SELECT department.name AS Departments
  FROM department
  `, (err, res) => {
    if (err) {console.log(err)}
    console.table(res)
  })
}

const addRole = () => {
  console.log('Adding Role')
}

const viewRoles = () => {
  console.log('Viewing Roles')
  db.query(`
  SELECT role.title AS Title, role.salary AS Salary, department.name AS Department
  FROM role
  LEFT JOIN department
  ON role.department_id = department.id
  `, (err, res) => {
    if (err){console.log(err)}
    console.table(res)
  })
}


function landingPrompt() {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Would you like to add, view, or edit?',
      choices: [
        {
          name: 'Add An Employee',
          value: 'addEmployee'
        },
        {
          name: 'View Employees',
          value: 'viewEmployees'
        },
        {
          name: `Update An Employee's Role`,
          value: 'updateRole'
        },
        {
          name: 'Add Department',
          value: 'addDepartment'
        },
        {
          name: 'View Departments',
          value: 'viewDepartments'
        },
        {
          name: 'Add A Role',
          value: 'addRole'
        },
        {
          name: 'View Roles',
          value: 'viewRoles'
        },
      ]
    }
  ])
  .then(choice => {

    switch (choice.option) {
      case 'addEmployee':
          addEmployee()
        break;
      case 'viewEmployees':
        viewEmployees()
        break;
      case 'updateRole':
        updateRole()
        break;
      case 'viewDepartments':
        viewDepartments()
        break;
      case 'addDepartment':
        addDepartment()
        break;
      case 'viewRoles':
        viewRoles()
        break;
      case 'addRole':
        addRole()
        break;
    }
  })
  .catch(error => {console.log(error)})
}
landingPrompt();