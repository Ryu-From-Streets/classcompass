const express = require("express");

const {
    handleCreateStudent,
    handleUpdateStudentById,
    handleGetStudentById,
    handleDeleteStudentById,
    handleGetAllStudents,
} = require("../controllers/student");

const router = express.Router();

router.route("/").get(handleGetAllStudents).post(handleCreateStudent);

router
    .route("/:id")
    .get(handleGetStudentById)
    .put(handleUpdateStudentById)
    .delete(handleDeleteStudentById);

module.exports = router;
