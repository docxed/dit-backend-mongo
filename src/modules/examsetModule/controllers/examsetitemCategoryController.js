const { auth, role } = require('../../../middlewares/authMiddleware')
const examsetitemCategoryService = require('../services/examsetitemCategoryService')
const moment = require('../../../utils/moment')

module.exports = {
  createExamsetitemCategory: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examsetitemCategory = await examsetitemCategoryService.createExamsetitemCategory(
          req.body,
          req.user,
        )
        res.status(201).json(examsetitemCategory)
      } catch (err) {
        next(err)
      }
    },
  ],
  getExamsetitemCategory: [
    auth,
    async (req, res, next) => {
      try {
        const examsetitemCategory = await examsetitemCategoryService.getExamsetitemCategory(
          req.params.id,
        )
        res.status(200).json(examsetitemCategory)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllExamsetitemCategory: [
    auth,
    async (req, res, next) => {
      try {
        const { start_date, end_date, del_flag } = req.query
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
        const examsetitemCategorys =
          await examsetitemCategoryService.getAllExamsetitemCategory(filter)
        res.status(200).json(examsetitemCategorys)
      } catch (err) {
        next(err)
      }
    },
  ],
  updateExamsetitemCategory: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examsetitemCategory = await examsetitemCategoryService.updateExamsetitemCategory(
          req.params.id,
          req.body,
          req.user,
        )
        res.status(200).json(examsetitemCategory)
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteExamsetitemCategory: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        await examsetitemCategoryService.deleteExamsetitemCategory(req.params.id, req.user)
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    },
  ],
  restoreExamsetitemCategory: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examsetitemCategory = await examsetitemCategoryService.restoreExamsetitemCategory(
          req.params.id,
          req.user,
        )
        res.status(200).json(examsetitemCategory)
      } catch (err) {
        next(err)
      }
    },
  ],
}
