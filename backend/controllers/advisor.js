const Advisor = require("../models/advisor");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth");
const mongoose = require("mongoose");

/**
 * This function handles the creation of a new advisor
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns The response object with the status of the advisor creation
 */
async function handleCreateAdvisor(req, res) {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    try {
        // Check if the advisor already exists
        const existingAdvisor = await Advisor.findOne({ email });
        if (existingAdvisor) {
            return res
                .status(409)
                .json({ message: "User already exists with this email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const advisor = await Advisor.create({
            first_name: first_name,
            last_name: last_name || "",
            email: email,
            password: hashedPassword,
        });

        const token = await generateToken(advisor);

        return res.status(201).json({
            message: "Advisor created successfully",
            id: advisor._id,
            token,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
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

        const token = await generateToken(user);

        return res
            .status(200)
            .json({ message: "Sign-in successful", user, token });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

/**
 * Handles the request to update an advisor by ID
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns A JSON response with the updated advisor information
 */
async function handleUpdateAdvisorById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No such advisor" });
    }

    const advisor = await Advisor.findOneAndUpdate(
        id,
        {
            ...req.body,
        },
        { new: true }
    );

    if (!advisor) {
        return res.status(404).json({ message: "No such advisor" });
    }

    res.status(200).json(advisor);
}

async function handleChangePassword(req, res) {
  const { email, newPassword } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

/**
 * Handles the request to get an advisor by ID
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns A JSON response with the advisor information
 */
async function handleGetAdvisorById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No such advisor" });
    }

    const advisor = await Advisor.findById(id);

    if (!advisor) {
        return res.status(404).json({ message: "No such advisor" });
    }

    res.status(200).json(advisor);
}

/**
 * Handles the request to delete a advisor by ID
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns A JSON response with the status of the deletion
 */
async function handleDeleteAdvisorById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No such advisor" });
    }

    const advisor = await Advisor.findByIdAndDelete(id);

    if (!advisor) {
        return res.status(404).json({ message: "No such advisor" });
    }

    res.status(200).json(advisor);
}

/**
 * This function handles the retrieval of all advisors
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns The response object with the list of advisors
 */
async function handleGetAllAdvisors(req, res) {
    try {
        const advisors = await Advisor.find({});
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
    handleUpdateAdvisorById,
    handleGetAdvisorById,
    handleDeleteAdvisorById,
    handleChangePassword,
};
