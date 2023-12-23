const UserModel = require('../models/userModel')
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
  validateResetPassword,
} = require('../validations/authValidation')
const { createError } = require('../../../utils/errorHandler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userSerializer } = require('../serializers/userSerializer')
const { sendMail } = require('../../../utils/mailler')

module.exports = {
  passwordHash: async (password) => {
    return await bcrypt.hash(password, 10)
  },
  generateToken: async (user) => {
    const payload = user
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60, // 24 hours
      }),
      refresh_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 7 * 24 * 60 * 60, // 7 days
      }),
    }
  },
  validateRefreshToken: async (refresh_token) => {
    try {
      const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET)
      const user = await UserModel.findById(decoded.id)
      if (!user) throw createError(401, 'refresh_token ไม่ถูกต้อง', 'UnauthorizedError')
      return await module.exports.generateToken(user)
    } catch (err) {
      throw createError(401, 'refresh_token ไม่ถูกต้อง', 'UnauthorizedError')
    }
  },
  registerUser: async (register) => {
    const { error, value: registerData } = validateRegister(register)
    if (error) throw error
    const userExist = await UserModel.findOne({ email: registerData.email })
    if (userExist) throw createError(400, 'อีเมลนี้มีผู้ใช้งานแล้ว', 'ValidationError')

    const password_hashed = await module.exports.passwordHash(registerData.password)
    const user_created = await UserModel.create({
      email: registerData.email,
      prefix: registerData.prefix,
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      school: registerData.school,
      password: password_hashed,
      gender: registerData.gender,
      birthday: registerData.birthday,
      phone: registerData.phone,
      province: registerData.province,
      groups: ['นักเรียน'],
      del_flag: false,
    })
    return userSerializer(user_created)
  },
  loginUser: async (login) => {
    const { error, value: loginData } = validateLogin(login)
    if (error) throw error
    const user = await UserModel.findOne({ email: loginData.email, del_flag: false })
    if (!user) throw createError(400, 'อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'ValidationError')
    const passwordMatch = await bcrypt.compare(loginData.password, user.password)
    if (!passwordMatch) throw createError(400, 'อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'ValidationError')
    return await module.exports.generateToken(userSerializer(user))
  },
  getMe: async (id) => {
    const user = await UserModel.findById(id)
    return userSerializer(user)
  },
  changePassword: async (id, changePassword) => {
    const { error, value: passwordData } = validateChangePassword(changePassword)
    if (error) throw error
    const user = await UserModel.findById(id)
    if (!user) throw createError(400, 'ไม่พบผู้ใช้งาน', 'ValidationError')
    const passwordMatch = await bcrypt.compare(passwordData.password, user.password)
    if (!passwordMatch) throw createError(400, 'รหัสผ่านเดิมไม่ถูกต้อง', 'ValidationError')
    const password_hashed = await module.exports.passwordHash(passwordData.new_password)
    const user_updated = await UserModel.findByIdAndUpdate(
      id,
      { password: password_hashed },
      { new: true },
    )
    return userSerializer(user_updated)
  },
  resetPassword: async ({ email }) => {
    const { error, value: emailData } = validateResetPassword({ email })
    if (error) throw error
    const user = await UserModel.findOne({ email: emailData.email })
    if (!user) throw createError(400, 'ไม่พบผู้ใช้งาน', 'ValidationError')
    const newPassword = Math.random().toString(36).slice(-8)
    const password_hashed = await module.exports.passwordHash(newPassword)
    await UserModel.findByIdAndUpdate(user.id, { password: password_hashed })
    await sendMail({
      from: process.env.MAILER_USER,
      to: emailData.email,
      subject: 'รีเซ็ตรหัสผ่าน',
      text: `รหัสผ่านชั่วคราวของคุณคือ ${newPassword}`,
    })
  },
}
