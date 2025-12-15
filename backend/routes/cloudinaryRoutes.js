import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/signature", (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({ timestamp, signature });
  } catch (error) {
    // console.error("Error generating signature:", error);
    res.status(500).json({ message: "Server error while generating signature" });
  }
});

export default router;
