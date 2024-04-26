const express = require("express");
require("dotenv").config();

// Get the required functions from other modules
const { connectMongoDB } = require("./connection");
const { authenticate } = require("./middleware/auth");
const { exit } = require("process");
const advisorsList = require("./Mock_Data/advisors.json");

// const { spawn } = require("child_process");
// // const { handleCreateCourse } = require("./controllers/course");
// // const Course = require("./models/course");

// /**
//  * Run the Python web scrapper script
//  * @returns None
//  */
// function runScrapper() {
//     // Attempt to use 'python' first
//     let pythonProcess = spawn("python", ["./webScrapper.py"]);

//     pythonProcess.on("error", (err) => {
//         if (err.code === "ENOENT") {
//             console.log("'python' not found, trying 'python3' instead...");

//             // If 'python' is not found - try 'python3'
//             pythonProcess = spawn("python3", ["./webScrapper.py"]);

//             setupProcessHandlers(pythonProcess);

//             pythonProcess.on("error", (err) => {
//                 if (err.code === "ENOENT") {
//                     console.error("Neither 'python' nor 'python3' could be found - \nPlease install Python first.");
//                     exit();
//                 }
//             });
//         }
//     });

//     setupProcessHandlers(pythonProcess);
// }

// /**
//  * Setup the event handlers for the Python process
//  * @param {ChildProcess} pythonProcess - The Python process
//  * @returns None
//  */
// function setupProcessHandlers(pythonProcess) {
//     pythonProcess.stdout.on("data", (data) => {
//         console.log("Done Scrapping");
//     });

//     pythonProcess.stderr.on("data", (data) => {
//         console.error(`Python script error: ${data}`);
//     });
// }

// Setup the routers
const student_router = require("./routes/student");
const course_router = require("./routes/course");
const advisor_router = require("./routes/advisor");

const app = express();
const PORT = 8080;

// Connect to MongoDB
const url = process.env.MONGODB_URL;
connectMongoDB(url)
    .then(() => console.log("Connected to MongoDB using Mongoose"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes for the API
app.get("/getAdvisorsList", (req, res) => {
    return res.json(advisorsList);
});
app.use("/students", student_router);
app.use("/courses", course_router);
app.use("/advisors", advisor_router);


// Serve the frontend build
app.use(express.static("../frontend/build"));
app.get("*", (req, res) =>
    res.sendFile(__dirname + "/../frontend/build/index.html")
);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// runScrapper();

// const courseData = require('./course.json');
// const courses = courseData.courses;
// courses.forEach(async course => {
//     const { code, name, credits, instructors, description, prerequisites } = course;
//     const newCourse = await Course.create({
//         code,
//         name,
//         credits,
//         instructors,
//         description,
//         prerequisites});
// });
// console.log(courses.length);
