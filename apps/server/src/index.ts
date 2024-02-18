import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import helmet from "helmet";
import emailRoutes from "./routes/email";
import userRoutes from "./routes/user";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import pageRoutes from "./routes/page";
import cors from "cors";
import cookieParser from "cookie-parser";

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
app.use(bodyParser.json());
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
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/pages", pageRoutes);

app.get("/administration*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../backoffice/dist/index.html"));
});

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

mongoose
  .connect(databaseUri)
  .then(() => console.log("Connexion à la base de données établie"))
  .catch((err) =>
    console.error("Erreur de connexion à la base de données:", err),
  );

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
