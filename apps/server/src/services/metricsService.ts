import { Counter, Histogram, register } from "prom-client";

// Global Registry setup
register.setDefaultLabels({
  app: "amcoeur-webapp",
});

/**
 * METRIQUES HTTP (RED Method)
 */

// Durée des requêtes (Latence)
export const httpRequestDurationSeconds = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 2, 5],
});

// Nombre total de requêtes
export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

/**
 * METRIQUES CACHE (REDIS)
 */
export const cacheOperationsTotal = new Counter({
  name: "cache_operations_total",
  help: "Total number of cache operations (hit, miss, error)",
  labelNames: ["operation", "result"], // operation: get, set, del | result: hit, miss, success, error
});

/**
 * METRIQUES BUSINESS (EXISTANTES)
 */
export const uniqueSessionsCounter = new Counter({
  name: "amcoeur_unique_sessions_total",
  help: "Total number of unique user sessions",
});

export const userActionsCounter = new Counter({
  name: "amcoeur_user_actions_total",
  help: "Total number of specific user actions",
  labelNames: ["action", "category"],
});

export const getMetrics = async () => {
  return await register.metrics();
};

export const getMetricsContentType = () => {
  return register.contentType;
};
