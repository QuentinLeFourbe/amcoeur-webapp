import { Router } from "express";
import { createPage, getAllPages } from "../controllers/page";

const router = Router();

router.post("/", createPage, getAllPages);
// / car si autre route on peut les différencié alors que avec /*
export default router;
