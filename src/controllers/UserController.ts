import {Request, Response} from "express"
import {getRepository} from "typeorm"
import User from "../models/User"
import bcrypt from "bcrypt"
import UserView from "../views/user_view"

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password,
            instagram_username
        } = request.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const userRepository = getRepository(User)

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            instagram_username,
            created_at: Date.now()
        })

        await userRepository.save(user)

        return response.status(201).json(user)
    },

    async show(request: Request, response: Response) {
        const {user} = request

        const usersRepository = getRepository(User);

        const userData = await usersRepository.findOneOrFail({id: user.id});

        return response.json(UserView.render(userData));
    },
}