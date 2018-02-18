const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const data = require('../controllers/data');
// Load User Model
const passportService = require('../s/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/getRooms', requireAuth, data.getRooms);
router.post('/addRooms',requireAuth, data.addRooms);
module.exports = router;
