const UserModel = require('../models/userModel')
const { userSerializer } = require('../serializers/userSerializer')
const {
  validateUpdateUser,
  validateManageCreateUser,
  validateManageUpdateUser,
} = require('../validations/userValidation')
const { passwordHash } = require('./authService')

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
  manageCreateUser: async (user) => {
    const { error, value: userData } = validateManageCreateUser(user)
    if (error) throw error
    const password_hashed = await passwordHash(userData.password)
    const user_created = await UserModel.create({
      email: userData.email,
      dq_score: userData.dq_score,
      prefix: userData.prefix,
      firstname: userData.firstname,
      lastname: userData.lastname,
      school: userData.school,
      password: password_hashed,
      gender: userData.gender,
      birthday: userData.birthday,
      phone: userData.phone,
      province: userData.province,
      groups: userData.groups,
    })
    return userSerializer(user_created)
  },
  manageUpdateUser: async (id, user) => {
    const { error, value: userData } = validateManageUpdateUser(user)
    if (error) throw error
    const user_updated = await UserModel.findByIdAndUpdate(id, userData, { new: true })
    return userSerializer(user_updated)
  },
}
