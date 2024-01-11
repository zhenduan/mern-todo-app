const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

//Execute express
const app = express();

// const corsOptions = {
//   origin: "https://mern-todo-app-frontend-8zuv.onrender.com/", // frontend URI (ReactJS)
// };

//Middlewares
app.use(express.json());
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.json());

// Parse URL-encoded bodies (e.g., form data)
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString = process.env.MONGO_URI;
const port = 4001;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to the database…"))
  .catch((err) => console.error("Connection error:", err));

// Use todo routes
app.use("/api", todoRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
