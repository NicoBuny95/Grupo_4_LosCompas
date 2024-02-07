const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/multer');

router.get('/login', userController.loginView);
router.post('/login', userController.login);
router.get('/register', userController.registerView);
router.post('/register', upload.profile.single('profileImage'), userController.saveUser);
router.get('/logout',  userController.logout);
router.post('/logout',  userController.logout);

module.exports = router;