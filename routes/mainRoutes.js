
const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const blogRouter = require('./blogRouter')
const commentRouter = require('./commentRouter')

router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/comment",commentRouter);

module.exports = router;
