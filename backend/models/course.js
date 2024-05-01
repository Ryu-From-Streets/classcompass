const mongoose = require("mongoose");
const Student = require("./student");

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
        ratings: [
            {
                student: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                },
                value: Number,
            },
        ],
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Adds a rating to the course
 * @param {Number} rating The rating to be added
 * @returns {Promise<Document>} The course object with the updated rating
 */
courseSchema.methods.addRating = function (studentID, rating) {
    const existingRating = this.rating.find((r) => r.student.equals(studentID));
    const student = Student.findById(studentID);

    if (existingRating) {
        // Update the existing rating
        existingRating.value = rating;
        student.ratings.find((r) => r.course.equals(this._id)).value = rating;
    } else {
        // Add a new rating
        this.rating.push({ student: studentID, value: rating });
        student.ratings.push({ course: this._id, value: rating });
    }

    this.averageRating =
        this.rating.reduce((acc, r) => acc + r.value, 0) / this.rating.length;
    this.averageRating = Math.round(this.averageRating * 100) / 100;

    return this.save();
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
