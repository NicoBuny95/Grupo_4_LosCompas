const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/multer");
const validateUserRegistration = require("../middlewares/validacionFormUser");
const validateLogin = require("../middlewares/validationFormLogin");

const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
     res.render("login", { title: "Login", css: "/css/login.css" });
    //res.status(404).render('Error404');
  }
};
router.get("/users", userController.getAllUsers);
router.post("/addUser", userController.addUser);
router.get("/login", userController.loginView);
router.post("/login", validateLogin, userController.login);
router.get("/register", userController.registerView);
router.post(
  "/register",
  upload.profile.single("profileImage"),
  validateUserRegistration,
  userController.saveUser
);
router.get("/logout", userController.logout);
router.post("/logout", userController.logout);
router.get("/profile", requireAuth, userController.profileView);
router.get("/editProfile/:id", requireAuth, userController.editUserView);
router.put("/editProfile/:id", requireAuth, userController.modifyUser);
router.put("/editUser/:id", userController.editUser);
router.delete("/deleteUser/:id", userController.deleteUser);
module.exports = router;
