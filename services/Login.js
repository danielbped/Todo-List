const { StatusCodes } = require('http-status-codes')
const ErrorMessages = require('../utils/ErrorMessages')
const { User } = require('./User')
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {
  try {
    const { email, password, username } = req.body

    const user = User.findByEmail(email) || User.findByUsername(username)

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessages.userNotFound })
    }

    if (!bcrypt.compare(password, user.password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessages.wrongPassword })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  login
}