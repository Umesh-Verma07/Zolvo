import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  }, // Abhi ke liye simple String (future mein User ID hoga)
  
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // Kaunsa Worker book hua

  serviceType: { type: String, required: true }, // e.g., Plumber
  
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // HH:mm
  
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "completed", "cancelled"], 
    default: "pending" 
  },
  
  address: { type: String, required: true }, // User ka address
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);