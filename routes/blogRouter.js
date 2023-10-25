
const express = require('express')
const router = express.Router()
const blog = require("../controllers/blogController")
const { upload } = require('../middlewares/imageStorage')
const validation = require('../validation/blog/blogValidation')

router.post("/add_blog/:id", upload.single("blogPic"), validation.addBlogValidation, blog.addBlog)
router.get("/blog_list", blog.blogList)
router.get("/blog_detail/:id", blog.blogDetails)
router.patch("/blog_likes/:id", blog.blogLikes)
router.get("/blog_search", blog.searchBlog)
router.post("/user_blog/:_id", blog.userBlog)
router.patch("/blog_update/:id", blog.editBlog)
router.delete("/blog_delete/:id", blog.deleteBlog)

module.exports = router
