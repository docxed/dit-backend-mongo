const { auth, role } = require('../../../middlewares/authMiddleware')
const enrollService = require('../services/enrollService')
const moment = require('../../../utils/moment')

module.exports = {
  createEnroll: [
    auth,
    async (req, res, next) => {
      try {
        const enroll = await enrollService.createEnroll(req.body, req.user)
        res.status(201).json(enroll)
      } catch (err) {
        next(err)
      }
    },
  ],
  getEnroll: [
    auth,
    async (req, res, next) => {
      try {
        const enroll = await enrollService.getEnroll(req.params.id)
        res.status(200).json(enroll)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllEnroll: [
    auth,
    async (req, res, next) => {
      try {
        const { del_flag, user_id, examset_id } = req.query
        const { skip, limit, sortBy, sortDesc, search } = req.query
        const filter = {}
        if (del_flag) filter.del_flag = del_flag === 'true'
        if (user_id) filter.user_id = user_id
        if (examset_id) filter.examset_id = examset_id
        const enrolls = await enrollService.getAllEnroll(filter, {
          skip: parseInt(skip),
          limit: parseInt(limit),
          sortBy: sortBy || ['createdAt'],
          sortDesc: sortDesc === 'false' ? 1 : -1,
        })
        const enrolls_count = await enrollService.getEnrollCount()
        res.status(200).json({
          results: enrolls,
          count: enrolls_count,
        })
      } catch (err) {
        next(err)
      }
    },
  ],
  deleteEnroll: [
    auth,
    async (req, res, next) => {
      try {
        await enrollService.deleteEnroll(req.params.id)
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    },
  ],
  validateEnroll: [
    auth,
    async (req, res, next) => {
      try {
        const enroll = await enrollService.validateEnroll(req.body, req.user)
        res.status(200).json(enroll)
      } catch (err) {
        next(err)
      }
    },
  ],
}
