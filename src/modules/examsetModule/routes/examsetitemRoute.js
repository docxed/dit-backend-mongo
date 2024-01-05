const express = require('express')
const router = express.Router()
const examsetitemController = require('../controllers/examsetitemController')

router.post('/', examsetitemController.createExamsetitem)
router.get('/', examsetitemController.getAllExamsetitem)
router.get('/:id', examsetitemController.getExamsetitem)
router.put('/:id', examsetitemController.updateExamsetitem)
router.delete('/:id', examsetitemController.deleteExamsetitem)

module.exports = router
