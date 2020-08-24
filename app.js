const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root:-Fisher3385-@localhost/employee_db')

const addEmployee = () => {
  console.log('Adding Employee')
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
  `, (err, data) => {
    if (err) {console.log(err)}
    console.log(data)
  })
}

const updateRole = () => {
  console.log('Updating Employees')
}

const addDepartment = () => {
  console.log('Adding Department')
}

const viewDepartments = () => {
  console.log('Viewing Departments')
}

const addRole = () => {
  console.log('Adding Role')
}

const viewRoles = () => {
  console.log('Viewing Roles')
}

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