const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/multer');

const requireAuth = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  };

router.get('/login', userController.loginView);
router.post('/login', userController.login);
router.get('/register', userController.registerView);
router.post('/register', upload.profile.single('profileImage'), userController.saveUser);
router.get('/logout',  userController.logout);
router.post('/logout',  userController.logout);

module.exports = router;