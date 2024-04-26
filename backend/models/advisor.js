const mongoose = require("mongoose");

// Define the schema for the advisor collection
/**
 * Schema for the advisor collection
 * @type {mongoose.Schema}
 * @property {String} first_name - The first name of the advisor
 * @property {String} last_name - The last name of the advisor
 * @property {String} email - The email of the advisor
 * @property {String} password - The password of the advisor
 * @property {Array[string]} current_students - The email list of students the advisor is currently advising
 * @property {Date} createdAt - The timestamp of the creation of the advisor
 * @property {Date} updatedAt - The timestamp of the last update of the advisor
 */
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
    },
    { timestamps: true }
);

const Advisor = mongoose.model("Advisor", advisorSchema);

module.exports = Advisor;
