const Rooms = require('../models/rooms');
const Users = require('../models/users');

exports.addRooms = function(req, res, next) {
  const roomType = req.body.roomType;
  const roomRent = req.body.roomRent;
  const roomNo = req.body.roomNo;
  const user = req.user._id

  if (!roomType || !roomRent || !roomNo) {
    return res.status(422).send({
      error: 'You should provide info'
    });
  } else {
    Rooms.find({user:req.user._id},(err, room) => {
      if (err) {
        return next(err);
      }
      var count = Object.keys(room).length;
      console.log(count + 'room');

      for (let i = 1; i <= roomNo; i++) {
        const room = new Rooms({
          roomType: roomType,
          roomRent: roomRent,
          roomNo: i+count,
          isEmpty: true,
          isRentDue:false,
          user:user
        })
        room.save(function(err) {
          if (err) {
            return next(err);
          }
        })
      }
     })      // Repond to request indicating the user was created
      res.status(200).send({
        roomCount: roomNo,
        roomtype: roomType,
        roomRent: roomRent,
      });
    }
};

exports.getRooms = function(req, res) {
    Rooms.find({user:req.user._id},function(err, room) {
        if (err) {
            throw err;
        }
        if(room)
        res.json({room})
    })

}
