const mongoose = require("mongoose");

/**
 * This function connects to the MongoDB database using the provided URL.
 * @param {*} url The MongoDB URL
 * @returns The connection to the MongoDB database
 */
async function connectMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = { connectMongoDB };
