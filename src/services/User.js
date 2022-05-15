const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const tokenGenerator = require('../middlewares/User/tokenGenerator');

const SALT_ROUNDS = 10;

const create = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, password, email } = req.body;

    const cryptedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const user = {
      firstName,
      lastName,
      userName,
      password: cryptedPassword,
      email,
      created: new Date(),
      updated: new Date()
    };

    await User.create(user);

    const token = await tokenGenerator(user);

    return res.status(StatusCodes.CREATED).json({ token })

  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
}