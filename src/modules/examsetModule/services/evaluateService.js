const EvaluateModel = require('../models/evaluateModel')
const { createError } = require('../../../utils/errorHandler')
const { validateCreateEvaluate } = require('../validations/evaluateValidation')
const { evaluateSerializer } = require('../serializers/evaluateSerializer')

module.exports = {
  createEvaluate: async (evaluate) => {
    const { error, value: evaluateData } = validateCreateEvaluate(evaluate)
    if (error) throw error
    const is_evaluate_exist = await EvaluateModel.findOne({
      examset_id: evaluateData.examset_id,
      user_id: evaluateData.user_id,
      del_flag: false,
    })
    if (is_evaluate_exist)
      throw createError(400, 'เพิ่มผู้ประเมินในชุดแบบทดสอบนี้แล้ว', 'ValidationError')
    const evaluate_created = await EvaluateModel.create({
      examset_id: evaluateData.examset_id,
      user_id: evaluateData.user_id,
      is_evaluated: false,
      del_flag: false,
    })
    return module.exports.getEvaluate(evaluate_created._id)
  },
  getAllEvaluates: async (filter = {}) => {
    const evaluates = await EvaluateModel.find(filter).populate('user_id').populate('examset_id')
    return evaluates.map((evaluate) => evaluateSerializer(evaluate))
  },
  getEvaluate: async (id) => {
    const evaluate = await EvaluateModel.findOne({
      _id: id,
      del_flag: false,
    })
      .populate('user_id')
      .populate('examset_id')
    return evaluateSerializer(evaluate)
  },
  deleteEvaluate: async (id) => {
    const evaluate_deleted = await EvaluateModel.findOneAndUpdate(
      {
        _id: id,
        del_flag: false,
      },
      {
        del_flag: true,
      },
      {
        new: true,
      },
    ).populate('user_id')
    return evaluateSerializer(evaluate_deleted)
  },
}
