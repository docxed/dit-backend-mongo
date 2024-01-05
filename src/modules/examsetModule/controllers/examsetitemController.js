const { auth, role } = require('../../../middlewares/authMiddleware')
const examsetitemService = require('../services/examsetitemService')

module.exports = {
  createExamsetitem: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examsetitem = await examsetitemService.createExamsetitem(req.body, req.user)
        res.status(201).json(examsetitem)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllExamsetitem: [
    auth,
    async (req, res, next) => {
      try {
        const { start_date, end_date, del_flag, examset_id } = req.query
        const filter = {}
        if (examset_id) filter.examset_id = examset_id
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
        const examsetitems = await examsetitemService.getAllExamsetitem(filter)
        res.status(200).json(examsetitems)
      } catch (err) {
        next(err)
      }
    },
  ],
  getExamsetitem: [
    auth,
    async (req, res, next) => {
      try {
        const examsetitem = await examsetitemService.getExamsetitem(req.params.id)
        res.status(200).json(examsetitem)
      } catch (err) {
        next(err)
      }
    },
  ],
  updateExamsetitem: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        const examsetitem = await examsetitemService.updateExamsetitem(
          req.params.id,
          req.body,
          req.user,
        )
        res.status(200).json(examsetitem)
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteExamsetitem: [
    auth,
    role(['แอดมิน']),
    async (req, res, next) => {
      try {
        await examsetitemService.deleteExamsetitem(req.params.id, req.user)
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    },
  ],
}
