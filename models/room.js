const Joi = require('joi');
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  rmno: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 4
  },
  category: {
    type: String,
    minlength: 3,
    maxlength: 50
  },
  bedtype: {
    type: String,
    minlength: 3,
    maxlength: 50
  },
  desc: {
    type: String,
    minlength: 3,
    maxlength: 255
  },
  status: {
    type: String,
    minlength: 5,
    maxlength: 50
  }
});

const Room = mongoose.model('Room', roomSchema);

function validateRoom(room) {
  const schema = {
    rmno: Joi.string().min(3).max(4).required()
  };

  return Joi.validate(room, schema);
}

exports.roomSchema = roomSchema;
exports.Room = Room; 
exports.validate = validateRoom;