const Joi = require('../../../utils/customJoi')

const createEvaluateSchema = Joi.object({
  examset_id: Joi.string().required(),
  user_id: Joi.string().required(),
})

module.exports = {
  validateCreateEvaluate: (data) => createEvaluateSchema.validate(data),
}
