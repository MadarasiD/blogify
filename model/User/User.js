const mongoose = require('mongoose');

//schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now(),
    },
    isVerified: {
        type: String,
        default: false,
    },
    accountLevel: {
        type: String,
        enum: ["bronze", "silver", "gold", "platinum"],
        default: "bronze",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverImage: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    notoficationPreferences: {
        email: { type: String, default: true },
    },
    gender: {
        type: String,
        enum: ["Férfi", "Nő", "Inkább nem adom meg"],
    },
    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    accountVerificationToken: {
        type: String,
    },
    accountVerificationExpires: {
        type: Date,
    },
},    {
        timestamps: true,
    }
);

// séma modellre fordítása

const User = mongoose.model("User", userSchema);

module.exports = User;