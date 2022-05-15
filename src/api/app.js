const express = require('express');
const bodyParser = require('body-parser');
const StatusCodes = require('http-status-codes').StatusCodes;

const app = express();

app.use(bodyParser.json());

app.get('/teste', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'ok' })
})

module.exports = app;