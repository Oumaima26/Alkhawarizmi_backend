const router = require('express').Router();
const userController = require('../controllers/note.controller');
router.post('/add',userController.addNote);
router.get('/',userController.afficheNote);
router.delete('/supprimer/:id',userController.suprimerNote);
router.get('/getbypupil/:pupil',userController.getbyPupil);
module.exports=router