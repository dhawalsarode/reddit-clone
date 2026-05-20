const express = require("express");

const {
  createPost,
  getAllPosts,
  getSinglePost,
  getPostsByCommunity,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createPost
);

router.get("/", getAllPosts);

router.get(
  "/community/:name",
  getPostsByCommunity
);

router.get("/:id", getSinglePost);

module.exports = router;