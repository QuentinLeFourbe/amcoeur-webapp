import express, { Request, Response } from "express";
import path from "path";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client/dist")));
// app.use(helmet());

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
