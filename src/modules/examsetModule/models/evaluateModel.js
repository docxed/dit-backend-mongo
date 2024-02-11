const mongoose = require('mongoose')

const evaluateSchema = new mongoose.Schema(
  {
    examset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Examset',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    is_evaluated: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('Evaluate', evaluateSchema)
