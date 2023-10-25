
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendMailer = require("../services/emailservice")
const { sendEmail } = require("../services/emailservice")
const userModelSchema = require("../models/userModelSchema")

const userSignUp = async (req, res) => {
    try {
        const isEmailExists = await userModelSchema.findOne({ userEmail: req.body.userEmail });
        if (isEmailExists) {
            res.status(400).json({
                success: "failure",
                message: "User email is already exists"
            });
        } else {
            const userSignUp = await new userModelSchema(req.body)
            const salt = await bcrypt.genSalt(10);
            userSignUp.userPassword = await bcrypt.hash(req.body.userPassword, salt);
            try {
                filePath = `/uploads/${req.file.filename}`;
                userSignUp.profilePic = filePath;
                userSignUp.save();
                res.status(200).json({
                    success: "success",
                    message: "User's data successfully registered",
                });
            } catch (err) {
                res.status(400).json({
                    success: "failure",
                    message: err.message
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        });
    }
}


const userLogIn = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        if (userEmail && userPassword) {
            const user = await userModelSchema.findOne({ userEmail: userEmail });
            if (user != null) {
                const isMatch = await bcrypt.compare(userPassword, user.userPassword);
                if (user.userEmail === userEmail && isMatch) {
                    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.status(200).json({
                        success: "success",
                        message: "User login successfull",
                        "data": user,
                        "token": token
                    });
                } else {
                    res.status(400).json({
                        success: "failure",
                        message: "Email or Password is invalid"
                    });
                }
            } else {
                res.status(400).json({
                    success: "failure",
                    message: "Not registered user"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            success: "failure",
            message: "err.message"
        });
    }
}


const resetPasswordEmail = async (req, res) => {
    const { userEmail } = req.body;
    try {
        const user = await userModelSchema.findOne({ userEmail: userEmail });
        if (user != null) {
            const secret = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userId: user._Id }, secret, { expiresIn: '60m' });
            const link = 'http://127.0.0.1:9000/api/user/reset/${user._Id}/${token}';
            const id = user._id
            const emailSend = await sendMailer.sendEmail(userEmail, token, id)
            return res.status(201).json({
                success: "success",
                message: "Email send to user successfully",
                userId: user._id,
                token: token
            });
        } else {
            res.status(403).json({
                success: "failure",
                message: "Email user is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: "Failed",
            message: err.message,
        });
    }
}


const userPasswordReset = async (req, res) => {
    const { id, token } = req.params;
    console.log(id, token)
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await userModelSchema.findById(id);
        if (checkUser != null) {
            const secretKey = process.env.JWT_SECRET_KEY;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPassword, salt);
                await userModelSchema.findByIdAndUpdate(checkUser._Id, { $set: { password: password }, });
                res.status(200).json({
                    success: "success",
                    message: "Password update successfully",
                });
            } else {
                res.status(403).json({
                    success: "failure",
                    message: "Newpassword and Confirmpassword is not match",
                });
            }
        } else {
            res.status(403).json({
                success: "failure",
                message: "Email user is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: err.message,
        });
    }
}

module.exports = {
    userSignUp,
    userLogIn,
    resetPasswordEmail,
    userPasswordReset
}
