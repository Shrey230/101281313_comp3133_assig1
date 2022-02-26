const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            var passwordRegex = /^[A-Za-z0-9#$&_]+$/
            return passwordRegex.test(value);
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    type: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true,
        trim: true,
        lowercase: true
    },
})

const User = mongoose.model("User", UserSchema);
module.exports = User;