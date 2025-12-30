import express from "express";
import User from "../models/User";
import Booking from "../models/Booking";
import { verifyAdmin } from "../middleware/auth"; // Import the middleware

const router = express.Router();

// 1. Get Dashboard Statistics (Counts)
router.get("/stats", verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalWorkers = await User.countDocuments({ role: 'provider' });
    const totalBookings = await Booking.countDocuments();
    
    res.json({ success: true, stats: { totalUsers, totalWorkers, totalBookings } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 2. Get List of All Users and Workers
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    // Fetch users but exclude passwords
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 3. Delete a User (Ban/Remove)
router.delete("/user/:id", verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;