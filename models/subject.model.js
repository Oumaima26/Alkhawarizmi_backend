const mongoose = require('mongoose');
const Joi = require('joi')
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {        
        teacher: { type: Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, default: "" , required: true},
        level: {type: Number, default: "", required: true},
    },
    {
        timestamps: true
    },
)
function validateTimetable(t) {
    const schema = Joi.object({
        name: Joi.string().allow('', null),
        level: Joi.number().allow('', null),
    })
    return schema.validate(t)
}
const Subject = mongoose.model('Subject', userSchema);
module.exports.Subject = Subject;
module.exports.validateTimetable = validateTimetable;