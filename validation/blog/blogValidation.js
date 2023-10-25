
const { join } = require("path")
const blog = require('./blogSchema')
const keys = require("joi/lib/types/keys")
const { default: common } = require("joi/lib/common")

module.exports = {
    addBlogValidation: async (req, res, next) => {
        const value = await blog.addBlog.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
