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
        totalRatings: {
            type: Number,
            default: 0,
        },
        totalRatingValue: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Updates the total rating value and count, then recalculates the average rating.
 * @param {number} diff - The difference to add to the total rating value. This could be positive or negative.
 * @param {number} increment - The number to add to the total ratings count. Typically 1 or -1.
 */
courseSchema.methods.updateRating = function (diff, increment) {
    this.totalRatingValue += diff;
    this.totalRatings += increment;

    if (this.totalRatings > 0) {
        this.averageRating =
            Math.round((this.totalRatingValue / this.totalRatings) * 100) / 100;
    } else {
        this.averageRating = 0;
    }
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
