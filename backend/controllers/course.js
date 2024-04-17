const { default: mongoose } = require("mongoose");
const Course = require("../models/course");

/**
 * Handles the creation of a new course in the database if the required information is provided
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns The response object indicating the success or failure of the operation
 */
async function handleCreateCourse(req, res) {
    const { code, name, credits, instructors, description, prerequisites } = req.body;
    if (!code || !name || !credits || !instructors || !description || !prerequisites) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const result = await Course.create({
        code: code,
        name: name,
        credits: credits,
        instructors: instructors,
        description: description,
        prerequisites: prerequisites,
    });

    return res.status(201).json({ msg: "Success", id: result._id });
}

/**
 * Handles the request to update a course by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the update
 */
async function handleUpdateCourseById(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!course) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

/**
 * Handles the request to get a course by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the course information
 */
async function handleGetCourseById(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findById(id)

    if (!course) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

/**
 * Handles the request to delete a course by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the deletion
 */
async function handleDeleteCourseById(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndDelete({_id: id})

    if (!course) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
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

module.exports = {
    handleCreateCourse,
    handleUpdateCourseById,
    handleGetCourseById, 
    handleDeleteCourseById,
    handleGetAllCourses,
}
