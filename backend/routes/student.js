const express = require("express");

const {
    handleCreateStudent,
    handleUpdateStudentById,
    handleGetStudentById,
    handleDeleteStudentById,
    handleGetAllStudents,
    handleSignIn,

} = require("../controllers/student");

const router = express.Router();

router.route("/signup").post(handleCreateStudent);
router.route("/signin").post(handleSignIn);

router
    .route("/:id")
    .get(handleGetStudentById)
    .put(handleUpdateStudentById)
    .delete(handleDeleteStudentById);

router.route("/").get(handleGetAllStudents);

module.exports = router;
