import type { Request, Response } from "express";

import { getMetrics, getMetricsContentType, uniqueSessionsCounter, userActionsCounter } from "../services/metricsService.js";

/**
 * Handle tracking request from the frontend
 */
export const trackEvent = async (req: Request, res: Response) => {
  const { action, category, isNewSession } = req.body;

  try {
    if (isNewSession) {
      uniqueSessionsCounter.inc();
    }

    if (action || category) {
      userActionsCounter.inc({ 
        action: String(action || "visit"), 
        category: String(category || "general") 
      });
    }

    return res.status(204).send();
  } catch (err) {
    res.locals.logger.error("Error tracking metric:", err);
    return res.status(500).send();
  }
};

/**
 * Expose metrics for Fly.io Prometheus scraper
 */
export const exposeMetrics = async (_req: Request, res: Response) => {
  try {
    res.set("Content-Type", getMetricsContentType());
    const metrics = await getMetrics();
    res.send(metrics);
  } catch (err) {
    res.status(500).send(err);
  }
};
