const Rooms = require('../models/rooms');

const Users = require('../models/users');

exports.profile = function(req, res, next) {
  Users.findOne({
    email: 'qwerty'
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    // //to find total number of single rooms
    //     Rooms.findOne({
    //       roomType: 'single'
    //     }, (err, room) => {
    //       if (err) {
    //         return next(err);
    //       }
    //       var singleRooms = Object.keys(room).length;
    //       console.log(singleRooms + 'singleroom');

    // //to find total number of double rooms
    //     Rooms.findOne({
    //       roomType: 'double'
    //     }, (err, room) => {
    //       if (err) {
    //         return next(err);
    //       }
    //       var doubleRooms = Object.keys(room).length;
    //       console.log(doubleRooms + 'droom');
    //to find total number of rooms
    Rooms.find((err, room) => {
      if (err) {
        return next(err);
      }
      var totalRooms = Object.keys(room).length;
      console.log(totalRooms + 'room');
      res.json({
        user,
        totalRooms: totalRooms,
        //singleRooms: singleRooms,
        //doubleRooms: doubleRooms
        //})
        //})
      })
    })
  })
}

exports.editProfile = (req, res, next) => {
  console.log(req)

  Users.findOne({
    _id: req.user._id
  }).then(user => {
    console.log(user)

    user.name=req.body.name;
    console.log(req.body.name)
    
    user.save()
    .then( user =>{
      res.send(user);
    })
  })
}
