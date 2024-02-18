const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['ก่อน', 'หลัง'],
    },
    question: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Review', reviewSchema)
