const { Timetable, validateTimetable } = require('../models/timetable.teacher.model');
module.exports = {
    addTimetable: async (req, res) => {
        const user = new Timetable({
            teacher: req.body.teacher,
            timetable: req.body.timetable,
        })
        user.save().then(() => res.json('added')).catch(err => res.status(400).json('Error: ' + err));
    },

    afficheTimetable: async (req, res) => {
        Timetable.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    getbyTeacher: async(req, res) => {
        const teacherId = req.params.teacher;

        Timetable.find({ teacher: teacherId })
            .populate('teacher')
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.error('Error fetching users', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }
}
