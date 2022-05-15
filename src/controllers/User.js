const { Router } = require('express');
const User = require('../services/User');

const router = Router({ mergeParams: true });

router.post('/', User.create);

module.exports = (root) => {
  root.use('/user', router);
}