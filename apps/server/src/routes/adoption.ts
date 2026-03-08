import { UserRole } from "@amcoeur/types";
import { Router } from "express";

import {
  createAdoption,
  deleteAdoption,
  getAdoption,
  getAdoptions,
  registerAdoptionAnswer,
  updateAdoption,
} from "../controllers/adoption.js";
import { checkRecaptcha } from "../middlewares/captcha.js";
import { sendAdoptionEmail } from "../middlewares/email.js";
import upload from "../middlewares/files.js";
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresPermission(UserRole.ADOPTION_MANAGER), getAdoptions);
router.get("/public", getAdoptions);
router.get("/:id", requiresPermission(UserRole.ADOPTION_MANAGER), getAdoption);
router.get("/:id/public", getAdoption);

router.put("/:id", requiresPermission(UserRole.ADOPTION_MANAGER), upload.single("image"), updateAdoption);
router.post(
  "/contact",
  checkRecaptcha,
  sendAdoptionEmail,
  registerAdoptionAnswer,
);
router.post("/", requiresPermission(UserRole.ADOPTION_MANAGER), upload.single("image"), createAdoption);
router.delete("/:id", requiresPermission(UserRole.ADOPTION_MANAGER), deleteAdoption);

export default router;
