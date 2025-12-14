
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import Sweet from "./models/Sweet.js";
import connectMongo from "./config/db.js";

configDotenv();

const sampleSweets = [
  {
    name: "Classic Rasgulla",
    category: "Bengali",
    price: 25,
    quantity: 100,
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=1000&auto=format&fit=crop",
    description: "Soft and spongy cottage cheese balls soaked in sugar syrup."
  },
  {
    name: "Kaju Katli",
    category: "North Indian",
    price: 850,
    quantity: 50,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
    description: "Diamond-shaped cashew fudge with silver leaf."
  },
  {
    name: "Gulab Jamun",
    category: "Classic",
    price: 30,
    quantity: 150,
    image: "https://images.unsplash.com/photo-1630145366288-c88f9bcd36d4?q=80&w=1000&auto=format&fit=crop",
    description: "Deep-fried milk solids soaked in rose-flavored sugar syrup."
  },
  {
    name: "Mysore Pak",
    category: "South Indian",
    price: 450,
    quantity: 60,
    image: "https://images.unsplash.com/photo-1605197143962-d298715bd566?q=80&w=1000&auto=format&fit=crop",
    description: "Rich and buttery gram flour fudge, melting in the mouth."
  },
  {
    name: "Jalebi",
    category: "Street Special",
    price: 200,
    quantity: 80,
    image: "https://images.unsplash.com/photo-1533230678229-37367ce52882?q=80&w=1000&auto=format&fit=crop",
    description: "Crispy, spiral, deep-fried batter soaked in saffron syrup."
  },
  {
    name: "Ladoo Box",
    category: "Festival",
    price: 300,
    quantity: 40,
    image: "https://images.unsplash.com/photo-1599570162524-7489ea5c141d?q=80&w=1000&auto=format&fit=crop",
    description: "Assorted traditional ladoos perfect for celebrations."
  },
  {
    name: "Rasmalai",
    category: "Bengali",
    price: 50,
    quantity: 30,
    image: "https://images.unsplash.com/photo-1549419163-5be9a32c2c01?q=80&w=1000&auto=format&fit=crop",
    description: "Creamy milk dumplings topped with saffron and pistachios."
  },
  {
    name: "Soan Papdi",
    category: "Gift",
    price: 150,
    quantity: 200,
    image: "https://images.unsplash.com/photo-1601050690141-8f5539ab7d58?q=80&w=1000&auto=format&fit=crop",
    description: "Flaky and light sweet made with gram flour and ghee."
  },
  {
    name: "Peda",
    category: "Traditional",
    price: 400,
    quantity: 75,
    image: "https://images.unsplash.com/photo-1605197143615-5464e8e5d038?q=80&w=1000&auto=format&fit=crop",
    description: "Semi-soft milk fudge with cardamom flavor."
  },
  {
    name: "Barfi Collection",
    category: "Assorted",
    price: 600,
    quantity: 25,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=1000&auto=format&fit=crop",
    description: "Premium collection of nut and milk barfis."
  }
];

const seedDB = async () => {
    try {
        await connectMongo();
        console.log("Connected to DB...");

        await Sweet.deleteMany({});
        console.log("Deleted existing sweets...");

        await Sweet.insertMany(sampleSweets);
        console.log("Seeded 10 dummy sweets successfully! 🍬");

        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDB();
