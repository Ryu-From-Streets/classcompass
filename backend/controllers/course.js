// const { default: mongoose } = require("mongoose");
const Course = require("../models/course");
const mongoose = require("mongoose");

/**
 * Handles the creation of a new course in the database
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns The response object indicating the success or failure of the operation
 */
async function handleCreateCourse(req, res) {
    const { code, name, credits, instructors, description, prerequisites } =
        req.body;

    if (
        !code ||
        !name ||
        !credits ||
        !instructors ||
        !description ||
        !prerequisites
    ) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    try {
        // Check if the course already exists
        const existingCourse = await Course.findOne({ code });
        if (existingCourse) {
            return res
                .status(409)
                .json({ message: "Course already exists with this code." });
        }

        const course = await Course.create({
            code: code,
            name: name,
            credits: credits,
            instructors: instructors,
            description: description,
            prerequisites: prerequisites,
        });

        return res.status(201).json({ message: "Success", id: course._id });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

/**
 * Handles the request to get a course by code
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the course information
 */
async function handleGetCourseByCode(req, res) {
    const { code } = req.params;
    const course = await Course.findOne({ code: code });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
}

/**
 * Handles the request to update a course by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the update
 */
async function handleUpdateCourseById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such course" });
    }

    const course = await Course.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        },
        { new: true }
    );

    if (!course) {
        return res.status(404).json({ error: "No such course" });
    }

    res.status(200).json(course);
}

/**
 * Handles the request to get a course by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the course information
 */
async function handleGetCourseById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such course" });
    }

    const course = await Course.findById(id);

    if (!course) {
        return res.status(404).json({ error: "No such course" });
    }

    res.status(200).json(course);
}

/**
 * Handles the request to delete a course by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the deletion
 */
async function handleDeleteCourseById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such course" });
    }

    const course = await Course.findOneAndDelete({ _id: id });

    if (!course) {
        return res.status(404).json({ error: "No such course" });
    }

    res.status(200).json(course);
}

/**
 * Handles the request to get all courses
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with all the courses
 */
async function handleGetAllCourses(req, res) {
    const courses = await Course.find();
    res.status(200).json(courses);
}

/**
 * Handles the rating of a course by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the rating
 */
async function handleCourseRating(req, res) {
    const { id } = req.params;
    let { rating } = req.body;
    rating = parseFloat(rating);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such course" });
    }
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
        // Assuming ratings are 0-5
        return res
            .status(400)
            .json({ error: "Invalid rating. Must be between 0 and 5." });
    }

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "No such course" });
        }
        await course.addRating(rating);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = {
    handleCreateCourse,
    handleUpdateCourseById,
    handleGetCourseById,
    handleDeleteCourseById,
    handleGetAllCourses,
    handleGetCourseByCode,
    handleCourseRating,
};
