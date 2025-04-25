const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  createAt: {
    type: Number,
    default: Date.now
  },
  updateAt: {
    type: Number,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', categorySchema);