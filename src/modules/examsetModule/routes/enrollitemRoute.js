const express = require('express')
const router = express.Router()
const enrollitemController = require('../controllers/enrollitemController')

router.post('/', enrollitemController.createEnrollItem)
router.get('/', enrollitemController.getAllEnrollItem)

module.exports = router
