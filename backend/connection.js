const mongoose = require("mongoose");

async function connectMongoDB(url) {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB using Mongoose'))
    .catch(err => console.error('Could not connect to MongoDB:', err));
}

module.exports = { connectMongoDB };
