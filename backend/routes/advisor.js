const express = require("express");

const {
    handleCreateAdvisor,
    handleSignIn,
    handleGetAllAdvisors,
    handleGetAdvisorCurrentStudents,
    handleChangePassword,
} = require("../controllers/advisor");

const router = express.Router();

router.route("/current-students/:email").get(handleGetAdvisorCurrentStudents);
router.route("/signup").post(handleCreateAdvisor);
router.route("/signin").post(handleSignIn);
router.route("/forgot").post(handleChangePassword)
router.route("/").get(handleGetAllAdvisors);

module.exports = router;