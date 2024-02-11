const Joi = require('../../../utils/customJoi')

const createBulkEvaluateItemSchema = Joi.object({
  evaluate_id: Joi.string().required(),
  enroll_id: Joi.string().required(),
  evaluateitems: Joi.array().items(
    Joi.object({
      evaluate_id: Joi.string().required(),
      examset_id: Joi.string().required(),
      enroll_id: Joi.string().required(),
      enrollitem_id: Joi.string().required(),
      score: Joi.number().required(),
      comment: Joi.string().allow(''),
    }),
  ),
})

module.exports = {
  validateCreateEvaluateItem: (data) => createBulkEvaluateItemSchema.validate(data),
}
