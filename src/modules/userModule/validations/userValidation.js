const Joi = require('../../../utils/customJoi')

const updateUserSchema = Joi.object({
  dq_score: Joi.number().required(),
  m2_score: Joi.number().required(),
  prefix: Joi.string().max(50).required(),
  firstname: Joi.thaiOnly().max(100).required(),
  lastname: Joi.thaiOnly().max(100).required(),
  school: Joi.string().max(255).required(),
  gender: Joi.string().min(1).max(1).required().valid('M', 'F'),
  birthday: Joi.string()
    .max(10)
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .empty(''),
  phone: Joi.string().max(20).empty(''),
  province: Joi.string().max(100).empty(''),
})

const manageCreateUserSchema = Joi.object({
  email: Joi.string().max(100).email().required(),
  dq_score: Joi.number().required(),
  m2_score: Joi.number().required(),
  prefix: Joi.string().max(50).required(),
  firstname: Joi.thaiOnly().max(100).required(),
  lastname: Joi.thaiOnly().max(100).required(),
  school: Joi.string().max(255).required(),
  password: Joi.password().max(20).required(),
  gender: Joi.string().min(1).max(1).required().valid('M', 'F'),
  birthday: Joi.string()
    .max(10)
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .empty(''),
  phone: Joi.string().max(20).empty(''),
  province: Joi.string().max(100).empty(''),
  groups: Joi.array().items(Joi.string().required()),
})

const manageUpdateUserSchema = Joi.object({
  dq_score: Joi.number().required(),
  m2_score: Joi.number().required(),
  prefix: Joi.string().max(50).required(),
  firstname: Joi.thaiOnly().max(100).required(),
  lastname: Joi.thaiOnly().max(100).required(),
  school: Joi.string().max(255).required(),
  gender: Joi.string().min(1).max(1).required().valid('M', 'F'),
  birthday: Joi.string()
    .max(10)
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .empty(''),
  phone: Joi.string().max(20).empty(''),
  province: Joi.string().max(100).empty(''),
  groups: Joi.array().items(Joi.string().required()),
})

module.exports = {
  validateUpdateUser: (data) => updateUserSchema.validate(data),
  validateManageCreateUser: (data) => manageCreateUserSchema.validate(data),
  validateManageUpdateUser: (data) => manageUpdateUserSchema.validate(data),
}
