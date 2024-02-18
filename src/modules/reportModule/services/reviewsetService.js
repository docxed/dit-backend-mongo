const ReviewsetModel = require('../../reviewModule/models/reviewsetModel')

module.exports = {
  getReportReviewset: async (filter = {}) => {
    const reviews = await ReviewsetModel.find(filter).populate('user_id')
    return reviews
  },
}
