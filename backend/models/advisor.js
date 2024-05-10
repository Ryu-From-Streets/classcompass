const mongoose = require("mongoose");

const advisorSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    current_students: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "advisor"],
      default: "advisor",
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Advisor = mongoose.model("Advisor", advisorSchema);

module.exports = Advisor;
