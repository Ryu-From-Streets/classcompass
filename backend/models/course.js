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
        rating: {
            type: Number,
            default: 0,
            validate: {
                validator: function (value) {
                    return value >= 0;
                },
                message: "Rating must be non-negative",
            },
        },
        totalRatings: {
            type: Number,
            default: 0,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

/**
 * Adds a rating to the course
 * @param {Number} rating The rating to be added
 * @returns {Promise<Document>} The course object with the updated rating
 */
courseSchema.methods.addRating = function (rating) {
    this.rating += rating;
    this.totalRatings++;
    // Calculate the average rating to 2 decimal places
    this.averageRating =
        this.totalRatings > 0 ? Math.round((this.rating / this.totalRatings) * 100) / 100 : 0;
    return this.save();
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
