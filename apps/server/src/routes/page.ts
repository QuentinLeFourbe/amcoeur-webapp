import { Router } from "express";
import {
  createPage,
  getPages,
  getPagesById,
  updatePage,
  deletePage,
  createHomePage,
  getHomePage,
} from "../controllers/page.js";
import { requiresActive } from "../middlewares/login.js";
import upload from "../middlewares/files.js";

const router = Router();

router.post("/", requiresActive, upload.any(), createPage);
router.post("/homepage", requiresActive, createHomePage);

router.get("/", getPages);
router.get("/homepage", getHomePage);
router.get("/:id", getPagesById);

router.put("/:id", requiresActive, upload.any(), updatePage);

router.delete("/:id", requiresActive, deletePage);

export default router;
