const express = require('express')
const router = express.Router()
const enrollController = require('../controllers/enrollController')

router.post('/', enrollController.createEnroll)
router.post('/validate', enrollController.validateEnroll)
router.get('/', enrollController.getAllEnroll)
router.get('/:id', enrollController.getEnroll)
router.delete('/:id', enrollController.deleteEnroll)

module.exports = router
