const express = require("express");

const {
    handleCreateStudent,
    handleUpdateStudentById,
    handleGetStudentById,
    handleDeleteUserById,
    handleGetAllStudents,
} = require("../controllers/student");

const router = express.Router();

router.route("/").get(handleGetAllStudents).post(handleCreateStudent);

router
    .route("/:id")
    .get(handleGetStudentById)
    .put(handleUpdateStudentById)
    .delete(handleDeleteUserById);

module.exports = router;
