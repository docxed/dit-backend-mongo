const ExamsetitemCategoryModel = require('../models/examsetitemCategoryModel')
const {
  validateCreateExamsetitemCategory,
} = require('../validations/examsetitemCategoryValidation')
const { examsetitemCategorySerializer } = require('../serializers/examsetitemCategorySerializer')
const { createError } = require('../../../utils/errorHandler')

module.exports = {
  createExamsetitemCategory: async (examsetitemCategory, user) => {
    const { error, value: examsetitemCategoryData } =
      validateCreateExamsetitemCategory(examsetitemCategory)
    if (error) throw error
    const isExist = await ExamsetitemCategoryModel.findOne({
      name: examsetitemCategoryData.name,
    })
    if (isExist) throw createError(400, 'ชื่อซ้ำ', 'ValidationError')
    const { _id } = await ExamsetitemCategoryModel.create({
      name: examsetitemCategoryData.name,
      create_by: user.id,
      del_flag: false,
    })
    return module.exports.getExamsetitemCategory(_id)
  },
  getExamsetitemCategory: async (id) => {
    const examsetitemCategory = await ExamsetitemCategoryModel.findOne({
      _id: id,
      del_flag: false,
    })
      .populate('create_by')
      .populate('update_by')
    return examsetitemCategorySerializer(examsetitemCategory)
  },
  getAllExamsetitemCategory: async (filter = {}) => {
    const examsetitemCategorys = await ExamsetitemCategoryModel.find(filter)
      .populate('create_by')
      .populate('update_by')
    return examsetitemCategorys.map((examsetitemCategory) =>
      examsetitemCategorySerializer(examsetitemCategory),
    )
  },
  updateExamsetitemCategory: async (id, examsetitemCategory, user) => {
    const { error, value: examsetitemCategoryData } =
      validateCreateExamsetitemCategory(examsetitemCategory)
    if (error) throw error
    const isExist = await ExamsetitemCategoryModel.findOne({
      name: examsetitemCategoryData.name,
      _id: { $ne: id },
    })
    if (isExist) throw createError(400, 'ชื่อซ้ำ', 'ValidationError')
    const examsetitemCategoryNew = await ExamsetitemCategoryModel.findByIdAndUpdate(
      id,
      {
        name: examsetitemCategoryData.name,
        update_by: user.id,
      },
      { new: true },
    )
      .populate('create_by')
      .populate('update_by')
    return examsetitemCategorySerializer(examsetitemCategoryNew)
  },
  deleteExamsetitemCategory: async (id, user) => {
    await ExamsetitemCategoryModel.findByIdAndUpdate(
      id,
      {
        del_flag: true,
        update_by: user.id,
      },
      { new: true },
    )
    return true
  },
  restoreExamsetitemCategory: async (id, user) => {
    const examsetitemCategoryNew = await ExamsetitemCategoryModel.findByIdAndUpdate(
      id,
      {
        del_flag: false,
        update_by: user.id,
      },
      { new: true },
    )
      .populate('create_by')
      .populate('update_by')
    return examsetitemCategorySerializer(examsetitemCategoryNew)
  },
}
