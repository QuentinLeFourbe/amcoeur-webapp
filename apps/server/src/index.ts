import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import helmet from "helmet";
import emailRoutes from "./routes/email";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "www.google.com", "www.gstatic.com"],
        "frame-src": ["'self'", "www.google.com", "www.gstatic.com"],
      },
    },
  })
);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/email", emailRoutes);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
