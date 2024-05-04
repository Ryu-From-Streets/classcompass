const mongoose = require("mongoose");
const { exec, spawn } = require("child_process");
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
 * Dynamically select the Python executable based on system configuration.
 * @returns {Promise<string>} Resolves with the executable name or rejects if no suitable version is found.
 */
function findPythonExecutable() {
    return new Promise((resolve, reject) => {
        exec("python3 --version", (error, stdout, stderr) => {
            if (!error && stdout.includes("Python 3")) {
                resolve("python3");
            } else {
                exec("python --version", (error, stdout, stderr) => {
                    if (!error && stdout.includes("Python 3")) {
                        resolve("python");
                    } else {
                        reject("No valid Python 3 executable found.");
                    }
                });
            }
        });
    });
}

/**
 * Runs the Python web scraper script.
 * @param {string} file_path The path to the Python script file along with necessary arguments.
 * @returns {Promise<string>} Resolves with the output from the Python script or rejects with an error.
 */
function runScrapper(file_path) {
    return new Promise((resolve, reject) => {
        findPythonExecutable()
            .then((pythonExecutable) => {
                const pythonProcess = spawn(pythonExecutable, [file_path]);

                let dataBuffer = "";
                pythonProcess.stdout.on(
                    "data",
                    (data) => (dataBuffer += data.toString())
                );
                pythonProcess.stderr.on("data", (data) =>
                    reject(new Error(`Python script error: ${data}`))
                );

                pythonProcess.on("error", (error) =>
                    reject(
                        new Error(`Failed to start Python process: ${error}`)
                    )
                );
                pythonProcess.on("close", (code) => {
                    if (code === 0) resolve(dataBuffer);
                    else
                        reject(
                            new Error(`Python script exited with code ${code}`)
                        );
                });
            })
            .catch((error) => reject(new Error(error)));
    });
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
