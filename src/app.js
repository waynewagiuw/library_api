require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");
const borrowingRoutes = require("./routes/borrowingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", memberRoutes);
app.use("/api", borrowingRoutes);

app.get("/", (req, res) => {
  res.send("Library API is running");
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
