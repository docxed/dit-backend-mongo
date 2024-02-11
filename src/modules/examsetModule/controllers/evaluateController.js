const { auth, role } = require('../../../middlewares/authMiddleware')
const evaluateService = require('../services/evaluateService')

module.exports = {
  createEvaluate: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const evaluate = await evaluateService.createEvaluate(req.body, req.user)
        res.status(201).json(evaluate)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllEvaluates: [
    auth,
    async (req, res, next) => {
      try {
        const { del_flag, user_id, examset_id } = req.query
        const filter = {}
        if (del_flag) filter.del_flag = del_flag === 'true'
        if (user_id) filter.user_id = user_id
        if (examset_id) filter.examset_id = examset_id
        const evaluates = await evaluateService.getAllEvaluates(filter)
        res.status(200).json(evaluates)
      } catch (err) {
        next(err)
      }
    },
  ],
  getEvaluate: [
    auth,
    async (req, res, next) => {
      try {
        const evaluate = await evaluateService.getEvaluate(req.params.id)
        res.status(200).json(evaluate)
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteEvaluate: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const evaluate = await evaluateService.deleteEvaluate(req.params.id)
        res.status(200).json(evaluate)
      } catch (err) {
        next(err)
      }
    },
  ],
}
