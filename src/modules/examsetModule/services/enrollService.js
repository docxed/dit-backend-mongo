const EnrollModel = require('../models/enrollModel')
const ExamsetModel = require('../models/examsetModel')
const { enrollSerializer } = require('../serializers/enrollSerializer')
const { validateCreateEnroll } = require('../validations/enrollValidation')
const { createError } = require('../../../utils/errorHandler')
const moment = require('../../../utils/moment')

module.exports = {
  createEnroll: async (enroll, user) => {
    const { error, value: enrollData } = validateCreateEnroll(enroll)
    if (error) throw error
    const is_examset_exist = await ExamsetModel.findOne({
      _id: enrollData.examset_id,
      del_flag: false,
    })
    if (!is_examset_exist) throw createError(400, 'ไม่พบชุดข้อสอบ', 'ValidationError')
    const is_enroll_exist = await EnrollModel.findOne({
      examset_id: enrollData.examset_id,
      user_id: user.id,
      del_flag: false,
    })
    if (is_enroll_exist) throw createError(400, 'มีการลงทะเบียนแล้ว', 'ValidationError')

    const now = moment().seconds(0)
    const end_datetime = moment(now).add(is_examset_exist.time, 'minutes').seconds(0)
    const enreoll_created = await EnrollModel.create({
      examset_id: enrollData.examset_id,
      user_id: user.id,
      start_datetime: now,
      end_datetime: end_datetime,
      is_submitted: false,
      is_evaluated: false,
      attempt: 0,
      del_flag: false,
    })
    return module.exports.getEnroll(enreoll_created._id)
  },
  getEnroll: async (id) => {
    const enroll = await EnrollModel.findOne({
      _id: id,
      del_flag: false,
    })
      .populate('examset_id')
      .populate('user_id')
    return enrollSerializer(enroll)
  },
  getAllEnroll: async (filter = {}, options = {}) => {
    if (options.skip) {
      options.skip = parseInt(options.skip)
    }
    if (options.limit) {
      options.limit = parseInt(options.limit)
    }
    if (options.sortDesc) {
      options.sortDesc = parseInt(options.sortDesc)
    }
    const enrolls = await EnrollModel.find(filter)
      .skip(options.skip)
      .limit(options.limit)
      .sort({ [options.sortBy]: options.sortDesc })
      .populate('examset_id')
      .populate('user_id')
    return enrolls.map((enroll) => enrollSerializer(enroll))
  },
  getEnrollCount: async () => {
    const count = await EnrollModel.countDocuments()
    return count
  },
  deleteEnroll: async (id) => {
    return await EnrollModel.findOneAndUpdate(
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
    )
  },
  validateEnroll: async (enroll, user) => {
    const now = moment().seconds(0)
    const { enroll_id } = enroll
    const enroll_exist = await EnrollModel.findOne({
      _id: enroll_id,
      user_id: user.id,
      del_flag: false,
    }).populate('examset_id')
    if (!enroll_exist) throw createError(400, 'ไม่พบการลงทะเบียน', 'ValidationError')
    if (enroll_exist.is_evaluated)
      throw createError(400, 'คุณทำแบบทดสอบเรียบร้อยแล้ว', 'ValidationError')
    if (enroll_exist.attempt >= enroll_exist.examset_id.max_attempt)
      throw createError(400, 'คุณทำแบบทดสอบครบจำนวนครั้งแล้ว', 'ValidationError')
    if (now.isAfter(enroll_exist.end_datetime))
      throw createError(400, 'เวลาทำแบบทดสอบหมดแล้ว', 'ValidationError')
    if (enroll_exist.examset_id.is_published === false)
      throw createError(400, 'แบบทดสอบยังไม่เปิดให้ทำ', 'ValidationError')
    return enroll_exist
  },
}
