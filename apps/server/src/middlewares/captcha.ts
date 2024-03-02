import type { Request, Response, NextFunction } from "express";
import axios from "axios";

const verifyRecaptcha = async (
  token: string,
  secretKey: string
): Promise<boolean> => {
  try {
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(verificationUrl);
    return response.data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
};

/**
 * Check if the reCAPTCHA token provided in the body is valid.
 * @param req
 * @param res
 * @param next
 * @returns
 */
const checkRecaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.token;
  const secretKey = process.env["CAPTCHA_SERVER_KEY"];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token reCAPTCHA manquant." });
  }

  if (!secretKey) {
    return res.status(500).json({
      success: false,
      message: "Clé secrète de configuration reCaptcha manquante",
    });
  }

  const isTokenValid = await verifyRecaptcha(token, secretKey);

  if (isTokenValid) {
    next();
    return;
  } else {
    return res.status(400).json({
      success: false,
      message: "Échec de validation du token reCAPTCHA.",
    });
  }
};

export default checkRecaptcha;
