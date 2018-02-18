const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Idea Model
require('../models/books.js');
const Books = mongoose.model('Books');

// Idea Index Page
router.get('/books', function(req, res) {
    Books.find(function(err, books) {
        if (err) {
            throw err;
        }
        res.json(books)
    })
});


module.exports = router;
