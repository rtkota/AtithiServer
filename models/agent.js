const Joi = require('joi');
const mongoose = require('mongoose');

const Agent = mongoose.model('agent', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  person: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  mobile: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
  },
  gstin: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 15
  },
  crate: {
    type: Number,
    min: 0,
    max: 100
  }
}));

function validateAgent(agent) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(255).required(),
    person: Joi.string().min(5).max(50).required(),
    mobile: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    gstin: Joi.string().min(15).max(15).required(),
    crate: Joi.number().min(0).max(100)
  };

  return Joi.validate(agent, schema);
}

exports.Agent = Agent; 
exports.validate = validateAgent;