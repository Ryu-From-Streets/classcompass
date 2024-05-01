const express = require("express");

const {
    handleCreateRating,
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

module.exports = router;
