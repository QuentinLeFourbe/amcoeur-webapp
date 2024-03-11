import type { Request, Response, NextFunction } from "express";
import axios from "axios";

const verifyRecaptcha = async (
  token: string,
  secretKey: string
): Promise<boolean> => {
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(verificationUrl);
    return response.data.success;
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
  try {
    const token = req.body.token;
    const secretKey = process.env["CAPTCHA_SERVER_KEY"];

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Missing reCAPTCHA token." });
    }

    if (!secretKey) {
      return res.status(500).json({
        success: false,
        message: "Missing reCaptcha secret key configuration.",
      });
    }

    const isTokenValid = await verifyRecaptcha(token, secretKey);

    if (isTokenValid) {
      next();
      return;
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to validate reCAPTCHA token.",
      });
    }
  } catch (error) {
    res.locals.logger.error("Error on reCaptcha token validation", error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while validating the reCAPTCHA token.",
    });
  }
};

export default checkRecaptcha;
