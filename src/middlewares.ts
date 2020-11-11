import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"

export default {
    isAuthenticated (request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers.authorization;
        const secret = process.env.JWT_SECRET || "";
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, secret, (err, user) => {
                if (err) {
                    return response.sendStatus(403);
                }
                next();
            });
        } else {
            response.sendStatus(401);
        }
    }
}