import { Router } from "express";

import {
  createAnswer,
  deleteAnswer,
  getAnswer,
  getAnswers,
  updateAnswer,
} from "../controllers/answer.js";
import { checkRecaptcha } from "../middlewares/captcha.js";
import { requiresActive } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresActive, getAnswers);
router.get("/:id", requiresActive, getAnswer);

router.put("/:id", requiresActive, updateAnswer);
router.post("/", checkRecaptcha, createAnswer);
router.delete("/:id", requiresActive, deleteAnswer);

export default router;
