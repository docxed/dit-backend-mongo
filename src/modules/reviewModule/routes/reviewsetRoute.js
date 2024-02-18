const express = require('express')
const router = express.Router()

const reviewsetController = require('../controllers/reviewsetController')
router.post('/', reviewsetController.createReviewset)
router.get('/', reviewsetController.getAllReviewset)
router.delete('/:id', reviewsetController.deleteReviewset)
router.put('/:id', reviewsetController.updateReviewset)

module.exports = router
