import { Counter, register } from "prom-client";

// Global Registry setup
register.setDefaultLabels({
  app: "amcoeur-webapp",
});

// Metric for unique sessions (based on a session ID from the frontend)
export const uniqueSessionsCounter = new Counter({
  name: "amcoeur_unique_sessions_total",
  help: "Total number of unique user sessions",
});

// Generic metric for user actions with labels
export const userActionsCounter = new Counter({
  name: "amcoeur_user_actions_total",
  help: "Total number of specific user actions (clicks, page visits)",
  labelNames: ["action", "category"],
});

/**
 * Get all metrics for Prometheus scraper
 */
export const getMetrics = async () => {
  return await register.metrics();
};

/**
 * Format for register content type
 */
export const getMetricsContentType = () => {
  return register.contentType;
};
