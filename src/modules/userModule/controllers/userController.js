const userServices = require('../services/userService')
const { auth, role } = require('../../../middlewares/authMiddleware')

module.exports = {
  updateUser: [
    auth,
    async (req, res, next) => {
      try {
        const user = await userServices.updateUser(req.params.id, req.body)
        res.status(200).json(user)
      } catch (err) {
        next(err)
      }
    },
  ],
  getAllUsers: [
    auth,
    async (req, res, next) => {
      try {
        const { del_flag, groups } = req.query
        const filter = {}
        if (del_flag) filter.del_flag = del_flag === 'true'
        if (groups) filter.groups = { $in: Array.isArray(groups) ? groups : [groups] }
        const users = await userServices.getAllUsers(filter)
        res.status(200).json(users)
      } catch (err) {
        next(err)
      }
    },
  ],
  manageCreateUser: [
    auth,
    role('แอดมิน'),
    async (req, res, next) => {
      try {
        const user = await userServices.manageCreateUser(req.body)
        res.status(201).json(user)
      } catch (err) {
        next(err)
      }
    },
  ],
  manageUpdateUser: [
    auth,
    role('แอดมิน'),
    async (req, res, next) => {
      try {
        const user = await userServices.manageUpdateUser(req.params.id, req.body)
        res.status(200).json(user)
      } catch (err) {
        next(err)
      }
    },
  ],
}
