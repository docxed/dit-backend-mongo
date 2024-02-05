const Joi = require('../../../utils/customJoi')

const updateUserSchema = Joi.object({
  dq_score: Joi.number().required(),
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

module.exports = {
  validateUpdateUser: (data) => updateUserSchema.validate(data),
}
