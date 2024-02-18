const { auth, role } = require('../../../middlewares/authMiddleware')
const reviewsetService = require('../services/reviewsetService')

module.exports = {
  getReportReviewset: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const { user_id, type } = req.query
        const filter = {}
        if (user_id) filter.user_id = user_id
        if (type) filter.type = { $in: Array.isArray(type) ? type : [type] }
        const report = await reviewsetService.getReportReviewset(filter)
        res.status(200).json(report)
      } catch (err) {
        next(err)
      }
    },
  ],
}
