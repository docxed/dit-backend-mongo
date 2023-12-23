const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    prefix: {
      type: String,
      trim: true,
    },
    school: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    groups: {
      type: Array,
      default: [],
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

module.exports = mongoose.model('User', userSchema)
