const { Router } = require('express')
const isAdmin = require('../middlewares/User/isAdmin')
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
router.post('/admin',
  isAdmin,
  isEmailValid,
  isNameValid,
  isUsernameValid,
  isPasswordValid,
  User.createAdmin
)

router.get('/', isAdmin, User.getAll)
router.get('/', isAdmin, User.findByEmail)
router.get('/:id', isAdmin, User.findById)
router.delete('/:id', isAdmin, User.remove)
router.put('/:id', isAdmin, User.update)


module.exports = (root) => {
  root.use('/user', router)
}