const express = require('express')
const router = express.Router()
const evaluateitemController = require('../controllers/evaluateitemController')

router.post('/bulk', evaluateitemController.createBulkEvaluateItem)
router.get('/', evaluateitemController.getAllEvaluateItem)
router.get('/distinct', evaluateitemController.getDistinctEvaluateItem)

module.exports = router
