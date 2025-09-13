const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "Hlo user 🚀" });
});

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const customerRoutes = require("./routes/customerRoutes");
app.use("/customers", customerRoutes);

const purchaseRoutes = require("./routes/purchaseRoutes");
app.use("/purchases", purchaseRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/payments", paymentRoutes);

// Port (Render provides process.env.PORT automatically)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
