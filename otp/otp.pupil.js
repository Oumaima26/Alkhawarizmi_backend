const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const otpSchema = new Schema({    
    email: {type: String},
    expireIn:{type: Number},
 },
 {
      timestamps: true 
 },)

 
 const Otppupil = mongoose.model('Otppupil',otpSchema);

 module.exports = Otppupil;