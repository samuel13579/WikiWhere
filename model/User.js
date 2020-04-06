require('dotenv').config()
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema( {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    vtoken: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    }

});

module.exports = mongoose.model("user", UserSchema);
