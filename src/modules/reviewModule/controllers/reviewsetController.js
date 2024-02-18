const { auth, role } = require('../../../middlewares/authMiddleware')
const reviewsetService = require('../services/reviewsetService')

module.exports = {
  createReviewset: [
    auth,
    async (req, res, next) => {
      try {
        const reviewset = await reviewsetService.createReviewset(req.body)
        res.status(201).json(reviewset)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllReviewset: [
    auth,
    async (req, res, next) => {
      try {
        const { type, user_id } = req.query
        const filter = {}
        if (type) filter.type = { $in: Array.isArray(type) ? type : [type] }
        if (user_id) filter.user_id = user_id
        const reviewsets = await reviewsetService.getAllReviewset(filter)
        res.status(200).json(reviewsets)
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteReviewset: [
    auth,
    async (req, res, next) => {
      try {
        await reviewsetService.deleteReviewset(req.params.id)
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    },
  ],
  updateReviewset: [
    auth,
    async (req, res, next) => {
      try {
        const reviewset = await reviewsetService.updateReviewset(req.params.id, req.body)
        res.status(200).json(reviewset)
      } catch (err) {
        next(err)
      }
    },
  ],
}
