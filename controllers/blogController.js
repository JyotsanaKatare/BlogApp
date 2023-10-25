
const blogModelSchema = require("../models/blogModelSchema");
const userModelSchema = require("../models/userModelSchema");
const commentModelSchema = require("../models/commentModelSchema");

const addBlog = async (req, res) => {
    const userId = req.params.userId;
    try {
        const newBlog = new blogModelSchema(req.body)
        const filepath = `/uploads/${req.file.filename}`
        newBlog.blogPic = filepath;
        try {
            const blog = await newBlog.save();
            res.status(201).json({
                success: "success",
                message: "Blog successfully added"
            })
        } catch (err) {
            res.status(400).json({
                success: "failure",
                message: err.message
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "Failure",
            message: err.message
        });
    }
}


const blogList = async (req, res) => {
    try {
        const blogList = await blogModelSchema.find();
        res.status(200).json({
            success: "success",
            message: "Show blog list here",
            data: blogList
        });
    } catch (err) {
        res.status(400).json({
            success: "Failure",
            message: err.message
        })
    }
}


const blogDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const blogData = await commentModelSchema.findOne({ blogId: req.params.id})
            .populate({
                path: "userId",
                select: "userName profilePic city"
            })
            .populate({
                path: "blogId"
            })
        res.status(200).json({
            success: "success",
            blogData: blogData
        })
    } catch (err) {
        res.status(400).json({
            success: "Failure",
            message: err.message
        });
    }
}


const blogLikes = async (req, res) => {
    const id = req.params.id;
    const { blogLikes } = req.body;
    try {
        const likes = await blogModelSchema.findById(req.params.id);
        if (blogLikes === 'true') {
            await likes.updateOne({ $set: { blogLikes: ++likes.blogLikes } });
            res.status(202).json({
                success: "success",
                message: "You liked a blog",
                likeBlog: likes.blogLikes
            })
        } else {
            await likes.updateOne({ $set: { blogLikes: --likes.blogLikes } });
            res.status(202).json({
                success: "failure",
                message: "You unliked a blog",
                unlikeBlog: likes.blogLikes
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        });
    }
}


const searchBlog = async (req, res) => {
    const blogTitle = req.body.blogTitle
    try {
        const query = { blogTitle: { $regex: blogTitle, $options: "i" } }
        const blogData = await blogModelSchema.find(query)
        if (blogData) {
            res.status(200).json({
                success: "success",
                message: "Show your searching blog here",
                data: blogData,
            })
        } else {
            res.status(400).json({
                success: "failure",
                message: "Blog does not exists with this title"
            });
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        });
    }
}


const userBlog = async (req, res) => {
    const _id = req.params.id
    try {
        const myBlog = await blogModelSchema.find({ userId: _id })
            .populate({
                path: "userId",
                select: "userName"
            })
        res.status(200).json({
            success: "success",
            data: myBlog
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        });
    }
}


const editBlog = async (req, res) => {
    try {
        const updateBlog = await blogModelSchema.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(201).json({
            success: "success",
            message: "Your blog edited successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        });
    }
}

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteBlog = await blogModelSchema.findByIdAndDelete(id, { $set: req.body });
        res.status(200).json({
            success: "success",
            message: "Your blog successfully deleted"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        });
    }
}


module.exports = {
    addBlog,
    blogList,
    blogDetails,
    blogLikes,
    searchBlog,
    userBlog,
    editBlog,
    deleteBlog
}
