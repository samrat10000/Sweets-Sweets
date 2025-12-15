import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cartRoutes from "./routes/cart.js";
import connectMongo from "./config/db.js";
import authRoutes from "./routes/auth.js";
import sweetRoutes from "./routes/sweetRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

configDotenv();

connectMongo();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

app.get("/", (req, res) => {
  res.send("🍬 Sweet Shop API is running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;

// Export app for testing, but only listen if this file is run directly (optional, but better to have separate index.js)
// However, per plan, we are splitting. So we just export app here.
// But wait, the plan said "Export app".
// Let's stick to the plan: Remove app.listen and export app.

export default app;
