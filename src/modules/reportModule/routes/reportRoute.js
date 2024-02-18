const express = require('express')
const router = express.Router()

const examsetController = require('../controllers/examsetController')
const reviewsetController = require('../controllers/reviewsetController')
router.get('/examset', examsetController.getReportExamset)
router.get('/reviewset', reviewsetController.getReportReviewset)

module.exports = router
