const { auth, role } = require('../../../middlewares/authMiddleware')
const reviewService = require('../services/reviewService')

module.exports = {
  createReview: [
    auth,
    async (req, res, next) => {
      try {
        const review = await reviewService.createReview(req.body)
        res.status(201).json(review)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllReview: [
    auth,
    async (req, res, next) => {
      try {
        const { type } = req.query
        const filter = {}
        if (type) filter.type = { $in: Array.isArray(type) ? type : [type] }
        const reviews = await reviewService.getAllReview(filter)
        res.status(200).json(reviews)
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteReview: [
    auth,
    async (req, res, next) => {
      try {
        await reviewService.deleteReview(req.params.id)
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    },
  ],
  updateReview: [
    auth,
    async (req, res, next) => {
      try {
        const review = await reviewService.updateReview(req.params.id, req.body)
        res.status(200).json(review)
      } catch (err) {
        next(err)
      }
    },
  ],
}
