import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { logger } from "../utils/logger.js";

/**
 * Middleware pour le logging sélectif (Errors + Slow Requests)
 */
export const getRequestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // On ne logge jamais les health checks réussis pour éviter le bruit
  if (req.path === "/health") {
    return next();
  }

  const startTime = process.hrtime();
  const requestId = uuidv4();
  
  const enrichedLogger = logger.child({
    requestId,
    method: req.method,
    route: req.path,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  const getDurationMs = (): number => {
    const duration = process.hrtime(startTime);
    return duration[0] * 1000 + duration[1] / 1000000;
  };

  res.on("finish", () => {
    const durationMs = getDurationMs();
    const isError = res.statusCode >= 400;
    const isSlow = durationMs > 2000;

    // On ne logge QUE s'il y a une erreur ou si la requête est lente (> 2s)
    if (isError || isSlow) {
      const responseData = {
        statusCode: res.statusCode,
        contentLength: res.get("Content-Length"),
        contentType: res.get("Content-Type"),
        duration: `${durationMs.toFixed(2)}ms`,
      };

      if (isError) {
        enrichedLogger.error(`Request Error: ${res.statusCode} on ${req.method} ${req.path}`, { responseData });
      } else if (isSlow) {
        enrichedLogger.warn(`Slow Request detected: ${durationMs.toFixed(2)}ms`, { responseData });
      }
    }
  });

  res.locals.logger = enrichedLogger;
  next();
};
