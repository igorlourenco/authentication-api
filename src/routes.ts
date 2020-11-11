import {Router, Request, Response} from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import middlewares from "./middlewares"

const routes = Router()

routes.post("/users", UserController.create);
routes.post("/login", AuthController.login);
routes.get("/", [middlewares.isAuthenticated], (request: Request, response: Response)=>{return response.json({message: "asga"})});

export default routes