const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../../utils/ErrorMessages');

const MIN_SIZE = 4;

const isNameValid = (req, res, next) => {
  const { firstName, lastName } = req.body;
  const fullName = firstName + lastName;
  const isNumberRegex = /\D/;

  if (firstName.lenght < MIN_SIZE || lastName.lenght < MIN_SIZE) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessages.invalidNameLength })
  }

  for (let letter of fullName.split('')) {
    if(!isNumberRegex.test(letter)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessages.invalidNameCharacter })
    }
  }

  next();
}

const isUsernameValid = (req, res, next) => {
  const { userName } = req.body;
  
  if (userName.lenght < MIN_SIZE) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessages.invalidUsernameLength })
  }

  next()
}

const createUserValidation = (req, res, next) => {
  isNameValid(req, res, next);
  isUsernameValid(req, res, next);
};

module.exports = {
  createUserValidation,
}