const mongoose = require('mongoose');
const Joi = require('joi')
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        timetable: { type: String, default: "" , required: true},
    },
    {
        timestamps: true
    },
)
function validateTimetable(t) {
    const schema = Joi.object({
        teacher: Joi.object().allow('', null),
        timetable: Joi.string().allow('', null),
    })
    return schema.validate(t)
}
const Timetable = mongoose.model('Timetable', userSchema);
module.exports.Timetable = Timetable;
module.exports.validateTimetable = validateTimetable;