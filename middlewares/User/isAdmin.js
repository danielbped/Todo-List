const { StatusCodes } = require('http-status-codes')
const errorMessages = require('../../utils/ErrorMessages')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  const secret = process.env.SECRET || 'secret'

  if (!authorization){
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: errorMessages.authorizationNotFound
    })
  }

  const user = jwt.verify(authorization, secret)

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: errorMessages.userNotFound
    })
  }

  if (user.data.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).end()
  }

  next()
}