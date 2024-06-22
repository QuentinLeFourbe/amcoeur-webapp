import "dotenv/config";
import express, { type Request, type Response } from "express";
import path, { dirname } from "path";
import helmet from "helmet";
import questionsRoutes from "./routes/question.js";
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

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const databaseUri = process.env.DB_URI || "";
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "www.google.com", "www.gstatic.com"],
        "frame-src": ["'self'", "www.google.com", "www.gstatic.com"],
      },
    },
  }),
);

app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(express.static(path.join(__dirname, "../../backoffice/dist")));
app.use("/api/images", express.static(path.join(__dirname, "../uploads")));

app.use(getRequestLogger);
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/answers", answersRoutes);

app.get("/administration*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../backoffice/dist/index.html"));
});

app.get("/*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

mongoose
  .connect(databaseUri)
  .then(() => logger.info("Connexion à la base de données établie"))
  .catch((err) =>
    logger.error("Erreur de connexion à la base de données:", err),
  );

app.listen(PORT, () => {
  logger.info(`Serveur en cours d'exécution sur le port ${PORT}`);
});
