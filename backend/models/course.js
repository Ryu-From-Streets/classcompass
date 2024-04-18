const mongoose = require("mongoose");

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
    instructors: {
        type: Array,
        required: true,
        default: [],
    },
    credits: {
        type: Number,
        required: true,
        default: 3,
    },
    prerequisites: {
        type: Array,
        required: true,
        default: [],
    },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;