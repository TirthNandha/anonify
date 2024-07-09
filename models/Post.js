const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    username: String,
    likes: Number,
    commentsCount: Number,
    comments: [{
        username: String,
        department: String,
        passoutYear: Number,
        content: String,
        college: String
    }],
    title: String,
    content: String,
    category: String,
    college: String,
    department: String,
    passoutYear: Number,
    likedBy: [{ type: String }] 
})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post;