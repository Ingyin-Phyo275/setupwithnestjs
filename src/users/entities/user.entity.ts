import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: 'varchar', length: 100})
    name!: string

    @Column({type: 'varchar', length: 100, nullable: true})
    address: string
}
