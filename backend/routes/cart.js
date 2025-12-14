import express from "express";
import { addToCart, getCart, checkout } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.post("/checkout", authMiddleware, checkout);

export default router;
