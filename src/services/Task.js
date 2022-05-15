const { StatusCodes } = require('http-status-codes');
const { Task } = require('../models');

const create = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const task = { title, content, created: new Date(), updated: new Date() };

    const { id } = await Task.create(task);

    res.status(StatusCodes.CREATED).json({ id, ...task })
  } catch (err) {
    next(err)
  }
};

module.exports = {
  create
}