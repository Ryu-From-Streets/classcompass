const mongoose = require("mongoose");

async function connectMongoDB(url) {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = { connectMongoDB };
