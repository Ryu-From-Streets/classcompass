const express = require("express");

const { connectMongoDB } = require("./connection");

const student_router = require("./routes/student");
const course_router = require("./routes/course");

const app = express();
const PORT = 3000;

connectMongoDB(
    "mongodb+srv://ClassCompass:ClassCompass123@cluster0.v2vplda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("MongoDB connected!"));

app.use(express.urlencoded({ extended: false }));

app.use("/students", student_router);
app.use("/courses", course_router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
