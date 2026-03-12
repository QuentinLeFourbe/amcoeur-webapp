import { UserRole } from "@amcoeur/types";
import { Router } from "express";

import {
  exportUnsubscribes,
  getMailingListStats,
  refreshMailingList,
  removeSubscriber,
  sendCampaign,
  syncWithOVH,
} from "../controllers/emailing.js";
import upload from "../middlewares/files.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.get("/stats", requiresPermission(UserRole.EMAILING_MANAGER), getMailingListStats);
router.post("/refresh", requiresPermission(UserRole.EMAILING_MANAGER), refreshMailingList);
router.get("/export-unsubscribes", requiresPermission(UserRole.EMAILING_MANAGER), exportUnsubscribes);
router.post("/sync", requiresPermission(UserRole.EMAILING_MANAGER), syncWithOVH);
router.delete("/subscriber/:email", requiresPermission(UserRole.EMAILING_MANAGER), removeSubscriber);

// Route pour l'envoi de campagne avec upload d'images multiple
router.post("/send-campaign", requiresPermission(UserRole.EMAILING_MANAGER), upload.any(), sendCampaign);

export default router;
