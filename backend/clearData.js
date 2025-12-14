
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import Sweet from "./models/Sweet.js";
import connectMongo from "./config/db.js";

configDotenv();

const clearDB = async () => {
    try {
        await connectMongo();
        console.log("Connected to DB...");

        await Sweet.deleteMany({});
        console.log("✅ All sweets data deleted successfully.");

        process.exit();
    } catch (error) {
        console.error("Deletion failed:", error);
        process.exit(1);
    }
};

clearDB();
