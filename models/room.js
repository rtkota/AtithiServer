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
    minlength: 0,
    maxlength: 50
  },
  bedtype: {
    type: String,
    minlength: 0,
    maxlength: 50
  },
  desc: {
    type: String,
    minlength: 0,
    maxlength: 255
  },
  status: {
    type: String,
    enum:['OCC','VAC','RNR','OOO'],
    default:'VAC',
  }
});

const Room = mongoose.model('Room', roomSchema);

function validateRoom(room) {
  const schema = {
    rmno: Joi.string().min(3).max(4).required(),
    category: Joi.string().min(0).max(50),
    bedtype: Joi.string().min(0).max(50),
    desc: Joi.string().min(0).max(255),
    status: Joi.string().valid('OCC','VAC','RNR','OOO').default('VAC')
  };

  return Joi.validate(room, schema);
}

exports.roomSchema = roomSchema;
exports.Room = Room; 
exports.validate = validateRoom;