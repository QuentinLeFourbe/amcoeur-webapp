import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} from "../controllers/user";
import { requiresLogin } from "../middlewares/login";

const router = Router();

router.get("/", requiresLogin, getAllUsers);
router.get("/:id", requiresLogin, getUserById);

router.post("/login", login);
router.post("/signup", requiresLogin, createUser);

router.put("/:id", requiresLogin, updateUser);

router.delete("/:id", requiresLogin, deleteUser);

export default router;
