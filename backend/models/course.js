const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    professors: {
        type: Array,
        required: true,
        default: [],
    },
    prerequisites: {
        type: Array,
        required: true,
        default: [],
    },
})