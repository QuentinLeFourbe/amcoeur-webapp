import "dotenv/config";
import express, { type Request, type Response } from "express";
import helmet from "helmet";
import emailRoutes from "./routes/email.js";
import userRoutes from "./routes/user.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import pageRoutes from "./routes/page.js";
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

app.use(express.static(new URL("../../client/dist", import.meta.url).toString()));
app.use(express.static(new URL("../../backoffice/dist", import.meta.url).toString()));
app.use("/api/images", express.static(new URL("../uploads", import.meta.url).toString()));
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/pages", pageRoutes);

app.get("/administration*", (_req: Request, res: Response) => {
  res.sendFile(new URL("../../backoffice/dist/index.html", import.meta.url).toString());
});

app.get("/*", (_req: Request, res: Response) => {
  res.sendFile(new URL("../../client/dist/index.html", import.meta.url).toString());
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
