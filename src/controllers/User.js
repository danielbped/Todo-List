const { Router } = require('express');
const { isEmailValid, isNameValid, isUsernameValid, isPasswordValid } = require('../middlewares/User/isValid');
const User = require('../services/User');

const router = Router({ mergeParams: true });

router.post('/',
  isEmailValid,
  isNameValid,
  isUsernameValid,
  isPasswordValid,
  User.create
);

router.get('/', User.getAll);

module.exports = (root) => {
  root.use('/user', router);
}