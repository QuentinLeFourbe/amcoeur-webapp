import { Router } from "express";
import {
  deleteUser,
  facebookLogin,
  getAllUsers,
  getCurrentUserFromToken,
  getUserById,
  logout,
  processFacebookCallback,
  updateUser,
} from "../controllers/user.js";
import { requiresAdmin, requiresLogin } from "../middlewares/login.js";

const router = Router();

router.get("/", requiresAdmin, getAllUsers);
router.get("/current", getCurrentUserFromToken);
router.get("/:id", requiresAdmin, getUserById);
router.get("/login/facebook", facebookLogin);
router.get("/login/facebook/callback", processFacebookCallback);

router.post("/logout", requiresLogin, logout);

router.put("/:id", requiresAdmin, updateUser);

router.delete("/:id", requiresAdmin, deleteUser);

export default router;
