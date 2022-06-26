const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'todo-list',
    host: 3000,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'todo-list',
    host: 3000,
    dialect: 'mysql',
  }
};