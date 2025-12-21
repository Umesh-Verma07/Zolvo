import { Router } from "express";
import { getNearbyProviders } from "../controllers/providerController";

const router = Router();

// @route   GET /api/providers/nearby
// @desc    Find providers based on lat/long
// @access  Public
router.get("/nearby", getNearbyProviders);

export default router;