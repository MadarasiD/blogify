const mongoose = require('mongoose');

//schema

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post",
    },
},    {
        timestamps: true,
    }
);

// séma modellre fordítása

const Comment = mongoose.model("Post", commentSchema);

module.exports = Comment;