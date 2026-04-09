import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import mongoose from "mongoose";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { getRequestLogger } from "./middlewares/logger.js";
import { metricsMiddleware } from "./middlewares/metrics.js";
import adoptionsRoutes from "./routes/adoption.js";
import answersRoutes from "./routes/answer.js";
import contactRoutes from "./routes/contact.js";
import emailRoutes from "./routes/email.js";
import emailingRoutes from "./routes/emailing.js";
import formsRoutes from "./routes/form.js";
import metricsRoutes from "./routes/metrics.js";
import pageRoutes from "./routes/page.js";
import userRoutes from "./routes/user.js";
import { redisClient } from "./services/redisService.js";
import { logger } from "./utils/logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const databaseUri = process.env.DB_URI || "";
const corsOptions =
  process.env.NODE_ENV === "development"
    ? {
        origin: [
          "http://localhost:3001",
          "http://localhost:3002",
          "http://localhost:8888",
        ],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
    : {
        origin: [
          "https://www.amcoeur.org",
          "https://administration.amcoeur.org",
        ],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      };

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(metricsMiddleware);
app.use((_req, res, next) => {
  res.set({ "Cross-Origin-Resource-Policy": "cross-origin" });
  next();
});

/**
 * Resolves the absolute path for static folders (assets, uploads).
 * It dynamically detects the environment by checking for co-located folders (dist) 
 * or parent folders (src/dev).
 * 
 * @param folderName - The name of the folder to resolve
 * @returns The absolute system path to the folder
 */
const getStaticPath = (folderName: string) => {
  // 1. Try local path relative to current module (works in dist/ bundled output)
  const localPath = path.join(__dirname, folderName);
  if (fs.existsSync(localPath)) {
    return localPath;
  }
  
  // 2. Try parent path relative to current module (standard for src/ layout in dev)
  const parentPath = path.join(__dirname, "..", folderName);
  if (fs.existsSync(parentPath)) {
    return parentPath;
  }
  
  // 3. Last resort fallback for production containers
  return `/app/apps/server/${folderName}`;
};

const uploadsPath = getStaticPath("uploads");
const assetsPath = getStaticPath("assets");

app.use("/images", express.static(uploadsPath));
app.use("/assets", express.static(assetsPath));

app.use(getRequestLogger);
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/users", userRoutes);
app.use("/email", emailRoutes);
app.use("/pages", pageRoutes);
app.use("/forms", formsRoutes);
app.use("/answers", answersRoutes);
app.use("/adoptions", adoptionsRoutes);
app.use("/contacts", contactRoutes);
app.use("/emailing", emailingRoutes);
app.use("/stats", metricsRoutes);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("Le fichier est trop volumineux (max 10Mo)");
    }
    return res.status(400).send(`Erreur lors du téléchargement: ${err.message}`);
  }
  
  logger.error("Unhandled error:", err);
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).send("Une erreur interne est survenue");
});

redisClient.connect();

mongoose
  .connect(databaseUri)
  .then(() => logger.info("Connexion à la base de données établie"))
  .catch((err) =>
    logger.error("Erreur de connexion à la base de données:", err),
  );

app.listen(PORT, () => {
  logger.info(`Serveur en cours d'exécution sur le port ${PORT}`);
});
