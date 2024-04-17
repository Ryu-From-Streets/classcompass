const express = require("express");
require("dotenv").config();

const { connectMongoDB } = require("./connection");
const { spawn } = require('child_process');

// Use your python interpreter here - python or python3 
// and comment out the other one
function runScrapper() {
    const pythonProcess = spawn('python', ['./webScapper.py']);
    // const pythonProcess = spawn('python3', ['./webScapper.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log('Done Scrapping');
      });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });
}

const student_router = require("./routes/student");
const course_router = require("./routes/course");

const app = express();
const PORT = 1337;

const url = process.env.MONGODB_URL;

connectMongoDB(url)
    .then(() => console.log("Connected to MongoDB using Mongoose"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../frontend/build"));
// app.get("*", (req, res) =>
//     res.sendFile(__dirname + "/../frontend/build/index.html")
// );

app.use("/students", student_router);
app.use("/courses", course_router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

runScrapper()