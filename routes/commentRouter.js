
const express = require('express')
const router = express.Router()
const comment = require('../controllers/commentController')

router.post("/add_comment/:blogId/:userId",comment.addComment)

module.exports = router
