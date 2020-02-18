const Joi = require('joi');
const mongoose = require('mongoose');

const Userrole = mongoose.model('userrole', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255,
    unique: true
  }
}));

function validateUserrole(userrole) {
  const schema = {
    title: Joi.string().min(5).max(50).required()
  };
  return Joi.validate(userrole, schema);
}

exports.Userrole = Userrole; 
exports.validate = validateUserrole;