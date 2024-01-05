const express = require('express')
const router = express.Router()
const examsetitemCategoryController = require('../controllers/examsetitemCategoryController')

router.post('/', examsetitemCategoryController.createExamsetitemCategory)
router.get('/', examsetitemCategoryController.getAllExamsetitemCategory)
router.get('/:id', examsetitemCategoryController.getExamsetitemCategory)
router.put('/:id', examsetitemCategoryController.updateExamsetitemCategory)
router.delete('/:id', examsetitemCategoryController.deleteExamsetitemCategory)
router.put('/:id/restore', examsetitemCategoryController.restoreExamsetitemCategory)

module.exports = router
