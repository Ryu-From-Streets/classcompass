const Student = require("../models/student");
const bcrypt = require("bcrypt");
/**
 * Handles the creation of a new student in the database if the required information is provided
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns The response object indicating the success or failure of the operation
 */
async function handleCreateStudent(req, res) {
    const { first_name, last_name, email, major, credits, courses_taken, password } = req.body;
    if (!first_name || !email || !credits || !password) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Student.create({
        first_name: first_name,
        last_name: last_name || "",
        email: email,
        credits: credits,
        courses_taken: Array.isArray(courses_taken) ? courses_taken : [],
        password: hashedPassword,
    });

    return res.status(201).json({ msg: "Success", id: result._id });
}

/**
 * 
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns Handles the sign-in request for a student
 */
async function handleSignIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await Student.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        return res.status(200).json({ message: "Sign-in successful", user });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

/**
 * Handles the request to update a student by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the update
 */
async function handleUpdateStudentById(req, res) {
    // await Student.findByIdAndUpdate(req.params.id, req.body);
    // return res.json({ status: "Success" });

    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student'})
    }

    const student = await Student.findByIdAndUpdate(id, {
        ...req.body
    })

    if (!student) {
        return res.status(404).json({error: 'No such student'})
    }

    res.status(200).json(student)
}

/**
 * Handles the request to get a student by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the student information
 */
async function handleGetStudentById(req, res) {
    // const student = await Student.findById(req.params.id);
    // if (!student) return res.status(404).json({ error: "Student not found" });
    // return res.json(student);

    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student'})
    }

    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({error: 'No such student'})
    }

    res.status(200).json(student)
}

/**
 * Handles the request to delete a student by ID
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with the status of the deletion
 */
async function handleDeleteStudentById(req, res) {
    // await Student.findByIdAndDelete(req.params.id);
    // return res.json({ status: "Success" });

    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student'})
    }

    const student = await Student.findByIdAndDelete(id)

    if (!student) {
        return res.status(404).json({error: 'No such student'})
    }

    res.status(200).json(student)
}

/**
 * Handles the request to get all students
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns A JSON response with all the students
 */
async function handleGetAllStudents(req, res) {
    const all_students = await Student.find({});
    return res.status(200).json(all_students);
}

module.exports = {
    handleCreateStudent,
    handleUpdateStudentById,
    handleGetStudentById,
    handleDeleteStudentById,
    handleGetAllStudents,
    handleSignIn,
};
