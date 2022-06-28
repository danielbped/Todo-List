const { Router } = require('express')
const { isTitleValid } = require('../middlewares/Task/isValid')
const Task = require('../services/Task')

const router = Router({ mergeParams: true })

router.get('/', Task.getAll)
router.get('/:id', Task.findById)
router.get('/owner/:id', Task.findByOwnerId)
router.post('/', isTitleValid, Task.create)
router.put('/:id', Task.update)
router.delete('/:id', Task.remove)

module.exports = (root) => {
  root.use('/task', router)
}