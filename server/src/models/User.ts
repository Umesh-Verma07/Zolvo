import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true, // Email duplicate nahi ho sakti
    sparse: true  // Allows null/undefined for existing users without email
  },
  password: { 
    type: String, 
    select: false // Default query mein password kabhi return nahi hoga (Safety)
  },
  phone: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["user", "provider"], 
    default: "user" 
  },
  
  // Fields specifically for Service Providers
  category: { type: String }, 
  hourlyRate: { type: Number },
  location: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number], index: "2dsphere" }, // [Longitude, Latitude]
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);