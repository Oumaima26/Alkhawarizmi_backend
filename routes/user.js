const router = require('express').Router();
const userController = require('../controllers/user.controller');
router.get('/',userController.afficheUser);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/afficher/:id',userController.getbyid);
router.put('/update/:id',userController.UpdateUser);
router.post('/update/:id',userController.Update);
router.delete('/supprimer/:id',userController.suprimerUser);
router.get("/:role", userController.searchUser);
router.get("/logout", userController.Logout);
router.get('countteacher',userController.countTeacher);
router.post('/email-send',userController.emailSend);
router.post('/change-password',userController.changePassword);
module.exports=router