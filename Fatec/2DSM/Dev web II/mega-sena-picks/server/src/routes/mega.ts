import { Router } from "express";
import { last, getConcurso} from "../controllers/MegaController";

const routes = Router();

routes.get("/", last);
routes.get("/:concurso", getConcurso);

export default routes;