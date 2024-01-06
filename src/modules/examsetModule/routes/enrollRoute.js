const express = require('express')
const router = express.Router()
const enrollController = require('../controllers/enrollController')

router.post('/', enrollController.createEnroll)
router.get('/', enrollController.getAllEnroll)
router.get('/:id', enrollController.getEnroll)

module.exports = router
