const express = require("express");

const {
    handleCreateCourse,
    handleUpdateCourseById,
    handleGetCourseById,
    handleDeleteCourseById,
    handleGetAllCourses,
    handleGetCourseByCode,
} = require("../controllers/course");

const { handleGetCourseRating } = require("../controllers/rating");

const router = express.Router();

router.route("/").get(handleGetAllCourses).post(handleCreateCourse);

// Use ID to get, update, or delete a course
router
    .route("/:id")
    .get(handleGetCourseById)
    .put(handleUpdateCourseById)
    .delete(handleDeleteCourseById);

router.route("/:id/ratings").get(handleGetCourseRating);

// Use code to get a course
router.route("/code/:code").get(handleGetCourseByCode);

module.exports = router;
