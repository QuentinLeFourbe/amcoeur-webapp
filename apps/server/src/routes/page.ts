import { Router } from "express";
import {
  createPage,
  getAllPages,
  getPagesById,
  updatePage,
  deletePage,
} from "../controllers/page";
import { requiresLogin } from "../middlewares/login";

const router = Router();

router.post("/", requiresLogin, createPage);
router.get("/", getAllPages);
router.get("/:id", getPagesById);
router.put("/:id", requiresLogin, updatePage);
router.delete("/:id", requiresLogin, deletePage);
// / car si autre route on peut les différencié alors que avec /*
export default router;
