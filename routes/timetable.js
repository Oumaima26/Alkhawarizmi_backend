const router = require('express').Router();
const userController = require('../controllers/timetable.teacher.controller');
router.post('/add',userController.addTimetable);
router.get('/',userController.afficheTimetable);
router.get('/getbyteacher/:teacher',userController.getbyTeacher);
module.exports=router