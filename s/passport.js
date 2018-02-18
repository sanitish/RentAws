const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// Create local strategy
const localLogin = new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  User.findOne({
    email:email
  }).then(user => {
    if(!user){
      return done(null, false, {message: 'No User Found'});
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Password Incorrect'});
      }
    })
  })
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromBodyField('auth'),

  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
