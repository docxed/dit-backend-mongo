const ExamsetitemModel = require('../models/examsetitemModel')
const { examsetitemSerializer } = require('../serializers/examsetitemSerializer')
const { validateCreateExamsetitem } = require('../validations/examsetitemValidation')

module.exports = {
  createExamsetitem: async (examsetitem, user) => {
    const { error, value: examsetitemData } = validateCreateExamsetitem(examsetitem)
    if (error) throw error
    const { _id } = await ExamsetitemModel.create({
      examset_id: examsetitemData.examset_id,
      question: examsetitemData.question,
      category_id: examsetitemData.category_id,
      create_by: user.id,
      del_flag: false,
    })
    return module.exports.getExamsetitem(_id)
  },
  getAllExamsetitem: async (filters = {}) => {
    const examsetitems = await ExamsetitemModel.find(filters)
      .populate('create_by')
      .populate('update_by')
      .populate('examset_id')
      .populate('category_id')
    return examsetitems.map((examsetitem) => examsetitemSerializer(examsetitem))
  },
  getExamsetitem: async (id) => {
    const examsetitem = await ExamsetitemModel.findOne({
      _id: id,
      del_flag: false,
    })
      .populate('create_by')
      .populate('update_by')
      .populate('examset_id')
      .populate('category_id')
    return examsetitemSerializer(examsetitem)
  },
  updateExamsetitem: async (id, examsetitem, user) => {
    const { error, value: examsetitemData } = validateCreateExamsetitem(examsetitem)
    if (error) throw error
    const examsetitem_updated = await ExamsetitemModel.findOneAndUpdate(
      { _id: id, del_flag: false },
      {
        examset_id: examsetitemData.examset_id,
        question: examsetitemData.question,
        category_id: examsetitemData.category_id,
        update_by: user.id,
      },
      { new: true },
    )
      .populate('create_by')
      .populate('update_by')
      .populate('examset_id')
      .populate('category_id')

    return examsetitemSerializer(examsetitem_updated)
  },
  deleteExamsetitem: async (id, user) => {
    const examsetitem_deleted = await ExamsetitemModel.findOneAndUpdate(
      { _id: id, del_flag: false },
      { del_flag: true, update_by: user.id },
      { new: true },
    )
      .populate('create_by')
      .populate('update_by')
      .populate('examset_id')
      .populate('category_id')
    return examsetitemSerializer(examsetitem_deleted)
  },
}
