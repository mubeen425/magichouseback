const express = require("express");

const {
  registerUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  resetPasswordFormSubmit,
  resetPasswordBackend,
  googleLogin,
} = require("../controllers/authController");
const requireAuth = require("../middlewares/requireAuth");
const restrictTo = require("../middlewares/restrictTo");
const { uploadMulter, uploadHandler } = require("../utils/uploadHelper");
const ReferenceUser = require("../utils/ReferenceUser");

const validateRequiredFields = require("../middlewares/validateFields");
const { getAsBool } = require("../utils/helpers");

const requiredFields = ["username", "email", "password"];

const router = express.Router();
router.post("/register", validateRequiredFields(requiredFields), registerUser);
router.post("/login", validateRequiredFields(["identifier", "password"]), loginUser);
router.get("/user-info", requireAuth, getUser);
router.post("/google",googleLogin);

router.post('/forgotPassword',forgotPassword);
if(getAsBool(process.env.RP_SERVER)){
  router.get('/resetPassword/:token',resetPasswordBackend);
  router.post('/resetPassword/',resetPasswordFormSubmit);

}else{
  router.patch('/resetPassword/:token',resetPassword);
}


router.patch('/updateMyPassword',requireAuth, updatePassword);
module.exports = router;
