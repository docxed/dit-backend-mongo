const { auth, role } = require('../../../middlewares/authMiddleware')
const examsetService = require('../services/examsetService')
const moment = require('../../../utils/moment')

module.exports = {
  createExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res) => {
      try {
        const examset = await examsetService.createExamset(req.body, req.user)
        res.status(201).json(examset)
      } catch (error) {
        next(err)
      }
    },
  ],
  getExamset: [
    auth,
    async (req, res) => {
      try {
        const examset = await examsetService.getExamset(req.params.id)
        res.status(200).json(examset)
      } catch (error) {
        next(err)
      }
    },
  ],
  getAllExamset: [
    auth,
    async (req, res) => {
      try {
        const { start_date, end_date } = req.query
        const filter = {}
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
        const examsets = await examsetService.getAllExamset(filter)
        res.status(200).json(examsets)
      } catch (error) {
        next(err)
      }
    },
  ],
  updateExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res) => {
      try {
        const examset = await examsetService.updateExamset(req.params.id, req.body, req.user)
        res.status(200).json(examset)
      } catch (error) {
        next(err)
      }
    },
  ],
  patchExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res) => {
      try {
        const examset = await examsetService.patchExamset(req.params.id, req.body, req.user)
        res.status(200).json(examset)
      } catch (error) {
        next(err)
      }
    },
  ],
  deleteExamset: [
    auth,
    role(['แอดมิน']),
    async (req, res) => {
      try {
        await examsetService.deleteExamset(req.params.id, req.user)
        res.status(204).end()
      } catch (error) {
        next(err)
      }
    },
  ],
}
