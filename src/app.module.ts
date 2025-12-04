import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RolesModule } from './roles/roles.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [StudentsModule, UsersModule, RolesModule, EmployeesModule],
  controllers: [AppController, StudentsController, UsersController],
  providers: [AppService, StudentsService, UsersService],
})
export class AppModule {}
