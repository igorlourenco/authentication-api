import {NextFunction, Request, Response} from "express";
export default {
    isAuthenticated (request: Request, response: Response, next: NextFunction) {
        console.log('LOGGED');
        next();
    }
}