const express = require('express');

const user = require('./User');
const task = require('./Task');
const login = require('./Login');

const root = express.Router({ mergeParams: true });

user(root);
task(root);
// login(root);

module.exports = (app) => {
  app.use('/', root)
};