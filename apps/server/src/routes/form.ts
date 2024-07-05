import { Router } from "express";
import { requiresActive } from "../middlewares/login.js";
import {
  createForm,
  deleteForm,
  getForm,
  getForms,
  updateForm,
} from "../controllers/form.js";

const router = Router();

router.post("/", requiresActive, createForm);

router.get("/", requiresActive, getForms);
router.get("/:id", getForm);

router.put("/:id", requiresActive, updateForm);

router.delete("/:id", requiresActive, deleteForm);

export default router;
