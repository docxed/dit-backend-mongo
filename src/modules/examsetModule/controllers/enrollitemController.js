const { auth, role } = require('../../../middlewares/authMiddleware')
const enrollitemService = require('../services/enrollitemService')

module.exports = {
  createEnrollItem: [
    auth,
    async (req, res, next) => {
      try {
        const enrollitem = await enrollitemService.createEnrollItem(req.body, req.user)
        res.status(201).json(enrollitem)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllEnrollItem: [
    auth,
    async (req, res, next) => {
      try {
        const { del_flag, examset_id, enroll_id, examsetitem_id, create_by } = req.query
        const filter = {}
        if (examset_id) filter.examset_id = examset_id
        if (enroll_id) filter.enroll_id = enroll_id
        if (examsetitem_id) filter.examsetitem_id = examsetitem_id
        if (create_by) filter.create_by = create_by
        if (del_flag) filter.del_flag = del_flag === 'true'
        const enrollitems = await enrollitemService.getAllEnrollItem(filter)
        res.status(200).json(enrollitems)
      } catch (err) {
        next(err)
      }
    },
  ],
}
