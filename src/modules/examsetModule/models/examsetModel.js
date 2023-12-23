const mongoose = require('mongoose')

const examsetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    time: {
      type: Number,
      required: true,
      trim: true,
    },
    max_attempt: {
      type: Number,
      required: true,
      trim: true,
    },
    is_password: {
      type: Boolean,
      default: false,
    },
    password: String,
    is_published: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('Examset', examsetSchema)
