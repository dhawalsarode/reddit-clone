const express = require("express");
const cors = require("cors");

const prisma = require("./config/prisma");

const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");

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

module.exports = app;