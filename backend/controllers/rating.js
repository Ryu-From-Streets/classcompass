const { mongoose } = require("mongoose");
const Rating = require("../models/rating");
const Course = require("../models/course");

async function handleCreateRating(req, res) {
    const { studentID, courseID, value, comment } = req.body;

    if (!studentID || !courseID || !value) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const existingRating = await Rating.findOne({ studentID, courseID });
        if (existingRating) {
            return res.status(400).json({ message: "Rating already exists" });
        }

        const course = await Course.findById(courseID);
        const rating = await Rating.create({
            studentID: studentID,
            courseID: courseID,
            value: value,
            comment: comment || "",
        });

        course.updateRating(value, 1);
        await course.save();

        return res.status(201).json({
            message: "Successfully created rating",
            ratingID: rating._id,
            studentID: studentID,
            courseID: courseID,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

async function handleGetRating(req, res) {
    const { id } = req.params;

    try {
        const rating = await Rating.findOne({ _id: id });

        return res.status(200).json({ message: "Success", rating });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

async function handleGetCourseRating(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing course ID" });
    }

    try {
        const rating = await Rating.find({ courseID: id });

        return res.status(200).json({ message: "Success", rating });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

async function handleGetStudentRating(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing student ID" });
    }

    try {
        const ratings = await Rating.find({ studentID: id });

        return res.status(200).json({ message: "Success", ratings });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error.", error: error.message });
    }
}

async function handleUpdateRating(req, res) {
    const { ratingID, value, comment } = req.body;

    if (!ratingID || !mongoose.Types.ObjectId.isValid(ratingID)) {
        return res.status(400).json({ message: "Invalid rating ID" });
    }

    try {
        const rating = await Rating.findById(ratingID);
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }
        const course = await Course.findById(rating.courseID);
        const diff = value - rating.value;

        rating.value = value;
        rating.comment = comment || "";

        course.updateRating(diff, 0);

        await rating.save();
        await course.save();

        return res
            .status(200)
            .json({ message: "Successfully updated rating", rating });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

async function handleDeleteRating(req, res) {
    const { ratingID } = req.body;

    if (!ratingID || !mongoose.Types.ObjectId.isValid(ratingID)) {
        return res.status(400).json({ message: "Invalid rating ID" });
    }

    try {
        const rating = await Rating.findById(ratingID);
        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        const course = await Course.findById(rating.courseID);
        if (course) {
            course.updateRating(-rating.value, -1);
            await course.save();
        }

        await Rating.findByIdAndDelete(ratingID);

        return res
            .status(200)
            .json({ message: "Successfully deleted rating", ratingID });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

async function handleGetAllRatings(req, res) {
    try {
        const ratings = await Rating.find();

        return res.status(200).json({ message: "Success", ratings });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    handleCreateRating,
    handleGetRating,
    handleGetCourseRating,
    handleGetStudentRating,
    handleUpdateRating,
    handleDeleteRating,
    handleGetAllRatings,
};
