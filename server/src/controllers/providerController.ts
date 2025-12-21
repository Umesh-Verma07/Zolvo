import { Request, Response } from "express";
import User from "../models/User";

/**
 * @desc    Get nearby providers (Workers)
 * @route   GET /api/providers/nearby
 * @access  Public
 */
export const getNearbyProviders = async (req: Request, res: Response) => {
  try {
    const { lat, long, category, radius } = req.query;

    // 1. Validation: Coordinates are mandatory
    if (!lat || !long) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    // Convert strings to numbers
    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(long as string);
    const searchRadius = parseFloat(radius as string) || 5000; // Default 5km (in meters)

    // 2. Query Object Construction (Scalable approach)
    // Hum direct User.find() mein nahi likhenge, pehle query banayenge
    let query: any = {
      role: "provider",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // MongoDB wants [Long, Lat]
          },
          $maxDistance: searchRadius, // Filter by distance
        },
      },
    };

    // Agar user ne category select ki hai (e.g., Plumber), toh filter add karo
    if (category) {
      query.category = category;
    }

    // 3. Execution with Performance Optimization
    const providers = await User.find(query)
      .select("name category hourlyRate location phone isAvailable") // Sirf zaroori data bhejo (Network Bachao)
      .lean() // 🔥 PRO TIP: Converts Mongoose Docs to Plain JS Objects (Much Faster)
      .limit(20); // 🚀 Pagination: Limit output to prevent overload

    // 4. Response
    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });

  } catch (error: any) {
    console.error("Error in getNearbyProviders:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};