const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    username: String,
    likes: Number,
    commentCount: Number,
    comments: Array,
    title: String,
    content: String,
    category: String
})

const Post = mongoose.model("Post", userSchema)

module.exports = Post;