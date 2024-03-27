import express from "express";
import courses, { find } from "./MOCK_DATA.json";
import {getAll, insertCourse, initialize} from "./database";

const app = express();
const PORT = 8000;

// Routes
app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
        const id = req.params.id;
        const course = find((course) => course.id === parseInt(id));
        if (!course) {
            return res
                .status(404)
                .send("The course with the given ID was not found.");
        }
        res.send(course);
    })

// app.route("/api/courses").post((req, res) => {});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

initialize();

