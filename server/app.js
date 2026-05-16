const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const CustomError = require("./utils/customError");
const express = require("express");
const globalErrorController = require("./controllers/globalErrorController");
const logRoutes = require("./routes/logRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/logs", logRoutes);

app.use("/", (req, res, next) => {
  next(new CustomError(`${req.originalUrl} does not exist.`, 404));
});

app.use(globalErrorController);

const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB.");
    app.listen(port, () => console.log(`Server is running at port: ${port}`));
  })
  .catch((err) => console.error(`Error: ${err}`));
