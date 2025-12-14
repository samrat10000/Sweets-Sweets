import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;

console.log("----- CLOUDINARY DEBUG -----");
console.log("Cloud Name:", cloudName);
console.log("API Key:", apiKey ? apiKey.slice(0, 4) + "****" + apiKey.slice(-4) : "MISSING");
console.log("----------------------------");

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
