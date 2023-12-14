import { Router } from "express";
import { createPage } from "../controllers/page";

const router = Router();

router.post("/page", createPage);

export default router;
