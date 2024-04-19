const mongoose = require("mongoose");

/**
 * Schema for the student collection
 * @type {mongoose.Schema}
 * @property {String} first_name - The first name of the student
 * @property {String} last_name - The last name of the student
 * @property {String} email - The email of the student
 * @property {Array[string]} major - The major of the student
 * @property {Number} credits - The number of credits the student has completed
 * @property {Array[string]} courses_taken - The list of courses the student has taken
 * @property {String} advisor - The email of the advisor assigned to the student
 * @property {String} password - The password of the student
 * @property {Date} createdAt - The timestamp of the creation of the student
 * @property {Date} updatedAt - The timestamp of the last update of the student
 */
const studentSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: false,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        major: {
            type: Array,
            required: true,
            trim: true,
        },
        credits: {
            type: Number,
            required: true,
            default: 0,
        },
        courses_taken: {
            type: Array,
            required: false,
            default: [],
        },
        advisor: {
            type: String,
            required: false,
            default: "",
        },
        password: {
            type: String,
            required: false,
            trim: true,
        },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
