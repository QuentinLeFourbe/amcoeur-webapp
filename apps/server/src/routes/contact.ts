import { Router } from "express";

import {
  getContacts,
  importContacts,
} from "../controllers/contact.js";
import upload from "../middlewares/files.js";
import { requiresAdmin } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresAdmin, getContacts);
router.post("/import", requiresAdmin, upload.single("file"), importContacts);

export default router;
