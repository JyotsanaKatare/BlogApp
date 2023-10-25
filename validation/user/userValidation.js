
const { join } = require("path")
const user = require("./userSchema")
const { Console } = require("console")
const keys = require("joi/lib/types/keys")
const { default: common } = require("joi/lib/common")

module.exports = {
    userSignUpValidation: async (req, res, next) => {
        const value = await user.userSignUp.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    userLogInValidation: async (req, res, next) => {
        const value = await user.userLogIn.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}
