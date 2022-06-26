const { Router } = require('express')
const { isEmailValid, isNameValid, isUsernameValid, isPasswordValid } = require('../middlewares/User/isValid')
const User = require('../services/User')

const router = Router({ mergeParams: true })

router.post('/',
  isEmailValid,
  isNameValid,
  isUsernameValid,
  isPasswordValid,
  User.create
)
router.get('/', User.getAll)
router.get('/', User.findByEmail)
router.get('/:id', User.findById)
router.delete('/:id', User.remove)
router.put('/:id', User.update)


module.exports = (root) => {
  root.use('/user', router)
}