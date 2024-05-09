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
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    major: {
      type: [String],
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      default: 0,
    },
    courses_taken: {
      type: [String],
      default: [],
    },
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advisor",
    },
    last_viewed_courses: {
      type: [String],
      default: [],
      length: 10,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "advisor"],
      default: "student",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
