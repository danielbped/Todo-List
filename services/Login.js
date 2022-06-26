const { StatusCodes } = require('http-status-codes')
const ErrorMessages = require('../utils/ErrorMessages')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const tokenGenerator = require('../middlewares/User/tokenGenerator')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessages.userNotFound })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: ErrorMessages.wrongPassword })
    }

    const token = await tokenGenerator(email, password)

    return res.status(StatusCodes.OK).json({ token })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  login
}