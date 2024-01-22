import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUserFromToken,
  getUserById,
  login,
  logout,
  updateUser,
} from "../controllers/user";
import { requiresLogin } from "../middlewares/login";

const router = Router();

router.get("/", requiresLogin, getAllUsers);
router.get("/current", getCurrentUserFromToken);
router.get("/:id", requiresLogin, getUserById);

router.post("/login", login);
router.post("/signup", requiresLogin, createUser);
router.post("/logout", requiresLogin, logout);

router.put("/:id", requiresLogin, updateUser);

router.delete("/:id", requiresLogin, deleteUser);

export default router;