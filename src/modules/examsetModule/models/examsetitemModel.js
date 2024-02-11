const mongoose = require('mongoose')

const examsetitemSchema = new mongoose.Schema(
  {
    examset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Examset',
    },
    no: {
      type: Number,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamsetitemCategory',
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

module.exports = mongoose.model('Examsetitem', examsetitemSchema)
