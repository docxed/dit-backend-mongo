const express = require('express')
const router = express.Router()
const evaluateitemController = require('../controllers/evaluateitemController')

router.get('/distinct', evaluateitemController.getDistinctEvaluateItem)
router.post('/bulk', evaluateitemController.createBulkEvaluateItem)
router.get('/', evaluateitemController.getAllEvaluateItem)

module.exports = router
