const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobileNo: {
    type: Number,
    required: true
  },
  adharNo: {
    type: Number,
    required: true
  },
  roomId: {
    type: String,
    required: true
  }
});

var Students = mongoose.model('students', UserSchema);
module.exports = Students;
