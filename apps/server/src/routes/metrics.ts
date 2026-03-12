import { Router } from "express";

import { exposeMetrics, trackEvent } from "../controllers/metrics.js";

const router = Router();

// Expose metrics for Prometheus
// Note: In fly.toml we can point to this path.
router.get("/metrics", exposeMetrics);

// Track custom events from the client
router.post("/track", trackEvent);

export default router;
