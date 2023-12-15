import { Router } from "express";
import { createPage } from "../controllers/page";

const router = Router();

router.post("/", createPage);
// / car si autre route on peut les différencié alors que avec /*
export default router;
