const { auth, role } = require('../../../middlewares/authMiddleware')
const evaluateitemService = require('../services/evaluateitemService')

module.exports = {
  createBulkEvaluateItem: [
    auth,
    role('ครู', 'แอดมิน'),
    async (req, res, next) => {
      try {
        await evaluateitemService.createBulkEvaluateItem(req.body, req.user)
        res.status(201).end()
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllEvaluateItem: [
    auth,
    async (req, res, next) => {
      try {
        const filter = {}
        const { del_flag, evaluate_id, examset_id, enroll_id, enrollitem_id } = req.query
        if (del_flag) filter.del_flag = del_flag === 'true'
        if (evaluate_id) filter.evaluate_id = evaluate_id
        if (examset_id) filter.examset_id = examset_id
        if (enroll_id) filter.enroll_id = enroll_id
        if (enrollitem_id) filter.enrollitem_id = enrollitem_id
        const evaluateitems = await evaluateitemService.getAllEvaluateItem(filter)
        res.status(200).json(evaluateitems)
      } catch (err) {
        next(err)
      }
    },
  ],
  getDistinctEvaluateItem: [
    auth,
    async (req, res, next) => {
      try {
        const filter = {}
        const { del_flag, evaluate_id, examset_id, enroll_id, enrollitem_id } = req.query
        if (del_flag) filter.del_flag = del_flag === 'true'
        if (evaluate_id) filter.evaluate_id = evaluate_id
        if (examset_id) filter.examset_id = examset_id
        if (enroll_id) filter.enroll_id = enroll_id
        if (enrollitem_id) filter.enrollitem_id = enrollitem_id
        const evaluateitems = await evaluateitemService.getDistinctlEvaluateItem(filter)
        res.status(200).json(evaluateitems)
      } catch (err) {
        next(err)
      }
    },
  ],
}
