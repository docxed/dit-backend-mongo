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
}
