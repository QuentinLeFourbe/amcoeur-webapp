import { Router } from "express";

import {
  exportUnsubscribes,
  getContacts,
  getMailingListStats,
  importContacts,
  syncWithOVH,
} from "../controllers/contact.js";
import upload from "../middlewares/files.js";
import { requiresAdmin } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresAdmin, getContacts);
router.get("/stats", requiresAdmin, getMailingListStats);
router.get("/export-unsubscribes", requiresAdmin, exportUnsubscribes);
router.post("/import", requiresAdmin, upload.single("file"), importContacts);
router.post("/sync", requiresAdmin, syncWithOVH);

export default router;
