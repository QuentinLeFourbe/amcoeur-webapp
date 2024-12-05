import { Router } from "express";

import { sendContactEmail } from "../controllers/email.js";
import { checkRecaptcha } from "../middlewares/captcha.js";

const router = Router();

router.post("/contact", checkRecaptcha, sendContactEmail);

export default router;
