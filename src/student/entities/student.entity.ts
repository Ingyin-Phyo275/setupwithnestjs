import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar' })
    fPhone: string

    @Column({ type: 'varchar', nullable: true })
    sPhone: string

    @Column({ type: 'text' })
    address: string

    @Column({ type: 'varchar' })
    class: string

    @Column({ type: 'varchar' })
    major: string
}
