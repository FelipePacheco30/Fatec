import "dotenv/config";
import express, { Request, Response } from "express";
import { routes } from "./routes";
import { notFoundRoute } from "./views/notFoundView";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use((_req: Request, res: Response) => {
  notFoundRoute(res);
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});
