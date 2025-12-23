import express from "express";
import Booking from "../models/Booking";
import User from "../models/User";

const router = express.Router();

// 1. Create New Booking (User jab 'Book Now' dabayega)
router.post("/", async (req, res) => {
  try {
    const { userId, providerId, serviceType, date, time, address } = req.body;

    const newBooking = new Booking({
      userId,
      providerId,
      serviceType,
      date,
      time,
      address,
      status: "confirmed" // Abhi direct confirm kar rahe hain
    });

    await newBooking.save();
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Booking Failed", error });
  }
});

// 2. Get User's Bookings (My Bookings page ke liye)
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("providerId", "name phone hourlyRate category") // Worker ki details bhi layenge
      .sort({ createdAt: -1 }); // Latest pehle
      
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export default router;