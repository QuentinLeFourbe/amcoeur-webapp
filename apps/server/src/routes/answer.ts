import { Router } from "express";
import { requiresLogin } from "../middlewares/login.js";
import {
  createAnswer,
  deleteAnswer,
  getAnswer,
  getAnswers,
} from "../controllers/answer.js";

const router = Router();

router.get("/", requiresLogin, getAnswers);
router.get("/:id", requiresLogin, getAnswer);

router.post("/", createAnswer);
router.delete("/:id", requiresLogin, deleteAnswer);

export default router;
