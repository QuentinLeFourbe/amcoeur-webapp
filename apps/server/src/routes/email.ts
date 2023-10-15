import { Router } from "express";
import { sendEmailHandler } from "../controllers/email";
import checkRecaptcha from "../middlewares/captcha";

const router = Router();

router.post("/contact", checkRecaptcha, sendEmailHandler);

export default router;
