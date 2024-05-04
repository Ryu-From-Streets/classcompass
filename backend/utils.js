const mongoose = require("mongoose");
const { spawn } = require("child_process");
const courseData = require("./parser/course.json");
const transcriptData = require("./parser/transcript.json");
const Course = require("./models/course");

/**
 * This function connects to the MongoDB database using the provided URL.
 * @param {*} url The MongoDB URL
 * @returns The connection to the MongoDB database
 */
async function connectMongoDB(url) {
    return mongoose.connect(url);
}

/**
 * Runs the Python web scrapper script
 * @returns None
 */
function runScrapper() {
    // Attempt to use 'python' first
    let pythonProcess = spawn("python", ["./parser/webScrapper.py"]);

    pythonProcess.on("error", (err) => {
        if (err.code === "ENOENT") {
            console.log("'python' not found, trying 'python3' instead...");

            // If 'python' is not found - try 'python3'
            pythonProcess = spawn("python3", ["./parser/webScrapper.py"]);

            setupProcessHandlers(pythonProcess);

            pythonProcess.on("error", (err) => {
                if (err.code === "ENOENT") {
                    console.error(
                        "Neither 'python' nor 'python3' could be found - \nPlease install Python first."
                    );
                    exit();
                }
            });
        }
    });

    setupProcessHandlers(pythonProcess);
}

/**
 * Sets up the event handlers for the Python process
 * @param {ChildProcess} pythonProcess - The Python process
 * @returns None
 */
function setupProcessHandlers(pythonProcess) {
    pythonProcess.stdout.on("data", (data) => {
        console.log("Done Scrapping");
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python script error: ${data}`);
    });
}

/**
 * Processes the course data and inserts it into the MongoDB database
 * @returns None
 */
async function processCourses() {
    const courses = courseData.courses;
    for (const course of courses) {
        const { code, name, credits, instructors, description, prerequisites } =
            course;
        const newCourse = await Course.create({
            code,
            name,
            credits,
            instructors,
            description,
            prerequisites,
        });
    }
    console.log(`${courses.length} new courses processed`);

    const totalCount = await Course.countDocuments({});
    console.log("Total courses in database: ", totalCount);
}

async function processTranscript() {
    const courses = transcriptData.courses;
    for (const course of courses) {
        
    }
}

module.exports = { connectMongoDB, runScrapper, processCourses };
