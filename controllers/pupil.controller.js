const { Pupil, validateUser, validateLogin } = require('../models/pupil.model');
const Otp = require('../otp/otp.pupil');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    login: async (req, res) => {
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).send({ status: false, message: error.details[0].message })
        const user = await Pupil.findOne({ cin: Number(req.body.cin) });
        if (!user) return res.send({ status: false, message: 're-enter your data' });
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.send({ status: false, message: 're-enter your data' })
        jwt.sign({ user }, 'secretkey', (err, token) => {
            res.json({
                status: true,
                id: user.id,
                password: user.password,
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.gender,
                level: user.level,
                date_birth: user.date_birth,
                birthplace: user.birthplace,
                photo: user.photo,
                first_name_father: user.first_name_father,
                last_name_father: user.last_name_father,
                first_name_mother: user.first_name_mother,
                last_name_mother: user.last_name_mother,
                cin: user.cin,
                phone: user.phone,
                address: user.address,
                token: token,
            });
        });
    },
    register: async (req, res) => {
        const { error } = validateUser(req.body)
        if (error) return res.send({ status: false, message: error.details[0].message })
        const cinExist = await Pupil.findOne({ cin: req.body.cin });
        if (cinExist) return res.send({ status: false, message: 'CIN user before' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new Pupil({
            password: hashPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            level: req.body.level,
            date_birth: req.body.date_birth,
            birthplace: req.body.birthplace,
            photo: req.body.photo,
            first_name_father: req.body.first_name_father,
            last_name_father: req.body.last_name_father,
            first_name_mother: req.body.first_name_mother,
            last_name_mother: req.body.last_name_mother,
            cin: req.body.cin,
            phone: req.body.phone,
            address: req.body.address,
        })
        user.save().then(() => res.json('added')).catch(err => res.status(400).json('Error: ' + err));
    },
    //** RECUPERATION D'UN UTILISATEUR A PARTIR DE SON ID**/
    getbyid: (req, res) => {
        Pupil.findOne({ _id: req.params.id })
            .exec()
            .then((pupils) => {
                res.json(pupils);
            })
            .catch((err) => {
                res.json({ state: 'no', msg: 'Error: ' + err });
            });
    },
    getbyLevel: (req, res) => {
        Pupil.find({ level: req.params.level })
            .exec()
            .then((pupils) => {
                res.json(pupils);
            })
            .catch((err) => {
                res.json({ state: 'no', msg: 'Error: ' + err });
            });
    },
    afficheUser: async (req, res) => {
        Pupil.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    /*
    UpdateUser: function (req, res) {
        Pupil.updateOne(
            {
                _id: req.params.id
            }, {
            $set: req.body
        },
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                level: req.body.level,
                first_name_father: req.body.first_name_father,
                last_name_father: req.body.last_name_father,
                first_name_mother: req.body.first_name_mother,
                last_name_mother: req.body.last_name_mother,
                cin: req.body.cin,
                phone: req.body.phone,
                address: req.body.address,
            },
            function (err, list) {
                if (err) {
                    res.json({ state: 'no', msg: 'error' + err })
                } else {
                    res.json({ state: 'ok', msg: 'done' })
                }
            }
        )
    },
    */
    Update: function (req, res) {
        Pupil.findById(req.params.id)
            .then(client => {
                client.first_name = req.body.first_name;
                client.last_name = req.body.last_name;
                client.first_name_father = req.body.first_name_father;
                client.last_name_father = req.body.last_name_father;
                client.first_name_mother = req.body.first_name_mother;
                client.last_name_mother = req.body.last_name_mother;
                client.phone = Number(req.body.phone);
                client.level = Number(req.body.level);
                client.address = req.body.address;
                client.cin = Number(req.body.cin);
                client.save()
                    .then(() => res.json('user updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    //** SUPPRESSION D'UN UTILISATEUR A PARTIR DE SON ID**/
    suprimerUser: (req, res) => {
        Pupil.findOneAndRemove({ _id: req.params.id })
            .exec()
            .then((pupils) => {
                res.json("Delete suceeded")
            })
            .catch((err) => {
                res.json({ state: 'no', msg: 'Error: ' + err });
            });

    },
    Logout: async (req, res) => {
        res.json({ status: false, id: '', token: '' });
    },
    searchUser: async (req, res) => {

        const { role } = req.params;
        const radiologue = await Pupil.find({
            role: { $regex: '.*' + role + '.*' }
        })
        if (!radiologue) return res.status(200).json({ success: false, message: "nothing to show" })
        res.status(200).json(radiologue);

    },
    emailSend: async (req, res) => {
        const data = await Pupil.findOne({ email: req.body.email });
        const responseType = {};
        if (data) {
            let otpData = new Otp({
                email: req.body.email,
                expireIn: new Date().getTime() + 300 * 1000
            })
            let otpResponse = await otpData.save();
            responseType.statusText = 'Success'
            responseType.message = 'Please check Your Email Id';
        } else {
            responseType.statusText = 'error';
            responseType.message = 'Email Id not Exist';
        }
        res.status(200).json(responseType);
    },
    changePassword: async (req, res) => {
        let data = await Otp.find({ email: req.body.email });
        const response = {}
        if (data) {
            let currentTime = new Date().getTime();
            let diff = data.expireIn - currentTime;
            if (diff < 0) {
                response.message = 'Token Expire'
                response.statusText = 'error'
            } else {
                let user = await Pupil.findOne({ email: req.body.email })
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password, salt);
                user.password = hashPassword;
                user.save();
                response.message = 'Password changed Successfully'
                response.statusText = 'Success'
            }
        } else {
            response.message = 'Invalid otp'
            response.statusText = 'error'
        }
        res.status(200).json(response);

    },
    mailer: (email, otp) => {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: 'kadrioumayma57@gmail.com',
                pass: 'oumayma2019'
            }
        });
        var mailOptions = {
            from: 'kadrioumayma57@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: "Thank you sir !",
        };
        transporter.sendMail((mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }))
    }
}