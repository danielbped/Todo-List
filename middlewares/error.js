const { StatusCodes } = require('http-status-codes')

const error = async (err, _req, res, _next) => {
  console.log(err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
}

module.exports = (app) => {
  app.use(error)
}