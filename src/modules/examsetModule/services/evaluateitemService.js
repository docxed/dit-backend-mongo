const EvaluateitemModel = require('../models/evaluateitemModel')
const EvaluateModel = require('../models/evaluateModel')
const EnrollModel = require('../models/enrollModel')
const { createError } = require('../../../utils/errorHandler')
const { validateCreateEvaluateItem } = require('../validations/evaluateitemValidation')
const { evaluateitemSerializer } = require('../serializers/evaluateitemSerializer')

module.exports = {
  createBulkEvaluateItem: async (evaluateitems, user) => {
    const { error, value: evaluateitemData } = validateCreateEvaluateItem(evaluateitems)
    if (error) throw error
    await EvaluateitemModel.deleteMany({
      evaluate_id: evaluateitemData.evaluate_id,
      enroll_id: evaluateitemData.enroll_id,
      user_id: user.id,
    })
    await EvaluateitemModel.insertMany(
      evaluateitemData.evaluateitems.map((evaluateitem) => ({
        evaluate_id: evaluateitem.evaluate_id,
        examset_id: evaluateitem.examset_id,
        enroll_id: evaluateitem.enroll_id,
        enrollitem_id: evaluateitem.enrollitem_id,
        score: evaluateitem.score,
        comment: evaluateitem.comment,
        user_id: user.id,
        delflag: false,
      })),
    )
    await EvaluateModel.updateOne(
      {
        _id: evaluateitemData.evaluate_id,
      },
      {
        is_evaluated: true,
      },
    )
    await EnrollModel.updateOne(
      {
        _id: evaluateitemData.enroll_id,
      },
      {
        is_evaluated: true,
      },
    )
    return module.exports.getAllEvaluateItem({ evaluate_id: evaluateitemData.evaluate_id })
  },
  getAllEvaluateItem: async (filters = {}) => {
    const evaluateitems = await EvaluateitemModel.find(filters)
      .populate('user_id')
      .populate('enrollitem_id')
      .populate('enroll_id')
    return evaluateitems.map((evaluateitem) => evaluateitemSerializer(evaluateitem))
  },
}
