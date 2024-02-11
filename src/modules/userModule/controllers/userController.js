const userServices = require('../services/userService')

module.exports = {
  updateUser: async (req, res, next) => {
    try {
      const user = await userServices.updateUser(req.params.id, req.body)
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },
  getAllUsers: async (req, res, next) => {
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
}
