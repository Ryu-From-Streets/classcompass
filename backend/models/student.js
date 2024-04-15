const mongoose = require("mongoose");

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
            trim: true
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
