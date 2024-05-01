const express = require("express");

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
    .route("/")
    .get(handleGetAllRatings)
    .put(handleUpdateRating)
    .post(handleCreateRating)
    .delete(handleDeleteRating);

router.route("/:courseID").get(handleGetCourseRating);
router.route("/:studentID").get(handleGetStudentRating);

module.exports = router;
