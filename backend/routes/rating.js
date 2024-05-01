const express = require("express");
const Rating = require("../models/rating");

const {
    handleCreateRating,
    handleGetCourseRating,
    handleGetStudentRating,
    handleUpdateRating,
    handleDeleteRating,
    handleGetAllRatings,
} = require("../controllers/rating");

const router = express.Router();

router
    .route("/ratings")
    .get(handleGetAllRatings)
    .put(handleUpdateRating)
    .post(handleCreateRating)
    .delete(handleDeleteRating);

router.route("/ratings/:courseID").get(handleGetCourseRating);
router.route("/ratings/:studentID").get(handleGetStudentRating);
