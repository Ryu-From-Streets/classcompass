const express = require("express");
const { authenticate } = require("../middleware/auth");

const {
    handleCreateAdvisor,
    handleSignIn,
    handleGetAllAdvisors,
    handleGetAdvisorCurrentStudents,
    handleChangePassword,
    handleGetAdvisorById,
} = require("../controllers/advisor");

const router = express.Router();

router.route("/signup").post(handleCreateAdvisor);
router.route("/signin").post(handleSignIn);
router.route("/forgot").post(handleChangePassword);

router.use(authenticate);

router.route("/:id/students").get(handleGetAdvisorCurrentStudents);
router.route("/").get(handleGetAllAdvisors);
router.route("/:id").get(handleGetAdvisorById);

module.exports = router;
