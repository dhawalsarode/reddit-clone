const express = require("express");

const {
  votePost,
} = require("../controllers/voteController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  votePost
);

module.exports = router;