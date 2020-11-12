import {Router, Request, Response} from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import middlewares from "./middlewares"

const routes = Router()

routes.post("/register", UserController.create);
routes.post("/login", AuthController.login);
routes.get("/", [middlewares.isAuthenticated], UserController.show);

export default routes