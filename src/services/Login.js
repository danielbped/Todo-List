const { StatusCodes } = require('http-status-codes')
const ErrorMessages = require('../utils/ErrorMessages')

const login = async (req, res, next) => {
  try {
    const { email, password, username } = req.body

    
  } catch (err) {
    next(err)
  }
}