const router = require('express').Router();
const userController = require('../controllers/subject.controller');
router.post('/add',userController.addSubject);
router.get('/',userController.afficheSubject);
router.delete('/supprimer/:id',userController.suprimerSubject);
router.post('/update/:id',userController.Update);
router.get('/afficher/level/:level',userController.getbyLevel);
router.get('/afficher/:id',userController.getbyid);
module.exports=router