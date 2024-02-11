const mongoose = require('mongoose')

const evaluateitemSchema = new mongoose.Schema(
  {
    evaluate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evaluate',
    },
    examset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Examset',
    },
    enroll_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enroll',
    },
    enrollitem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enrollitem',
    },
    score: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    del_flag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Evaluateitem', evaluateitemSchema)
