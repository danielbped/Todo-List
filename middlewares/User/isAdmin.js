const { StatusCodes } = require('http-status-codes')
const errorMessages = require('../../utils/ErrorMessages')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = (req) => {
  const { authorization } = req.body
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

  return user.role === 'admin'
}