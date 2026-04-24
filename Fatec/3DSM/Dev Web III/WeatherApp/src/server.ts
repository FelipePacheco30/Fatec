import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { weatherRouter } from "./routes/weather.routes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const viewsPath = path.join(__dirname, "..", "views");

app.disable("x-powered-by");

app.use(
  cors({
    origin: [`http://localhost:${port}`, `http://127.0.0.1:${port}`]
  })
);
app.use(express.json());
app.use(express.static(viewsPath));

app.use("/api", weatherRouter);

app.get("/", (_request, response) => {
  response.sendFile(path.join(viewsPath, "index.html"));
});

app.listen(port, () => {
  console.log(`WeatherApp rodando em http://localhost:${port}`);
});
