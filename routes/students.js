const express = require('express');
const passport = require('passport');
const router = express.Router();

const auth = require('../controllers/student');
const passportService = require('../s/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/getStudents', requireAuth, auth.getStudents);
router.post('/addStudents',requireAuth, auth.addStudents);

module.exports = router;
