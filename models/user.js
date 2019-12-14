const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  registerIP: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
})
// first argument is singular name of collection -> auto convert to plural
module.exports = mongoose.model('user', userSchema)