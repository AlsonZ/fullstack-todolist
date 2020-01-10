const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: [{
      name: {
        type: String,
        required: true
      },
      array: [{
        text: {
          type: String
        }
      }]
    }],
  creationDate: {
    type: Date,
    default: Date.now
  }
})
// first argument is singular name of collection -> auto convert to plural
module.exports = mongoose.model('list', listSchema)