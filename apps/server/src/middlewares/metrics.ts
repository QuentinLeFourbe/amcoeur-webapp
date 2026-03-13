import type { NextFunction, Request, Response } from "express";

import { httpRequestDurationSeconds, httpRequestsTotal } from "../services/metricsService.js";

/**
 * Middleware pour capturer les métriques HTTP (RED Method)
 */
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  // On écoute l'événement 'finish' pour calculer la durée une fois la réponse envoyée
  res.on("finish", () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;

    // Normalisation de la route pour éviter l'explosion de cardinalité
    // On utilise req.route.path si disponible (Express 4/5), sinon le chemin brut
    const route = req.route ? req.baseUrl + req.route.path : req.path;
    const method = req.method;
    const status = res.statusCode.toString();

    // Enregistrement des métriques
    httpRequestsTotal.inc({ method, route, status_code: status });
    httpRequestDurationSeconds.observe({ method, route, status_code: status }, durationInSeconds);
  });

  next();
};
