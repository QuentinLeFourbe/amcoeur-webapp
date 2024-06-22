import { Router } from "express";
import { requiresLogin } from "../middlewares/login.js";
import {
  createAnswer,
  deleteAnswer,
  getAnswer,
  getAnswers,
  updateAnswer,
} from "../controllers/answer.js";
import { checkRecaptcha } from "../middlewares/captcha.js";

const router = Router();

router.get("/", requiresLogin, getAnswers);
router.get("/:id", requiresLogin, getAnswer);

router.put("/:id", requiresLogin, updateAnswer);
router.post("/", checkRecaptcha, createAnswer);
router.delete("/:id", requiresLogin, deleteAnswer);

export default router;