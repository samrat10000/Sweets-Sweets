import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

console.log("Testing Cloudinary Connection...");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.ping()
  .then((res) => {
    console.log("✅ SUCCESS! Connected to Cloudinary.");
    console.log("Response:", res);
  })
  .catch((err) => {
    console.error("❌ FAILED! Could not connect.");
    console.error("Error Message:", err.message);
    console.error("Full Error:", err);
  });
