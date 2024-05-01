const mongoose = require("mongoose");

/**
 * Schema for the course collection
 * @type {mongoose.Schema}
 * @property {String} code - The course code
 * @property {String} name - The course name
 * @property {String} description - The course description
 * @property {Array[Schema.Types.ObjectId]} instructors - The list of ObjectId references to instructors
 * @property {Number} credits - The number of credits the course is worth
 * @property {Array[String]} prerequisites - The list of prerequisite course codes
 * @property {Number} rating - Accumulated rating score
 * @property {Number} totalRatings - Total number of ratings received
 */
const courseSchema = new mongoose.Schema(
    {
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
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
