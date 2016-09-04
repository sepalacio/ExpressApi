/* /modelos/User.js */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Email REGEX
const emailRegex = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']


var UserSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Named first'],
      trim: 'true'
    },
    lastname: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      trim: true,
      maxlength: [30, 'Username too long']
    },
    email: {
      type: String,
      trim: true,
      required: true,
      match: emailRegex
    },
    age: {
      type: Number,
      min: [10, 'Wait a few more year'],
      max: 70
    },
    gender: {
      type: String,
      enum: ['Male', 'Female']
    },
    status: {
      type: Number,
      default: 1
    }
  }, {
    timestamps: true
  } // automatically add createdAt and updatedAt fields to schema.)
)

module.exports = mongoose.model('User', UserSchema)