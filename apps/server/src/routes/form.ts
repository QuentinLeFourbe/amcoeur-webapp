import { Router } from "express";
import { UserRole } from "@amcoeur/types";

import {
  createForm,
  deleteForm,
  duplicateForm,
  getForm,
  getForms,
  updateForm,
} from "../controllers/form.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.post("/", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.FORMS), createForm);
router.post("/duplicate/:id", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.FORMS), duplicateForm);

router.get("/", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.FORMS), getForms);
router.get("/:id", getForm);

router.put("/:id", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.FORMS), updateForm);

router.delete("/:id", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.FORMS), deleteForm);

export default router;
