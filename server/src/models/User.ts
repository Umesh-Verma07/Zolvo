import mongoose, { Schema, Document } from "mongoose";

// User ka structure define kar rahe hain
export interface IUser extends Document {
  name: string;
  phone: string;
  role: "customer" | "provider";
  category?: string; // Sirf Providers ke liye (e.g., Plumber)
  hourlyRate?: number; // Sirf Providers ke liye
  isAvailable?: boolean;
  location: {
    type: "Point";
    coordinates: number[]; // [Longitude, Latitude]
  };
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ["customer", "provider"], default: "customer" },

    // Provider specific fields
    category: { type: String }, // e.g., 'Plumber', 'Electrician'
    hourlyRate: { type: Number },
    isAvailable: { type: Boolean, default: true },

    // 🔥 JADU: GeoJSON Location (Isse hi nearby workers milenge)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true, // [Longitude, Latitude]
      },
    },
  },
  { timestamps: true }
);

// 🌍 Index banana zaroori hai location search ke liye
UserSchema.index({ location: "2dsphere" });

export default mongoose.model<IUser>("User", UserSchema);