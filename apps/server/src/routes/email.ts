import { Router } from "express";

import { sendContactEmail, unsubscribeEmail } from "../controllers/email.js";
import { checkRecaptcha } from "../middlewares/captcha.js";

const router = Router();

router.post("/contact", checkRecaptcha, sendContactEmail);

router.delete("/unsubscribe", checkRecaptcha, unsubscribeEmail);

export default router;
