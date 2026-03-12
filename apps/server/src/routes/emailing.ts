import { UserRole } from "@amcoeur/types";
import { Router } from "express";

import {
  exportOVHList,
  exportUnsubscribes,
  getMailingListStats,
  getSyncStatus,
  refreshMailingList,
  removeSubscriber,
  sendCampaign,
  syncWithOVH,
} from "../controllers/emailing.js";
import upload from "../middlewares/files.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.get("/stats", requiresPermission(UserRole.EMAILING_MANAGER), getMailingListStats);
router.get("/sync/status/:jobId", requiresPermission(UserRole.EMAILING_MANAGER), getSyncStatus);
router.post("/refresh", requiresPermission(UserRole.EMAILING_MANAGER), refreshMailingList);
router.get("/export-unsubscribes", requiresPermission(UserRole.EMAILING_MANAGER), exportUnsubscribes);
router.get("/export-ovh", requiresPermission(UserRole.EMAILING_MANAGER), exportOVHList);
router.post("/sync", requiresPermission(UserRole.EMAILING_MANAGER), syncWithOVH);
router.delete("/subscriber/:email", requiresPermission(UserRole.EMAILING_MANAGER), removeSubscriber);

// Route pour l'envoi de campagne avec upload d'images multiple
router.post("/send-campaign", requiresPermission(UserRole.EMAILING_MANAGER), upload.any(), sendCampaign);

export default router;
