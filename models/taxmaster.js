const Joi = require('joi');
const mongoose = require('mongoose');

const Taxmaster = mongoose.model('Taxmaster', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255,
    unique: true
  }
}));

function validateTaxmaster(taxmaster) {
  const schema = {
    title: Joi.string().min(5).max(50).required()
  };
  return Joi.validate(taxmaster, schema);
}

exports.Taxmaster = Taxmaster; 
exports.validate = validateTaxmaster;