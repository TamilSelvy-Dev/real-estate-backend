
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// console.log("authRoutes:", authRoutes);
// console.log("userRoutes:", userRoutes);
// console.log("propertyRoutes:", propertyRoutes);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Real Estate Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/properties", propertyRoutes);

module.exports = app;