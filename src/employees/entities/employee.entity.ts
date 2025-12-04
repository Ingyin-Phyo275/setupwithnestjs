import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  // --- User relation ---
  @ManyToOne(() => User, user => user.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', foreignKeyConstraintName: 'fk_employee_user' })
  user!: User;

  @Column()
  userId!: number;

  // --- Role relation ---
  @ManyToOne(() => Role, role => role.employees, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'roleId', foreignKeyConstraintName: 'fk_employee_role' })
  role!: Role;

  @Column()
  roleId!: number;
}
