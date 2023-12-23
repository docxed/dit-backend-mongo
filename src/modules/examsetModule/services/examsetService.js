const ExamsetModel = require('../models/examsetModel')
const { examsetSerializer } = require('../serializers/examsetSerializer')
const { validateCreateExamset } = require('../validations/examsetValidation')

module.exports = {
  createExamset: async (examset, user) => {
    const { error, value: examsetData } = validateCreateExamset(examset)
    if (error) throw error
    const examset_created = await ExamsetModel.create({
      title: examsetData.title,
      description: examsetData.description,
      time: examsetData.time,
      max_attempt: examsetData.max_attempt,
      is_password: examsetData.is_password,
      password: examsetData.password,
      create_by: user.id,
      del_flag: false,
      is_published: examsetData.is_published,
    })
    return examsetSerializer(examset_created)
  },
  getExamset: async (id) => {
    const examset = await ExamsetModel.findOne({ _id: id, del_flag: false })
    if (!examset) throw createError(404, 'ไม่พบข้อมูล', 'NotFoundError')
    return examsetSerializer(examset)
  },
  getAllExamset: async (filter = {}) => {
    const examsets = await ExamsetModel.find({ ...filter, del_flag: false })
      .populate('create_by')
      .populate('update_by')
    return examsets.map((examset) => examsetSerializer(examset))
  },
  updateExamset: async (id, examset, user) => {
    const { error, value: examsetData } = validateCreateExamset(examset)
    if (error) throw error
    const examset_updated = await ExamsetModel.findOneAndUpdate(
      { _id: id, del_flag: false },
      {
        title: examsetData.title,
        description: examsetData.description,
        time: examsetData.time,
        max_attempt: examsetData.max_attempt,
        is_password: examsetData.is_password,
        password: examsetData.password,
        update_by: user.id,
        is_published: examsetData.is_published,
      },
      { new: true },
    )
    return examsetSerializer(examset_updated)
  },
  patchExamset: async (id, examset, user) => {
    const examset_updated = await ExamsetModel.findOneAndUpdate(
      {
        _id: id,
        del_flag: false,
      },
      {
        ...examset,
        update_by: user.id,
      },
      {
        new: true,
      },
    )
    return examsetSerializer(examset_updated)
  },
  deleteExamset: async (id, user) => {
    return await ExamsetModel.findOneAndUpdate(
      { _id: id, del_flag: false },
      { del_flag: true, update_by: user.id },
      { new: true },
    )
  },
}
