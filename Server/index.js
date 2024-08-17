const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importing CORS

const loadDataRoute = require("./routes/loadData");
const restaurantsRoute = require("./routes/restaurants");

const app = express();
const PORT = process.env.PORT || 9000;

// Enable CORS for all routes
app.use(cors());

// Express body parser (for JSON and URL-encoded data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api", restaurantsRoute);
app.use("/load-data", loadDataRoute);

const mongoUrl = process.env.DB;

// MongoDB connection
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
