const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();
const auth = require('../controllers/auth');
const data = require('../controllers/user_profile');
const passportService = require('../s/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.post('/profile', requireAuth, data.profile);
router.put('/editProfile', requireAuth, data.editProfile);

router.post('/signup', auth.signup);
router.post('/signin', requireSignin, auth.signin);
router.post('/login', requireSignin, auth.login);

module.exports = router;
