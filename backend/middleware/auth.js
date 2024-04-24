const jwt = require("jsonwebtoken");
require('dotenv').config()

/**
 * This function verifies the token of the user 
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 * @returns The response object with the message if the token is invalid 
 * @returns The next middleware function if the token is valid
 */
function verifyUserToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
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
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function isUser(req, res, next) {
    if (req.user.role !== "user") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
}

async function isAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
}