import { Router } from "express";
import { sendEmailHandler } from "../controllers/email";

const router = Router();

router.post("/contact", sendEmailHandler);

export default router;
