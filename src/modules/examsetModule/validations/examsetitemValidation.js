const Joi = require('../../../utils/customJoi')

const createExamsetitemSchema = Joi.object({
  no: Joi.number().required(),
  question: Joi.string().required(),
  category_id: Joi.string().required(),
  examset_id: Joi.string().required(),
})

module.exports = {
  validateCreateExamsetitem: (data) => createExamsetitemSchema.validate(data),
}
