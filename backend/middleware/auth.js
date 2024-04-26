const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * This function generates a token for the user
 * @param {*} user The user of the platform
 * @returns The token of the user
 */
async function generateToken(user) {
    const payload = {
        userID: user._id,
        role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
}

/**
 * This function verifies the token of the user
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 * @returns The response object with the message if the token is invalid
 * @returns The next middleware function if the token is valid
 */
function verifyToken(req, res, next) {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied, no token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}

/**
 * This function verifies the token of the user and checks if the user is an admin
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 * @returns The response object with the message if the user is not an user
 */
async function isUser(req, res, next) {
    if (req.user.role !== "student") {
        return res
            .status(403)
            .json({ message: "Access denied, not a student user." });
    }
    next();
}

/**
 * The function verifies the token of the user and checks if the user is an admin
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 * @returns The response object with the message if the user is not an admin
 */
async function isAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied, not a admin." });
    }
    next();
}

module.exports = {
    generateToken,
    verifyToken,
    isUser,
    isAdmin,
};
