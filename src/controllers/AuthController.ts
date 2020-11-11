import User from "../models/User";
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default {
    async login(request: Request, response: Response){
        const {email, password} = request.body;
        const secret = process.env.JWT_SECRET || "";
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOneOrFail({email});

        if (!user){
            return response.status(404).json({message: "Usuário não encontrado."})
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (isPasswordMatching) {
            const token = jwt.sign({ user } , secret, {
                expiresIn: 300 // 5min
            })

            return response.status(200).send({ user, auth: true, token: token })
        }

        return response.status(401).send('Login inválido!');
    }
}