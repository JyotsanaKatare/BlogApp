
const mongoose = require('mongoose')
const userModelSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    isactive: {
        type: Boolean,
        required: true,
        default: true,
    },
})

userModelSchema.set('timestamps', true)
module.exports = mongoose.model('user', userModelSchema)
