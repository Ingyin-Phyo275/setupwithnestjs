import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../../employees/entities/employee.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, })
    role!: string;

    @OneToMany(() => Employee, employee => employee.role)
    employees!: Employee[];
}
