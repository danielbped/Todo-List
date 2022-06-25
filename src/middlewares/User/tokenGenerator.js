const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const secret = process.env.SECRET || 'secret'

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
}

const tokenGenerator = async ({ email, password }) => {
  const data = {
    email,
    password,
  }

  const token = jwt.sign({ data }, secret, jwtConfig)

  return token
}

module.exports = tokenGenerator