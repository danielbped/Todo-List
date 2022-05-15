const { Router } = require('express');
const Task = require('../services/Task');

const router = Router({ mergeParams: true });

router.post('/', Task.create);
router.get('/', Task.getAll);
router.delete('/:id', Task.remove);
router.put('/:id', Task.update);

module.exports = (root) => {
  root.use('/task', router)
}