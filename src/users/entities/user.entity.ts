import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../../employees/entities/employee.entity";

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 100 })
    name!: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    address: string

     @OneToMany(() => Employee, employee => employee.user)
  employees!: Employee[];

}
