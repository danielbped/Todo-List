const express = require('express');
const bodyParser = require('body-parser');
const error = require('../middlewares/error')
const root = require('../controllers/root');

const app = express();

app.use(bodyParser.json());

root(app);
error(app);

module.exports = app;