const { TimetablePupil, validateTimetable } = require('../models/timetable.pupil.model');
module.exports = {
    addTimetable: async (req, res) => {
        const { error } = validateTimetable(req.body)
        if (error) return res.send({ status: false, message: error.details[0].message })
        const user = new TimetablePupil({
            level: req.body.level,
            timetable: req.body.timetable,
        })
        user.save().then(() => res.json('added')).catch(err => res.status(400).json('Error: ' + err));
    },
    afficheTimetable: async (req, res) => {
        TimetablePupil.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
    },
    getbyLevel: (req, res) => {
        TimetablePupil.find({ level: req.params.level })
        .exec()
        .then((pupils) => {
          res.json(pupils[0].timetable);
        })
        .catch((err) => {
          res.json({ state: 'no', msg: 'Error: ' + err });
        });
    },
}
