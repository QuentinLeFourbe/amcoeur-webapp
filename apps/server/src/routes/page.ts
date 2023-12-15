import { Router } from "express";
import { createPage, getAllPages, getPagesById } from "../controllers/page";

const router = Router();

router.post("/", createPage);
router.get("/", getAllPages);
router.get("/:totoid", getPagesById);

// / car si autre route on peut les différencié alors que avec /*
export default router;
