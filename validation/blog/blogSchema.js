
const joi = require("joi")

const Schema = {
    addBlog: joi.object({
        blogTitle: joi
            .string()
            .max(20)
            .message({
                'string.max': '{#label} length must be less or equal to {#limit} characters long.'
            })
            .required(),
        blogDescription: joi
            .string()
            .max(150)
            .message({
                'string.max': '{#label} length must be less or equal to {#limit} characters long.'
            })
            .required(),
    }).unknown(true),
}

module.exports = Schema
