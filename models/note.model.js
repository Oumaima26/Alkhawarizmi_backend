const mongoose = require('mongoose');
const Joi = require('joi')
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {        
        pupil: { type: Schema.Types.ObjectId, ref: 'Pupil', required: true },
        subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
        level: {type: Number, default: "", required: true},
        note1: {type: Number, default: "", required: true},
        note2: {type: Number, default: "", required: true},
        note3: {type: Number, default: "", required: true},
        mean: {type: Number, default: "", required: true},
    },
    {
        timestamps: true
    },
)
function validateTimetable(t) {
    const schema = Joi.object({
        pupil: Joi.string().allow('', null),
        subject: Joi.string().allow('', null),
        level: Joi.number().allow('', null),
        note1: Joi.number().allow('', null),
        note2: Joi.number().allow('', null),
        note3: Joi.number().allow('', null),
        mean: Joi.number().allow('', null),
    })
    return schema.validate(t)
}
const Note = mongoose.model('Note', userSchema);
module.exports.Note = Note;
module.exports.validateTimetable = validateTimetable;