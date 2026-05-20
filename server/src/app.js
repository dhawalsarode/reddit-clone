const express = require("express");
const cors = require("cors");

const prisma = require("./config/prisma");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API running successfully",
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;