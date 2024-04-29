const express = require("express");

const {
    handleCreateCourse,
    handleUpdateCourseById,
    handleGetCourseById,
    handleDeleteCourseById,
    handleGetAllCourses,
    handleGetCourseByCode,
    handleCourseRating,
} = require("../controllers/course");

const router = express.Router();

router.route("/").get(handleGetAllCourses).post(handleCreateCourse);

// Use ID to get, update, or delete a course
router
    .route("/:id")
    .get(handleGetCourseById)
    .put(handleUpdateCourseById)
    .delete(handleDeleteCourseById);

// Use code to get a course
router.route("/code/:code").get(handleGetCourseByCode);

router.route("/rate/:id").post(handleCourseRating);

module.exports = router;
