const { Router } = require('express');
const { isEmailValid, isNameValid, isUsernameValid } = require('../middlewares/User/isValid');
const User = require('../services/User');

const router = Router({ mergeParams: true });

router.post('/',
  isEmailValid,
  isNameValid,
  isUsernameValid,
  User.create
);

module.exports = (root) => {
  root.use('/user', router);
}