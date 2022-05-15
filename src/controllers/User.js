const { Router } = require('express');
const { createUserValidation } = require('../middlewares/User/isValid');
const User = require('../services/User');

const router = Router({ mergeParams: true });

router.post('/', createUserValidation, User.create);

module.exports = (root) => {
  root.use('/user', router);
}