const { Router } = require('express')
const Login = require('../services/Login')

const router = Router({ mergeParams: true })

router.post('/', Login.login)

module.exports = (root) => {
  root.use('/login', router)
}
