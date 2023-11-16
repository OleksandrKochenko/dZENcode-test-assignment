const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// routes will be here

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message, success: false });
});

module.exports = app;
