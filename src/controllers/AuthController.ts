import User from "../models/User";
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default {
    async login(request: Request, response: Response){
        const {email, password} = request.body;
        const secret = "meu-segredo";
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOneOrFail({email});

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        const {id} = user

        if (isPasswordMatching) {
            const token = jwt.sign({ id } , secret, {
                expiresIn: 300 // 5min
            })

            return response.status(200).send({ user, auth: true, token: token })
        }

        return response.status(401).send('Login inválido!');
    }
}