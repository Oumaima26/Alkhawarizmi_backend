const mongoose = require('mongoose');
const Joi=require('joi')
const Schema= mongoose.Schema;

const userSchema = new Schema({
    
    first_name: { type: String, default: "", required: true},
    last_name: { type: String, default: "", required: true},
    password: { type: String, default: "", required: true },
    gender: { type: String, enum: ['female', 'male'] , required: true},
    photo: { type: String, default: "" , required: true},
    level: {type: Number, default: "", required: true},
    date_birth: { type: String, default: "" , required: true},
    birthplace: { type: String, default: "" , required: true},
    address: { type: String, default: "" , required: true},
    first_name_father: {type: String, default: ""},
    last_name_father: {type: String, default: ""},
    first_name_mother: {type: String, default: ""},
    last_name_mother: {type: String, default: ""},   
    cin: { type: Number, default: "", required: true, unique: true },
    phone: { type: Number, default: "", required: true },
    
 },
 {
      timestamps: true 
 },)

 function validateUser(user){    
     const schema=Joi.object({     
        first_name: Joi.string().allow('', null),
        last_name: Joi.string().allow('', null),
        password: Joi.string().min(6).required(),
        photo: Joi.string().allow('', null),
        level: Joi.number().allow('', null),
        gender: Joi.string().allow('', null),
        date_birth: Joi.string().allow('', null),
        birthplace: Joi.string().allow('', null),
        
        first_name_father: Joi.string().allow('', null),
        last_name_father: Joi.string().allow('', null),
        first_name_mother: Joi.string().allow('', null),
        last_name_mother: Joi.string().allow('', null),
        cin: Joi.number().required(),
        phone: Joi.number().allow('', null),
        address: Joi.string().allow('', null),
     }) 
     return schema.validate(user)
 }
 function validateLogin(login){
     const schema2 = Joi.object({
         cin:Joi.number().required(),
         password:Joi.string().min(6).required()
     }) 
     return schema2.validate(login)
 }

 const Pupil = mongoose.model('Pupil',userSchema);

 module.exports.Pupil = Pupil;
 module.exports.validateLogin=validateLogin
 module.exports.validateUser=validateUser;