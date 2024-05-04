const express = require("express");
const fs = require("fs");
require("dotenv").config();

// Get the required functions from other modules
const { connectMongoDB, runScrapper, processCourses } = require("./utils");
const { authenticate } = require("./middleware/auth");
const { exit } = require("process");
const advisorsList = require("./Mock_Data/advisors.json");

// Setup the routers
const student_router = require("./routes/student");
const course_router = require("./routes/course");
const advisor_router = require("./routes/advisor");
const rating_router = require("./routes/rating");

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

// Log all requests to a file log.txt
app.use((req, res, next) => {
    fs.writeFileSync("log.txt", `${req.path} ${req.method}\n`, { flag: "a" });
    next();
});

// Routes for the API
app.get("/getAdvisorsList", (req, res) => {
    return res.json(advisorsList);
});
app.use("/students", student_router);
app.use("/courses", course_router);
app.use("/advisors", advisor_router);
app.use("/ratings", rating_router);

// Serve the frontend build
app.use(express.static("../frontend/build"));
app.get("*", (req, res) =>
    res.sendFile(__dirname + "/../frontend/build/index.html")
);

/**
 * Handles the scraping of the course catalog and processing of the courses.
 */
// const file_path = "./parser/webScrapper.py";
// runScrapper(file_path).then(() => {
//     console.log("Scraping complete, now processing courses...");
//     return processCourses();
// }).then(() => {
//     console.log("Course processing complete.");
// }).catch((err) => {
//     console.error("Error processing courses:", err);
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
