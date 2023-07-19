const mongoose = require('mongoose');
const Joi = require('joi')
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        level: {type: Number, default: "", required: true},
        timetable: { type: String, default: "" , required: true},
    },
    {
        timestamps: true
    },
)
function validateTimetable(t) {
    const schema = Joi.object({
        level: Joi.number().allow('', null),
        timetable: Joi.string().allow('', null),
    })
    return schema.validate(t)
}
const TimetablePupil = mongoose.model('TimetablePupil', userSchema);
module.exports.TimetablePupil = TimetablePupil;
module.exports.validateTimetable = validateTimetable;