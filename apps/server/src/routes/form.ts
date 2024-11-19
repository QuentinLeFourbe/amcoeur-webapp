import { Router } from "express";

import {
  createForm,
  deleteForm,
  duplicateForm,
  getForm,
  getForms,
  updateForm,
} from "../controllers/form.js";
import { requiresActive } from "../middlewares/login.js";

const router = Router();

router.post("/", requiresActive, createForm);
router.post("/duplicate/:id", requiresActive, duplicateForm);

router.get("/", requiresActive, getForms);
router.get("/:id", getForm);

router.put("/:id", requiresActive, updateForm);

router.delete("/:id", requiresActive, deleteForm);

export default router;
