const { auth, role } = require('../../../middlewares/authMiddleware')
const evaluateitemService = require('../services/evaluateitemService')

module.exports = {
  createBulkEvaluateItem: [
    auth,
    role('ครู', 'แอดมิน'),
    async (req, res, next) => {
      try {
        const evaluateitems = await evaluateitemService.createBulkEvaluateItem(req.body, req.user)
        res.status(201).json(evaluateitems)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllEvaluateItem: [
    auth,
    role('ครู', 'แอดมิน'),
    async (req, res, next) => {
      try {
        const evaluateitems = await evaluateitemService.getAllEvaluateItem(req.query)
        res.status(200).json(evaluateitems)
      } catch (err) {
        next(err)
      }
    },
  ],
}
