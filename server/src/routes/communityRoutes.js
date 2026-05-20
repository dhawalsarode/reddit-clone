const express = require("express");

const {
  createCommunity,
  getAllCommunities,
  getSingleCommunity,
} = require("../controllers/communityController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createCommunity
);

router.get("/", getAllCommunities);

router.get("/:name", getSingleCommunity);

module.exports = router;