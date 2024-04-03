const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
        credits: {
            type: Number,
            required: true,
            default: 0,
        },
        courses_taken: {
            type: Array,
            required: true,
            default: [],
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", userSchema);

module.exports = Student;
