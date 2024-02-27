import { Router } from "express";
import {
  createPage,
  getAllPages,
  getPagesById,
  updatePage,
  deletePage,
  createHomePage,
  getHomePage,
} from "../controllers/page.js";
import { requiresLogin } from "../middlewares/login.js";
import upload from "../middlewares/files.js";

const router = Router();

router.post("/", requiresLogin, upload.any(), createPage);
router.post("/homepage", requiresLogin, createHomePage);

router.get("/", getAllPages);
router.get("/homepage", getHomePage);
router.get("/:id", getPagesById);

router.put("/:id", requiresLogin, upload.any(), updatePage);

router.delete("/:id", requiresLogin, deletePage);

export default router;
