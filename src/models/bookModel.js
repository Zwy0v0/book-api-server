const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  stock: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  publishAt: {
    type: Number,
    default: null
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

module.exports = mongoose.model('Book', bookSchema);