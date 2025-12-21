import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import providerRoutes from "./routes/providerRoutes";

// 1. Config Load karein
dotenv.config();

// 2. Database Connect karein
connectDB();

const app: Application = express();

// 3. Middlewares (Security & Parsing)
app.use(cors()); // Doosre domains (Frontend) se request allow karne ke liye
app.use(express.json()); // JSON data padhne ke liye

// 4. Routes Register karein
// Jab bhi koi '/api/providers' par aayega, use providerRoutes sambhalega
app.use("/api/providers", providerRoutes);

// Test Route (Check karne ke liye ki server zinda hai)
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Zolvo Server is Running & Scalable!");
});

// 5. Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
});