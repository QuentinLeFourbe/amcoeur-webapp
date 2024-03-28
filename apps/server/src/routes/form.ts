import { Router } from "express";
import { requiresLogin } from "../middlewares/login.js";
import {
  createForm,
  deleteForm,
  getForm,
  getForms,
  updateForm,
} from "../controllers/form.js";

const router = Router();

router.post("/", requiresLogin, createForm);

router.get("/", requiresLogin, getForms);
router.get("/:id", requiresLogin, getForm);

router.put("/:id", requiresLogin, updateForm);

router.delete("/:id", requiresLogin, deleteForm);

export default router;
