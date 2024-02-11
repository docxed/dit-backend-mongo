const EnrollitemModel = require('../models/enrollitemModel')
const EnrollModel = require('../models/enrollModel')
const { enrollitemSerializer } = require('../serializers/enrollitemSerializer')
const { validateCreateBulkEnrollItem } = require('../validations/enrollitemValidation')
const { validateEnroll } = require('./enrollService')
const moment = require('../../../utils/moment')
const { createError } = require('../../../utils/errorHandler')

module.exports = {
  createBulkEnrollItem: async (enrollitems, user) => {
    const { error, value: enrollitemsData } = validateCreateBulkEnrollItem(enrollitems)
    if (error) throw error
    const enroll = await validateEnroll({ enroll_id: enrollitemsData.enroll_id }, user)
    await EnrollitemModel.deleteMany({ enroll_id: enrollitemsData.enroll_id })
    await EnrollitemModel.insertMany(
      enrollitemsData.enrollitems.map((enrollitem) => ({
        ...enrollitem,
        user_id: user.id,
        del_flag: false,
      })),
    )
    await EnrollModel.updateOne(
      { _id: enrollitemsData.enroll_id },
      { is_submitted: true, attempt: enroll.attempt + 1 },
    )
    return module.exports.getAllEnrollItem({ enroll_id: enrollitemsData.enroll_id })
  },
  getAllEnrollItem: async (filters = {}) => {
    const enrollitems = await EnrollitemModel.find(filters)
      .populate('user_id')
      .populate({
        path: 'examsetitem_id',
        populate: {
          path: 'category_id',
        },
      })
    return enrollitems.map((enrollitem) => enrollitemSerializer(enrollitem))
  },
}
