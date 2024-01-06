const Joi = require('../../../utils/customJoi')

const createEnrollSchema = Joi.object({
  examset_id: Joi.string().required(),
})

module.exports = {
  validateCreateEnroll: (data) => createEnrollSchema.validate(data),
}
