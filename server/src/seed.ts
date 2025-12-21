import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("🌱 Database Connected...");

    // Pehle purana data saaf karein
    await User.deleteMany({ role: "provider" });
    console.log("🧹 Old Providers Cleared...");

    const providers = [
      {
        name: "Raju Plumber",
        phone: "9876543210",
        role: "provider",
        category: "plumber",
        hourlyRate: 200,
        location: { type: "Point", coordinates: [77.2090, 28.6139] }, // CP, Delhi
      },
      {
        name: "Shyam Electrician",
        phone: "9876543211",
        role: "provider",
        category: "electrician",
        hourlyRate: 300,
        location: { type: "Point", coordinates: [77.2100, 28.6120] }, // Thoda dur
      },
      {
        name: "Mohan Painter",
        phone: "9876543212",
        role: "provider",
        category: "painter",
        hourlyRate: 400,
        location: { type: "Point", coordinates: [77.2000, 28.6100] }, // Aur dur
      },
      {
        name: "Gita Cleaner",
        phone: "9876543213",
        role: "provider",
        category: "cleaner",
        hourlyRate: 150,
        location: { type: "Point", coordinates: [77.2200, 28.6200] },
      }
    ];

    await User.insertMany(providers);
    console.log("✅ 4 New Providers Added!");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedData();