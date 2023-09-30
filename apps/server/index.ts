import express, { Request, Response } from "express";
import path from "path";
import helmet from "helmet";
import emailRoutes from "./routes/email";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/email", emailRoutes);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
