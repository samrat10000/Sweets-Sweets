import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import User from "./models/User.js";
import connectMongo from "./config/db.js";
import bcrypt from "bcryptjs";

configDotenv();

const seedUsers = async () => {
    try {
        await connectMongo();
        console.log("Connected to DB...");

        // Users to add
        const users = [
            {
                name: "Sam",
                email: "sam@example.com", 
                passwordRaw: "12345",
                role: "user"
            },
            {
                name: "Sam Admin",
                email: "samadmin@example.com",
                passwordRaw: "12345",
                role: "admin"
            },
            {
                name: "Trex",
                email: "trex@gmail.com",
                passwordRaw: "pass12345",
                role: "admin"
            }
        ];

        for (const u of users) {
             // Check if exists
             const exists = await User.findOne({  $or: [{ email: u.email }, { name: u.name }] });
             if (exists) {
                 console.log(`User ${u.name} already exists. Updating...`);
                 
                 // Hash password
                 const hashedPassword = await bcrypt.hash(u.passwordRaw, 10);
                 exists.password = hashedPassword;
                 exists.role = u.role;
                 await exists.save();
                 console.log(`Updated ${u.name}`);
             } else {
                 const hashedPassword = await bcrypt.hash(u.passwordRaw, 10);
                 await User.create({
                     name: u.name,
                     email: u.email,
                     password: hashedPassword,
                     role: u.role
                 });
                 console.log(`Created ${u.name}`);
             }
        }

        console.log("Seeding users completed! 👤");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedUsers();
