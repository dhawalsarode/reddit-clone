const express = require("express");

const {
  createComment,
  getCommentsByPost,
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createComment
);

router.get(
  "/post/:postId",
  getCommentsByPost
);

module.exports = router;