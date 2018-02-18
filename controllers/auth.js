const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt =require('jwt-simple');
const config =require('../config');
const User = require('../models/users');


 tokenForUser = (user) => {
  const timestamp = new Date().getTime();
    return jwt.encode({sub: user._id, iat: timestamp}, config.secret);
}
exports.signup = function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !name) {
    return res.status(422).send({ error: 'You should provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      name:name,
      email: email,
      password: password
    })
      bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(user.password, salt, (err, hash) =>{
          if(err) throw err;
          user.password= hash;
          user.save(function(err) {
            if (err) { return next(err); }
            // Repond to request indicating the user was created
            res.json(user);
          });
        })
      })
  });
}

exports.login = function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
          throw err;
      }
      res.status(200).send({success:"success"})
  })
};

exports.signin = function(req, res, next) {
  console.log('ok')
  res.send({ token: tokenForUser(req.user)});
}
