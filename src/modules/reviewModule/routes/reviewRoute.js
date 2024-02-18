const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/reviewController')
router.post('/', reviewController.createReview)
router.get('/', reviewController.getAllReview)
router.delete('/:id', reviewController.deleteReview)
router.put('/:id', reviewController.updateReview)

module.exports = router
