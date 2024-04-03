const express = require("express");

const { connectMongoDB } = require("./connection");

const student_router = require("./routes/student");
const course_router = require("./routes/course");

const app = express();
const PORT = 3000;

const url =
    "mongodb+srv://ClassCompass:ClassCompass123@cluster0.v2vplda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connectMongoDB(url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../frontend/build"));
app.get("*", (req, res) => res.sendFile(__dirname + "/../frontend/build/index.html"));

app.use("/students", student_router);
app.use("/courses", course_router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
