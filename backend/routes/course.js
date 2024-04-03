const express = require("express");

const {
    handleCreateCourse,
    handleUpdateCourseById,
    handleGetCourseById,
    handleDeleteCourseById,
    handleGetAllCourses,
} = require("../controllers/course");

const router = express.Router();

router.route("/").get(handleGetAllCourses).post(handleCreateCourse);

router
    .route("/:id")
    .get(handleGetCourseById)
    .put(handleUpdateCourseById)
    .delete(handleDeleteCourseById);

module.exports = router;
