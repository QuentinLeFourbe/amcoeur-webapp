import winston from "winston";

// Configuration du format JSON pour la production (Grafana/Loki)
const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// Configuration du format lisible pour le développement
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...rest }) => {
    return `[${timestamp}] ${level}: ${message} ${Object.keys(rest).length ? JSON.stringify(rest) : ""}`;
  }),
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "amcoeur-server" },
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === "development" ? devFormat : jsonFormat,
    }),
  ],
});
