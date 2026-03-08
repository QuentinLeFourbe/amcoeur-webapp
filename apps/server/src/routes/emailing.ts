import { Router } from "express";

import {
  exportUnsubscribes,
  getMailingListStats,
  removeSubscriber,
  syncWithOVH,
} from "../controllers/emailing.js";
import { requiresAdmin } from "../middlewares/login.js";

const router = Router();

router.get("/stats", requiresAdmin, getMailingListStats);
router.get("/export-unsubscribes", requiresAdmin, exportUnsubscribes);
router.post("/sync", requiresAdmin, syncWithOVH);
router.delete("/subscriber/:email", requiresAdmin, removeSubscriber);

export default router;
