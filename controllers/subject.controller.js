const { Subject, validateTimetable } = require('../models/subject.model');
module.exports = {
    addSubject: async (req, res) => {
        const { error } = validateTimetable(req.body)
        if (error) return res.send({ status: false, message: error.details[0].message })
        const user = new Subject({
            name: req.body.name,
            level: req.body.level,
        })
        user.save().then(() => res.json('added')).catch(err => res.status(400).json('Error: ' + err));
    },
    afficheSubject: async (req, res) => {
        Subject.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    suprimerSubject: (req, res) => {
        Subject.findOneAndRemove({ _id: req.params.id })
        .exec()
        .then((pupils) => {
            res.json("Delete suceeded")
        })
        .catch((err) => {
          res.json({ state: 'no', msg: 'Error: ' + err });
        });        
    },
    getbyLevel: (req, res) => {
        Subject.find({ level: req.params.level })
        .exec()
        .then((pupils) => {
          res.json(pupils);
        })
        .catch((err) => {
          res.json({ state: 'no', msg: 'Error: ' + err });
        });
    },
    
    Update: function (req, res) {
        Subject.findById(req.params.id)
            .then(client => {
                client.teacher = req.body.teacher;
                client.save()
                    .then(() => res.json('user updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    getbyid: (req, res) => {
        Subject.findOne({ _id: req.params.id })
            .exec()
            .then((pupils) => {
                res.json(pupils);
            })
            .catch((err) => {
                res.json({ state: 'no', msg: 'Error: ' + err });
            });
    },
}
