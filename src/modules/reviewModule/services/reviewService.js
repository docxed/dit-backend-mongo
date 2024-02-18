const ReviewModel = require('../models/reviewModel')
module.exports = {
  createReview: async (reviewData) => {
    const review_created = await ReviewModel.create(reviewData)
    return review_created
  },
  getAllReview: async (filter = {}) => {
    return await ReviewModel.find(filter)
  },
  deleteReview: async (id) => {
    const review_deleted = await ReviewModel.findByIdAndDelete(id)
    return review_deleted
  },
  updateReview: async (id, reviewData) => {
    return await ReviewModel.findByIdAndUpdate(id, reviewData, { new: true })
  },
}
