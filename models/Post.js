const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    username: String,
    likes: Number,
    commentsCount: Number,
    comments: Array,
    title: String,
    content: String,
    category: String,
    college: String,
    department: String,
    passoutYear: Number
})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post;