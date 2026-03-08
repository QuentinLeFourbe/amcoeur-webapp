import { Router } from "express";
import { UserRole } from "@amcoeur/types";

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
import { requiresPermission } from "../middlewares/login.js";

const router = Router();

router.post("/", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.PAGES), upload.any(), createPage);
router.post("/homepage", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.PAGES), createHomePage);

router.get("/", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.PAGES), getPages);
router.get("/homepage", getHomePage);
router.get("/:id", getPageById);

router.put("/:id", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.PAGES), upload.any(), updatePage);

router.delete("/:id", requiresPermission(UserRole.WEBSITE_EDITOR, UserRole.PAGES), deletePage);

export default router;
