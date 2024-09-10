import "dotenv/config";
import express from "express";
import path, { dirname } from "path";
import helmet from "helmet";
import formsRoutes from "./routes/form.js";
import emailRoutes from "./routes/email.js";
import answersRoutes from "./routes/answer.js";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";
import pageRoutes from "./routes/page.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { getRequestLogger } from "./middlewares/logger.js";
import { logger } from "./utils/logger.js";
import { redisClient } from "./services/redisService.js";
import * as https from "https";
import * as fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const databaseUri = process.env.DB_URI || "";
const corsOptions =
  process.env.NODE_ENV === "development"
    ? {
      origin: [
        "https://localhost:3001",
        "https://localhost:3002",
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

app.use("/images", express.static(path.join(__dirname, "../uploads")));

app.use(getRequestLogger);
app.use("/users", userRoutes);
app.use("/email", emailRoutes);
app.use("/pages", pageRoutes);
app.use("/forms", formsRoutes);
app.use("/answers", answersRoutes);

redisClient.connect();

mongoose
  .connect(databaseUri)
  .then(() => logger.info("Connexion à la base de données établie"))
  .catch((err) =>
    logger.error("Erreur de connexion à la base de données:", err),
  );

if (process.env.NODE_ENV === "development") {
  const options = {
    key: fs.readFileSync(path.join(__dirname, "../../../certs/localhost.key")),
    cert: fs.readFileSync(path.join(__dirname, "../../../certs/localhost.crt")),
  };
  https.createServer(options, app).listen(PORT, () => {
    logger.info(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    logger.info(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
}
