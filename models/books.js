"use strict"
var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
  title: String,
  description: String,
  images: [{String}],
  price: Number,
  rooms:[{
    roomType: {
      type: String
    },
    roomNo: {
      type: Number
    },
    roomRent: {
      type: Number

    }
  }]
});

var Books = mongoose.model('Books', booksSchema);
module.exports = Books;
