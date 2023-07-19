const { Note, validateTimetable } = require('../models/note.model');
module.exports = {
    addNote: async (req, res) => {
        const { error } = validateTimetable(req.body)
        if (error) return res.send({ status: false, message: error.details[0].message })
        const user = new Note({
            pupil: req.body.pupil,
            subject: req.body.subject,
            level: req.body.level,
            note1: req.body.note1,
            note2: req.body.note2,
            note3: req.body.note3,
            mean: req.body.mean,
        })
        user.save().then(() => res.json('added')).catch(err => res.status(400).json('Error: ' + err));
    },
    afficheNote: async (req, res) => {
        Note.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    }, 
    suprimerNote: (req, res) => {
        Note.findOneAndRemove({ _id: req.params.id })
            .exec()
            .then((pupils) => {
                res.json("Delete suceeded")
            })
            .catch((err) => {
                res.json({ state: 'no', msg: 'Error: ' + err });
            });

    },
    getbyPupil: async(req, res) => {
        Note.find({ pupil: req.params.pupil })
            .populate('pupil')
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.error('Error fetching users', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }
}
