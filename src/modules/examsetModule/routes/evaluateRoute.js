const express = require('express')
const router = express.Router()
const evaluateController = require('../controllers/evaluateController')

router.post('/', evaluateController.createEvaluate)
router.get('/', evaluateController.getAllEvaluates)
router.get('/:id', evaluateController.getEvaluate)
router.delete('/:id', evaluateController.deleteEvaluate)

module.exports = router
