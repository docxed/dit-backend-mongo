const mongoose = require('mongoose')

const examsetitemCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

module.exports = mongoose.model('ExamsetitemCategory', examsetitemCategorySchema)
