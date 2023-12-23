const express = require('express')
const router = express.Router()
const examsetController = require('../controllers/examsetController')

router.post('/', examsetController.createExamset)
router.get('/:id', examsetController.getExamset)
router.get('/', examsetController.getAllExamset)
router.put('/:id', examsetController.updateExamset)
router.patch('/:id', examsetController.patchExamset)
router.delete('/:id', examsetController.deleteExamset)

module.exports = router
