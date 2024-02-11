const Joi = require('../../../utils/customJoi')

const createBulkEnrollItemSchema = Joi.object({
  enroll_id: Joi.string().required(),
  enrollitems: Joi.array().items(
    Joi.object({
      enroll_id: Joi.string().required(),
      examset_id: Joi.string().required(),
      examsetitem_id: Joi.string().required(),
      answer: Joi.string().allow(null),
    }),
  ),
})

const createEnrollItemSchema = Joi.object({
  enroll_id: Joi.string().required(),
  examset_id: Joi.string().required(),
  examsetitem_id: Joi.string().required(),
  answer: Joi.string(),
})

module.exports = {
  validateCreateBulkEnrollItem: (data) => createBulkEnrollItemSchema.validate(data),
  validateCreateEnrollItem: (data) => createEnrollItemSchema.validate(data),
}
