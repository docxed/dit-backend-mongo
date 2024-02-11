const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.put('/:id', userController.updateUser)
router.get('/', userController.getAllUsers)

module.exports = router
