const mongoose = require('mongoose')

const enrollSchema = new mongoose.Schema(
  {
    examset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Examset',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    start_datetime: {
      type: Date,
      required: true,
    },
    end_datetime: {
      type: Date,
      required: true,
    },
    is_submitted: {
      type: Boolean,
      default: false,
    },
    attempt: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model('Enroll', enrollSchema)
