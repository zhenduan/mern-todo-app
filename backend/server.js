const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

//Execute express
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const connectionString = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to the database…"))
  .catch((err) => console.error("Connection error:", err));

// Use todo routes
app.use("/api", todoRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
