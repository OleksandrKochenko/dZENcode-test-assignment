const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const authRouter = require("./routes/auth-routes");
const apiRouter = require("./routes/api-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message, success: false });
});

module.exports = app;
