import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";
import { v4 as uuidv4 } from "uuid";

export const getRequestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = process.hrtime();

  const requestId = uuidv4();
  const enrichedLogger = logger.child({
    requestId,
    method: req.method,
    route: req.path,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  const calculateDuration = (): string => {
    const duration = process.hrtime(startTime);
    const milliseconds = duration[0] * 1000 + duration[1] / 1000000;
    return milliseconds.toFixed(2) + "ms";
  };

  res.on("finish", () => {
    const duration = calculateDuration();
    const responseData = {
      statusCode: res.statusCode,
      contentLength: res.get("Content-Length"),
      contentType: res.get("Content-Type"),
    };
    enrichedLogger.info(`Request duration: ${duration}`, { responseData });
  });

  res.locals.logger = enrichedLogger;

  next();
};
