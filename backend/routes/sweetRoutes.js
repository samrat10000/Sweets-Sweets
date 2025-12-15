import express from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweetController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, upload.single("image"), addSweet);
router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

export default router;
