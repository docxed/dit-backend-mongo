const Joi = require('../../../utils/customJoi')

const createExamsetitemCategorySchema = Joi.object({
  name: Joi.string().max(255).required(),
})

module.exports = {
  validateCreateExamsetitemCategory: (data) => createExamsetitemCategorySchema.validate(data),
}
