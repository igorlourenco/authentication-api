import {Router} from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";

const routes = Router()

routes.post("/users", UserController.create);
routes.post("/login", AuthController.login);

export default routes