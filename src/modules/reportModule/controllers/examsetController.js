const { auth, role } = require('../../../middlewares/authMiddleware')
const examsetService = require('../services/examsetService')

module.exports = {
  getReportExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const { examset_id } = req.query
        const filter = {}
        if (examset_id) filter.examset_id = examset_id
        const report = await examsetService.getReportExamset(filter)
        res.status(200).json(report)
      } catch (err) {
        next(err)
      }
    },
  ],
}
