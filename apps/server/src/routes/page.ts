import { Router } from "express";
import {
  createPage,
  getAllPages,
  getPagesById,
  updatePage,
  deletePage,
  getOrCreateHomePage,
} from "../controllers/page";
import { requiresLogin } from "../middlewares/login";

const router = Router();

router.post("/", requiresLogin, createPage);
router.post("/homepage", requiresLogin, getOrCreateHomePage);

router.get("/", getAllPages);
router.get("/:id", getPagesById);

router.put("/:id", requiresLogin, updatePage);

router.delete("/:id", requiresLogin, deletePage);

export default router;
