const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const otpSchema = new Schema({    
    email: {type: String},
    expireIn:{type: Number},
 },
 {
      timestamps: true 
 },)
 const Otpuser = mongoose.model('Otpuser',otpSchema);
 module.exports = Otpuser;