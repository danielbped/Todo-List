const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const tokenGenerator = require('../middlewares/User/tokenGenerator');
const ErrorMessages = require('../utils/ErrorMessages');

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

const getAll = async (_req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(StatusCodes.OK).json({ users })
  } catch (err) {
    next(err);
  }
}

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id }
    })

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: ErrorMessages.userNotFound })
    }
    
    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await User.findOne({
      where: { id },
    })

    if (!task) {
      res.status(StatusCodes.NOT_FOUND).json({ message: ErrorMessages.userNotFound })
    }

    await User.destroy({
      where: { id },
    })

    res.status(StatusCodes.OK).end()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  getAll,
  findById,
  remove
}