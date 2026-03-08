import { UserRole } from "@amcoeur/types";
import { Router } from "express";

import {
  exportUnsubscribes,
  getMailingListStats,
  refreshMailingList,
  removeSubscriber,
  syncWithOVH,
} from "../controllers/emailing.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.get("/stats", requiresPermission(UserRole.EMAILING_MANAGER), getMailingListStats);
router.post("/refresh", requiresPermission(UserRole.EMAILING_MANAGER), refreshMailingList);
router.get("/export-unsubscribes", requiresPermission(UserRole.EMAILING_MANAGER), exportUnsubscribes);
router.post("/sync", requiresPermission(UserRole.EMAILING_MANAGER), syncWithOVH);
router.delete("/subscriber/:email", requiresPermission(UserRole.EMAILING_MANAGER), removeSubscriber);

export default router;
