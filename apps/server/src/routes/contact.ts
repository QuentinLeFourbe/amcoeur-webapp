import { UserRole } from "@amcoeur/types";
import { Router } from "express";

import {
  createContact,
  deleteContact,
  exportContacts,
  getContacts,
  importContacts,
} from "../controllers/contact.js";
import upload from "../middlewares/files.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresPermission(UserRole.CONTACT_MANAGER), getContacts);
router.post("/", requiresPermission(UserRole.CONTACT_MANAGER), createContact);
router.get("/export", requiresPermission(UserRole.EMAILING_MANAGER), exportContacts);
router.post("/import", upload.single("file"), requiresPermission(UserRole.CONTACT_MANAGER), importContacts);
router.delete("/:id", requiresPermission(UserRole.CONTACT_MANAGER), deleteContact);

export default router;
