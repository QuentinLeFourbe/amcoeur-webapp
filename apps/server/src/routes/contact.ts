import { UserRole } from "@amcoeur/types";
import { Router } from "express";

import {
  getContacts,
  importContacts,
} from "../controllers/contact.js";
import upload from "../middlewares/files.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresPermission(UserRole.CONTACT_MANAGER), getContacts);
router.post("/import", requiresPermission(UserRole.CONTACT_MANAGER), upload.single("file"), importContacts);

export default router;
