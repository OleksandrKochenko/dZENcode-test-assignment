const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-docs.json");

const authRouter = require("./routes/auth-routes");
const apiRouter = require("./routes/api-routes");

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", swaggerUi.serve);
app.get(
  "/",
  swaggerUi.setup(swaggerDocument, {
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  })
);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  if (err instanceof multer.MulterError) {
    res.status(422).json({ message });
  } else {
    res.status(status).json({ message });
  }
});

module.exports = app;
