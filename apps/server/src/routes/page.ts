import { Router } from "express";
import {
  createPage,
  getAllPages,
  getPagesById,
  updatePage,
} from "../controllers/page";

const router = Router();

router.post("/", createPage);
router.get("/", getAllPages);
router.get("/:id", getPagesById);
router.put("/:id", updatePage);
// / car si autre route on peut les différencié alors que avec /*
export default router;
