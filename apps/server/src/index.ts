import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { getRequestLogger } from "./middlewares/logger.js";
import adoptionsRoutes from "./routes/adoption.js";
import answersRoutes from "./routes/answer.js";
import emailRoutes from "./routes/email.js";
import formsRoutes from "./routes/form.js";
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
app.use((_req, res, next) => {
  res.set({ "Cross-Origin-Resource-Policy": "cross-origin" });
  next();
});

app.use("/images", express.static(path.join(__dirname, "../uploads")));

app.use(getRequestLogger);
app.use("/users", userRoutes);
app.use("/email", emailRoutes);
app.use("/pages", pageRoutes);
app.use("/forms", formsRoutes);
app.use("/answers", answersRoutes);
app.use("/adoptions", adoptionsRoutes);

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
