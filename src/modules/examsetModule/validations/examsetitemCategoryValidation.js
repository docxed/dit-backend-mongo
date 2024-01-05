const Joi = require('../../../utils/customJoi')

const createExamsetitemCategorySchema = Joi.object({
  name: Joi.string().max(100).required(),
})

module.exports = {
  validateCreateExamsetitemCategory: (data) => createExamsetitemCategorySchema.validate(data),
}
