const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    value: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;