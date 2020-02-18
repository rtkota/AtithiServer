const Joi = require('joi');
const mongoose = require('mongoose');

const postingtypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    isreceipt: {
        type: Boolean,
        default: false
    },
    taxes: [{
        type: new mongoose.Schema({
            tax: {
                type: new mongoose.Schema({
                    name: {
                    type: String,
                    required: true,
                    trim: true, 
                    minlength: 5,
                    maxlength: 255,
                    unique: true
                }})
            },
            limitfrom: { 
                type: Number, 
                min: 0
            },
            limitto: { 
                type: Number, 
                min: 0
            },
            rate: { 
                type: Number, 
                min: 0
            }
        })
    }]
});
function validatePostingtype(postingtype) {
    const schema = {
      taxId: Joi.objectId().required()
    };
  
    return Joi.validate(postingtype, schema);
  }
  
  exports.Postingtype = Postingtype; 
  exports.validate = validatePostingtype;