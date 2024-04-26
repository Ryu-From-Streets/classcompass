const Advisor = require("../models/advisor");

/**
 * This function handles the creation of a new advisor
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns The response object with the status of the advisor creation
 */
async function handleCreateAdvisor(req, res) {
    const body = req.body;
    if (!first_name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const result = await Advisor.create({
        first_name: body.first_name,
        last_name: last_name || "",
        email: body.email,
        password: body.password,
    });

    return res.status(201).json({ msg: "Success", id: result._id });
}

/**
 * This function handles the sign-in of an advisor
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns The response object with the status of the sign-in
 */
async function handleSignIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await Advisor.findOne({ email });
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
 * This function handles the retrieval of all advisors
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns The response object with the list of advisors
 */
async function handleGetAllAdvisors(req, res) {
    try {
        const advisors = await Advisor.find();
        return res.status(200).json(advisors);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

/**
 * This function handles the retrieval of all current students for an advisor
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns The response object with the list of current students for the advisor
 */
async function handleGetAdvisorCurrentStudents(req, res) {
    const { email } = req.params;

    try {
        const advisor = await Advisor.findById(email);
        if (!advisor) {
            return res.status(404).json({ message: "Advisor not found" });
        }
        return res.status(200).json(advisor.current_students);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    handleCreateAdvisor,
    handleSignIn,
    handleGetAllAdvisors,
    handleGetAdvisorCurrentStudents,
};
