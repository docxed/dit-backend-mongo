const mongoose = require('mongoose')

const reviewsetSchema = new mongoose.Schema(
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
    answer: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Reviewset', reviewsetSchema)
