const Rooms = require('../models/rooms');
const Users = require('../models/users');
const Students = require('../models/students');

exports.addStudents = function(req, res, next) {
  const name = req.body.name;
  const mobileNo = req.body.mobileNo;
  const adharNo = req.body.adharNo;
  const roomId = req.body.roomId;

  if (!name || !mobileNo || !adharNo || !roomId ) {
    return res.status(422).send({
      error: 'You should provide valid info'
    });
  } else {
    Rooms.find({_id:roomId},(err, room) => {
      if (err) {
        return next(err);
      }
          const student = new Students({
             name:name,
             mobileNo:mobileNo,
             adharNo:adharNo,
             roomId: roomId
          })
          student.save(function(err) {
            if (err) {
              return next(err);
            }
              res.send('student saved');
          })
            })
  }
}

exports.getStudents = function(req, res) {
    Students.find({roomId:req.body.roomId},function(err, student) {
        if (err) {
            throw err;
        }
        res.json(student)
    })

}
