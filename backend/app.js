const express = require("express");
const courses = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
