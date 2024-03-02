import { Router } from "express";
import {
  changeUserPassword,
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUserFromToken,
  getUserById,
  login,
  logout,
  updateUser,
} from "../controllers/user.js";
import { limitAttempts, requiresLogin } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresLogin, getAllUsers);
router.get("/current", getCurrentUserFromToken);
router.get("/:id", requiresLogin, getUserById);

router.post("/login", limitAttempts, login);
router.post("/signup", requiresLogin, createUser);
router.post("/logout", requiresLogin, logout);

router.put("/:id", requiresLogin, updateUser);
router.put("/password/:id", requiresLogin, changeUserPassword);

router.delete("/:id", requiresLogin, deleteUser);

export default router;
