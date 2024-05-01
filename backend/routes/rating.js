const express = require("express");

const {
    handleCreateRating,
    handleGetRating,
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

router.route("/:id").get(handleGetRating);

module.exports = router;
