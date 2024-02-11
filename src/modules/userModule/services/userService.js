const UserModel = require('../models/userModel')
const { userSerializer } = require('../serializers/userSerializer')
const { validateUpdateUser } = require('../validations/userValidation')

module.exports = {
  updateUser: async (id, user) => {
    const { error, value: userData } = validateUpdateUser(user)
    if (error) throw error
    const user_updated = await UserModel.findByIdAndUpdate(id, userData, { new: true })
    return userSerializer(user_updated)
  },
  getAllUsers: async (filter = {}) => {
    const users = await UserModel.find(filter)
    return users.map((user) => userSerializer(user))
  },
}
