import { Router } from "express";
import { requiresActive } from "../middlewares/login.js";
import {
  createAdoption,
  deleteAdoption,
  getAdoption,
  getAdoptions,
  updateAdoption,
} from "../controllers/adoption.js";

const router = Router();

router.get("/", requiresActive, getAdoptions);
router.get("/:id", requiresActive, getAdoption);

router.put("/:id", requiresActive, updateAdoption);
router.post("/", requiresActive, createAdoption);
router.delete("/:id", requiresActive, deleteAdoption);

export default router;
