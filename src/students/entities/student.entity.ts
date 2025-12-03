import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Student')
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string

    @Column({type: "int"})
    age!: number

}
