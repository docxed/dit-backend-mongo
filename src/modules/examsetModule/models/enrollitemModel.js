const mongoose = require('mongoose')

const enrollitemSchema = new mongoose.Schema(
  {
    enroll_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enroll',
    },
    examset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Examset',
    },
    examsetitem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Examsetitem',
    },
    answer: {
      type: String,
      required: true,
    },
    create_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    update_by: {
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

module.exports = mongoose.model('Enrollitem', enrollitemSchema)
