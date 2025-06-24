import { Router } from "express";

import {
  createHomePage,
  createPage,
  deletePage,
  getHomePage,
  getPageById,
  getPages,
  updatePage,
} from "../controllers/page.js";
import upload from "../middlewares/files.js";
import { requiresActive } from "../middlewares/login.js";

const router = Router();

router.post("/", requiresActive, upload.any(), createPage);
router.post("/homepage", requiresActive, createHomePage);

router.get("/", getPages);
router.get("/homepage", getHomePage);
router.get("/:id", getPageById);

router.put("/:id", requiresActive, upload.any(), updatePage);

router.delete("/:id", requiresActive, deletePage);

export default router;
