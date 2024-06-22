import { Router } from "express";
import { requiresLogin } from "../middlewares/login.js";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
} from "../controllers/question.js";

const router = Router();

router.post("/", requiresLogin, createQuestion);

router.get("/", requiresLogin, getQuestions);
router.get("/:id", requiresLogin, getQuestion);

router.put("/:id", requiresLogin, updateQuestion);

router.delete("/:id", requiresLogin, deleteQuestion);

export default router;
