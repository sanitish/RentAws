const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  roomType: {
    type: String,
    required: true
  },
  roomNo: {
    type: Number,
    required: true
  },
  roomRent: {
    type: Number,
    required: true
  },
  isEmpty:{
    type: Boolean,
    required: true
  },
  isRentDue:{
    type: Boolean,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

var Rooms = mongoose.model('rooms', UserSchema);
module.exports = Rooms;
