import express, {Request, Response} from "express"
import "./database/connection"
import {getRepository} from "typeorm";
import User from "./models/User";

const app = express()

app.use(express.json())

app.post("/users", async (request: Request, response: Response) => {
    const {
        name,
        email,
        password,
        instagram_username
    } = request.body

    const userRepository = getRepository(User)

    const user = userRepository.create({
        name,
        email,
        password,
        instagram_username,
        created_at: Date.now()
    })

    await userRepository.save(user)

    return response.status(201).json(user)
})

app.listen(3333)