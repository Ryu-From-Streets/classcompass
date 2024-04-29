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
    prerequisites: [{
        type: String,
        trim: true,
    }],
    rating: {
        type: Number,
        default: 0,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Rating must be non-negative',
        }
    },
    totalRatings: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

/**
 * Virtual property to calculate the average rating of the course
 */
courseSchema.virtual("averageRating").get(function () {
    return this.totalRatings > 0 ? this.rating / this.totalRatings : 0;
});

/**
 * Adds a rating to the course
 * @param {Number} rating The rating to be added
 * @returns {Promise<Document>} The course object with the updated rating
 */
courseSchema.methods.addRating = function (rating) {
    this.rating += rating;
    this.totalRatings++;
    return this.save();
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
