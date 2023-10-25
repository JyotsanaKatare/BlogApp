
const joi = require("joi")
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const Schema = {
      userSignUp: joi.object({
            userName: joi
                  .string()
                  .min(2)
                  .max(20)
                  .message({
                        "string.min": "Username should min{#limit} characters",
                        "string.max": "Username should max{#limit} characters"
                  })
                  .required(),
            userEmail: joi
                  .string()
                  .email()
                  .message("Invalid email address")
                  .required(),
            userPassword: joiPassword
                  .string()
                  .minOfSpecialCharacters(3)
                  .minOfLowercase(4)
                  .minOfUppercase(5)
                  .minOfNumeric(6)
                  .noWhiteSpaces()
                  .message({
                        'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
                        'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                        'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                        'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                        'password.noWhiteSpaces': '{#label} should not contain white spaces',
                  })
                  .required(),
            phoneNo: joi
                  .number()
                  .integer()
                  .min(100000000)
                  .max(9999999999)
                  .message("Invalid mobile number")
                  .required(),
            city: joi
                  .string()
                  .required(),
      }).unknown(true),


      userLogIn: joi.object({
            userEmail: joi.string().email().required(),
            userPassword: joi.string().required(),
      }).unknown(true),
}

module.exports = Schema
