const statusCodes = require('http-status-codes').StatusCodes;

const error = async (err, _req, res, _next) => {
  console.log(err.message);
  res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
};

module.exports = (app) => {
  app.use(error);
};