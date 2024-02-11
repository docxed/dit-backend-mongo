const ExamsetitemModel = require('../models/examsetitemModel')
const { examsetitemSerializer } = require('../serializers/examsetitemSerializer')
const { validateCreateExamsetitem } = require('../validations/examsetitemValidation')
const { createError } = require('../../../utils/errorHandler')

module.exports = {
  createExamsetitem: async (examsetitem, user) => {
    const { error, value: examsetitemData } = validateCreateExamsetitem(examsetitem)
    if (error) throw error
    const is_duplicate_no = await ExamsetitemModel.findOne({
      no: examsetitemData.no,
      examset_id: examsetitemData.examset_id,
      del_flag: false,
    })
    if (is_duplicate_no) throw createError(400, 'เลขข้อที่ซ้ำ', 'ValidationError')
    const { _id } = await ExamsetitemModel.create({
      examset_id: examsetitemData.examset_id,
      no: examsetitemData.no,
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
    const examsetitem = await ExamsetitemModel.findOne({ _id: id, del_flag: false })
      .populate('create_by')
      .populate('update_by')
      .populate('examset_id')
      .populate('category_id')
    if (!examsetitem) throw createError(404, 'ไม่พบข้อมูล', 'NotFoundError')
    return examsetitemSerializer(examsetitem)
  },
  updateExamsetitem: async (id, examsetitem, user) => {
    const { error, value: examsetitemData } = validateCreateExamsetitem(examsetitem)
    if (error) throw error
    const is_duplicate_no = await ExamsetitemModel.findOne({
      no: examsetitemData.no,
      examset_id: examsetitemData.examset_id,
      del_flag: false,
    })
    if (is_duplicate_no && is_duplicate_no._id.toString() !== id) {
      throw createError(400, 'เลขข้อที่ซ้ำ', 'ValidationError')
    }
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
