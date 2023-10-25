
const express = require('express')
const router = express.Router()
const user = require("../controllers/userController")
const { upload } = require('../middlewares/imageStorage')
const validation = require('../validation/user/userValidation')

router.post("/user_register", upload.single("profilePic"), validation.userSignUpValidation, user.userSignUp)
router.post("/user_login", validation.userLogInValidation, user.userLogIn)
router.post("/reset_password_email", user.resetPasswordEmail)
router.post("/reset_password/:id/:token", user.userPasswordReset)

module.exports = router;
