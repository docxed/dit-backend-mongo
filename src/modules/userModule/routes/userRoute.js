const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.put('/:id', userController.updateUser)
router.get('/', userController.getAllUsers)
router.post('/manage', userController.manageCreateUser)
router.put('/manage/:id', userController.manageUpdateUser)

module.exports = router
