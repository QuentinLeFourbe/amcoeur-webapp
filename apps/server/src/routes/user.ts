import { Router } from "express";
import {
  deleteUser,
  generateCodeChallenge,
  getAllUsers,
  getCurrentUserFromToken,
  getUserById,
  logout,
  updateUser,
} from "../controllers/user.js";
import { requiresAdmin, requiresLogin } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresAdmin, getAllUsers);
router.get("/current", requiresLogin, getCurrentUserFromToken);
router.get("/:id", requiresAdmin, getUserById);
router.post("/code_challenge", generateCodeChallenge);
router.post("/logout", requiresLogin, logout);

router.put("/:id", requiresAdmin, updateUser);

router.delete("/:id", requiresAdmin, deleteUser);

export default router;
