
const blogModelSchema = require("../models/blogModelSchema")
const userModelSchema = require("../models/userModelSchema")
const commentModelSchema = require("../models/commentModelSchema")

const addComment = async(req,res) => {
    try{
        let body = {...req.body,userId:req.params.userId,blogId:req.params.blogId}
        const newComment = new commentModelSchema(body)
        await newComment.populate({
            path: "userId",
            select: "userName"
        });
        let comm = await newComment.save();
        res.status(200).json({
            success: "success",
            message: "Comment successfully added",
            addComment: comm
        });
    }catch (err){
        res.status(400).json({
            success: "failure",
            message: err.message
        });
    }
}

module.exports = {
    addComment
}
