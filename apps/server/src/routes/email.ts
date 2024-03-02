import { Router } from "express";
import { sendEmailHandler } from "../controllers/email.js";
import checkRecaptcha from "../middlewares/captcha.js";

const router = Router();

router.post("/contact", checkRecaptcha, sendEmailHandler);

export default router;
