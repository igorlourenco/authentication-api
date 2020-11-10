import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    instagram_username: string

    @Column()
    password: string

    @Column()
    created_at: Date
}