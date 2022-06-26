const { StatusCodes } = require('http-status-codes')
const errorMessages = require('../../utils/ErrorMessages')
const { User } = require('../../models')

const MIN_SIZE = 4

const isNameValid = (req, res, next) => {
  const { firstName, lastName } = req.body
  const fullName = firstName + lastName
  const isNumberRegex = /\D/

  if (firstName.lenght < MIN_SIZE || lastName.lenght < MIN_SIZE) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: errorMessages.invalidNameLength })
  }

  for (let letter of fullName.split('')) {
    if(!isNumberRegex.test(letter)) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessages.invalidNameCharacter })
    }
  }

  return next()
}

const isUsernameValid = async (req, res, next) => {
  const { userName } = req.body
  
  if (userName.lenght < MIN_SIZE) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: errorMessages.invalidUsernameLength })
  }
  
  const user = await User.findOne({  where: { userName }})
  
  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessages.usernameAlreadyExists })
  }

  return next()
}

const isEmailValid = async (req, res, next) => {
  const { email } = req.body

  const emailRegex = /.+@\w+\.\w+(\.\w{2,3})?/
  const validEmail = emailRegex.test(email)

  if (!validEmail) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: errorMessages.invalidEmail })
  }

  const user = await User.findOne({ where: { email } })

  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessages.emailAlreadyRegistered })
  }

  return next()
}

const isPasswordValid = (req, res, next) => {
  const { password } = req.body

  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: errorMessages.invalidPassword })
  }

  return next()
}

module.exports = {
  isNameValid,
  isUsernameValid,
  isEmailValid,
  isPasswordValid
}