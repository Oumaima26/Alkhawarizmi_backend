const mongoose = require('mongoose');
const Joi = require('joi')
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        first_name: { type: String, default: "", required: true},
        last_name: { type: String, default: "", required: true ,match: /^[a-zA-Z0-9- _]+$/},
        password: { type: String, default: "", required: true},
        email: { type: String, default: "", unique: true , required: true},
        cin: { type: Number, default: "", required: true, unique: true , },
        phone: { type: Number, default: "", required: true },
        domain: { type: String, default: "", required: true },
        gender: { type: String, enum: ['female', 'male'] , required: true},
        date_birth: { type: String, default: "" , required: true},
        birthplace: { type: String, default: "" , required: true},
        address: { type: String, default: "" , required: true },
        photo: { type: String, default: "" , required: true},
        role: { type: String, enum: ['admin', 'teacher'] , required: true},
    },
    {
        timestamps: true
    },
)
function validateUser(user) {
    const schema = Joi.object({
        first_name: Joi.string().allow('', null),
        last_name: Joi.string().allow('', null),
        email: Joi.string().email(),
        password: Joi.string().min(6).required(),
        cin: Joi.number().allow('', null),
        phone: Joi.number().allow('', null),
        domain: Joi.string().allow('', null),
        gender: Joi.string().allow('', null),
        date_birth: Joi.string().allow('', null),
        birthplace: Joi.string().allow('', null),
        address: Joi.string().allow('', null),
        photo: Joi.string().allow('', null),
        role: Joi.string().allow('', null),
    })
    return schema.validate(user)
}
function validateLogin(login) {
    const schema2 = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    })
    return schema2.validate(login)
}
const User = mongoose.model('User', userSchema);
module.exports.User = User;
module.exports.validateLogin = validateLogin
module.exports.validateUser = validateUser;