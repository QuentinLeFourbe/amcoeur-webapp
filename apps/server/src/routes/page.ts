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
import upload from "../middlewares/files";

const router = Router();

router.post("/", requiresLogin, upload.any(), createPage);
router.post("/homepage", requiresLogin, getOrCreateHomePage);

router.get("/", getAllPages);
router.get("/:id", getPagesById);

router.put("/:id", requiresLogin, upload.any(), updatePage);

router.delete("/:id", requiresLogin, deletePage);

export default router;
