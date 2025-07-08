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
import { requiresActive } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresActive, getAdoptions);
router.get("/public", getAdoptions);
router.get("/:id", requiresActive, getAdoption);
router.get("/:id/public", getAdoption);

router.put("/:id", requiresActive, upload.any(), updateAdoption);
router.post(
  "/contact",
  checkRecaptcha,
  sendAdoptionEmail,
  registerAdoptionAnswer,
);
router.post("/", requiresActive, upload.any(), createAdoption);
router.delete("/:id", requiresActive, deleteAdoption);

export default router;
