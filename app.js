const inquirer = require('inquirer')
const mysql = require('mysql2')

const addEmployee = () => {
  console.log('Adding Employee')
}

const viewEmployees = () => {
  console.log('Viewing Employees')
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