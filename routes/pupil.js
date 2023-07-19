const router = require('express').Router();
const userController = require('../controllers/pupil.controller');
router.get('/',userController.afficheUser);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/afficher/:id',userController.getbyid);
router.get('/afficher/level/:level',userController.getbyLevel);
router.post('/update/:id',userController.Update);
router.delete('/supprimer/:id',userController.suprimerUser);
router.get("/:role", userController.searchUser);
router.get("/logout", userController.Logout);

router.post('/email-send',userController.emailSend);
router.post('/change-password',userController.changePassword);
module.exports=router