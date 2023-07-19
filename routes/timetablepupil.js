const router = require('express').Router();
const userController = require('../controllers/timetable.pupil.controller');
router.post('/add',userController.addTimetable);
router.get('/',userController.afficheTimetable);
router.get('/getbylevel/:level',userController.getbyLevel);
module.exports=router