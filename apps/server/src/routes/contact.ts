import { Router } from "express";
import { UserRole } from "@amcoeur/types";

import {
  getContacts,
  importContacts,
} from "../controllers/contact.js";
import upload from "../middlewares/files.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresPermission(UserRole.CONTACT_MANAGER), getContacts);
router.post("/import", upload.single("file"), requiresPermission(UserRole.CONTACT_MANAGER), importContacts);

export default router;
