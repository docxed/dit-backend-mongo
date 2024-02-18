const ReviewsetModel = require('../models/reviewsetModel')

module.exports = {
  createReviewset: async (reviewsetData) => {
    return await ReviewsetModel.create(reviewsetData)
  },
  getAllReviewset: async (filter = {}) => {
    return await ReviewsetModel.find(filter)
  },
  deleteReviewset: async (id) => {
    const reviewset_deleted = await ReviewsetModel.findByIdAndDelete(id)
    return reviewset_deleted
  },
  updateReviewset: async (id, reviewsetData) => {
    return await ReviewsetModel.findByIdAndUpdate(id, reviewsetData, { new: true })
  },
}
