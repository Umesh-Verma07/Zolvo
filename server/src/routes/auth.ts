import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔥 Multer Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "zolvo_workers", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"], // Sirf images allow karein
  } as any, // 'as any' typescript error avoid karne ke liye
});

const upload = multer({ storage: storage });

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register",upload.single("aadhaarImage"), async (req, res) => {
  try {
    const { name, email, password, phone, role, category, hourlyRate, about, experience, aadhaar } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 2. Encrypt Password (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let aadhaarImageUrl = undefined;
    if (req.file) {
      aadhaarImageUrl = req.file.path;
    }

    // Default Location logic
    const defaultLocation = {
      type: "Point",
      coordinates: [77.2090, 28.6139]
    };



    // 3. Create User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "user",
      location: (role === 'provider') ? defaultLocation : undefined,

      // 🔥 Only for Providers
      category: (role === 'provider') ? category : undefined,
      hourlyRate: (role === 'provider') ? hourlyRate : undefined,
      about: (role === 'provider') ? about : undefined,
      experience: (role === 'provider') ? experience : undefined,
      aadhaar: (role === 'provider') ? aadhaar : undefined,
      aadhaarImage: aadhaarImageUrl,
    });

    await newUser.save();

    // 4. Generate Token immediately so they don't have to login again
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @route   POST /api/auth/login
// @desc    Login user & get token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    // Note: We use .select('+password') because we hid password in model by default
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // 2. Check Password matches
    // Note: user.password can be undefined if fetched without +password, so we check existence
    if (!user.password) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // 3. Generate Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;