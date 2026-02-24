import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    password: string
}
