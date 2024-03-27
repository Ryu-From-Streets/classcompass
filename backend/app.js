const express = require("express");
const courses = require("./MOCK_DATA.json");
const mongoose = require("./database");

const app = express();
const PORT = 8000;

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    courses: {
        type: [String],
        required: true,
    },
});

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prerequisites: {
        type: [String],
    },
});

// Routes
app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.route("/api/courses/:id")
    .get("/api/courses/:id", (req, res) => {
        const id = req.params.id;
        const course = courses.find((course) => course.id === parseInt(id));
        if (!course) {
            return res
                .status(404)
                .send("The course with the given ID was not found.");
        }
        res.send(course);
    })
    .patch("/api/courses/:id", (req, res) => {})
    .delete("/api/courses/:id", (req, res) => {});

app.route("/api/courses").post((req, res) => {});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
