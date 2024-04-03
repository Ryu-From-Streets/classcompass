const Student = require("../models/student");

/**
 * Handles the creation of a new student in the database if the required information is provided
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns The response object indicating the success or failure of the operation
 */
async function handleCreateStudent(req, res) {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.email ||
        !body.credits ||
        !body.courses_taken
    ) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const result = await Student.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        credits: body.credits,
        courses_taken: body.courses_taken,
        password: body.password || "",
    });

    return res.status(201).json({ msg: "Success", id: result._id });
}

/**
 * Handles the request to update a student by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the update
 */
async function handleUpdateStudentById(req, res) {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ status: "Success" });
}

/**
 * Handles the request to get a student by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the student information
 */
async function handleGetStudentById(req, res) {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    return res.json(student);
}

/**
 * Handles the request to delete a student by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the deletion
 */
async function handleDeleteStudentById(req, res) {
    await Student.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
}

/**
 * Handles the request to get all students
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with all the students
 */
async function handleGetAllStudents(req, res) {
    const all_students = await Student.find({});
    return res.json(all_students);
}

module.exports = {
    handleCreateStudent,
    handleUpdateStudentById,
    handleGetStudentById,
    handleDeleteStudentById,
    handleGetAllStudents,
};