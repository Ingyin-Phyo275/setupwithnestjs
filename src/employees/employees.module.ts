import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeeService } from './employees.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeeService],
})
export class EmployeesModule {}
