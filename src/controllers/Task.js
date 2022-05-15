const { Router } = require('express');
const Task = require('../services/Task');

const router = Router({ mergeParams: true });

router.get('/', Task.getAll);
router.get('/:id', Task.findOne);
router.post('/', Task.create);
router.put('/:id', Task.update);
router.delete('/:id', Task.remove);

module.exports = (root) => {
  root.use('/task', router)
}