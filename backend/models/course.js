const mongoose = require("mongoose");

/**
 * Schema for the course collection
 * @type {mongoose.Schema}
 * @property {String} code - The course code
 * @property {String} name - The course name
 * @property {String} description - The course description
 * @property {Array[string]} instructors - The list of instructors for the course
 * @property {Number} credits - The number of credits the course is worth
 * @property {Array[string]} prerequisites - The list of prerequisites for the course
 * @property {Date} createdAt - The timestamp of the creation of the course
 * @property {Date} updatedAt - The timestamp of the last update of the course
 */
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
