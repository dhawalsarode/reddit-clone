const express = require("express");
const cors = require("cors");

const prisma = require("./config/prisma");

const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API running successfully",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/communities", communityRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/comments", commentRoutes);

module.exports = app;