const { auth, role } = require('../../../middlewares/authMiddleware')
const examsetService = require('../services/examsetService')
const moment = require('../../../utils/moment')

module.exports = {
  createExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examset = await examsetService.createExamset(req.body, req.user)
        res.status(201).json(examset)
      } catch (err) {
        next(err)
      }
    },
  ],
  getExamset: [
    auth,
    async (req, res, next) => {
      try {
        const examset = await examsetService.getExamset(req.params.id)
        res.status(200).json(examset)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllExamset: [
    auth,
    async (req, res, next) => {
      try {
        const { start_date, end_date, del_flag, is_published } = req.query
        const filter = {}
        if (del_flag) filter.del_flag = del_flag === 'true'
        if (start_date && end_date) {
          filter.createdAt = {
            $gte: moment(start_date).startOf('day').toDate(),
            $lte: moment(end_date).endOf('day').toDate(),
          }
        } else if (start_date) {
          filter.createdAt = {
            $gte: moment(start_date).startOf('day').toDate(),
          }
        } else if (end_date) {
          filter.createdAt = {
            $lte: moment(end_date).endOf('day').toDate(),
          }
        }
        if (is_published) filter.is_published = is_published === 'true'
        const examsets = await examsetService.getAllExamset(filter)
        res.status(200).json(examsets)
      } catch (err) {
        next(err)
      }
    },
  ],
  updateExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examset = await examsetService.updateExamset(req.params.id, req.body, req.user)
        res.status(200).json(examset)
      } catch (err) {
        next(err)
      }
    },
  ],
  patchExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examset = await examsetService.patchExamset(req.params.id, req.body, req.user)
        res.status(200).json(examset)
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        await examsetService.deleteExamset(req.params.id, req.user)
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    },
  ],
}
