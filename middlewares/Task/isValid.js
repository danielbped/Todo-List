const { StatusCodes } = require('http-status-codes')
const errorMessages = require('../../utils/ErrorMessages')

const isTitleValid = (req, res, next) => {
  const { title } = req.body

  if (!title || title === "") {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: errorMessages.emptyTitle })
  }

  return next()
}

module.exports = {
  isTitleValid,
}