const EnrollitemModel = require('../models/enrollitemModel')
const { enrollitemSerializer } = require('../serializers/enrollitemSerializer')

module.exports = {
  createEnrollItem: async (enrollitem, user) => {},
  getAllEnrollItem: async (filters = {}) => {
    const enrollitems = await EnrollitemModel.find(filters)
      .populate('create_by')
      .populate('update_by')
      .populate('examset_id')
      .populate('category_id')
    return enrollitems.map((enrollitem) => enrollitemSerializer(enrollitem))
  },
}
