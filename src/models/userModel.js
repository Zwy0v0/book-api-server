const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sex: {
    type: String
  },
  status: {
    type: String,
    default: 'normal'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }, //Role-based Access Control
  createAt: {
    type: Number,
    default: Date.now
  },
  updateAt: {
    type: Number,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);