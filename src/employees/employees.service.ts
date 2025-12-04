import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../config/db.config';

@Injectable()
export class EmployeeService {


  async create(body: any): Promise<any> {
    const employee = AppDataSource.getRepository('Employee').create({
      userId: body.userId,
      roleId: body.roleId,
    });
    return {
      status: 201,
      message: 'Employee created successfully',
      data: await AppDataSource.getRepository('Employee').save(employee),
    }
  }

  async findAll(): Promise<any>{
    const res = await AppDataSource.getRepository('Employee').findAndCount({
      relations: ['user', 'role'],
    });
    const [data, count] = res;
    const returnData = data.map((emp, index) => ({
      id: emp.id,
      username: emp.user?.name,
      address:emp.user.address,
      role: emp.role.role,
    }));
    return {
      status: 200,
      message: 'Employees retrieved successfully',
      data: returnData,
      count: count,
    };
  }

  async findOne(id: number): Promise<any> {
    const employee = await AppDataSource.getRepository('Employee').findOne({
      where: { id },
      relations: ['user', 'role'],
    });
    const returnData = {
      id: employee?.id,
      username: employee?.user?.name,
      address:employee?.user.address,
      role: employee?.role.role,
    }


    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return {
      status: 200,
      message: 'Employee retrieved successfully',
      data: returnData,
    };
  }

async update(id: number, body: any): Promise<any> {
  const employee = await AppDataSource.getRepository('Employee').findOne({
    where: { id },
  });

  if (!employee) {
    throw new NotFoundException(`Employee with ID ${id} not found`);
  }

  // Only update provided fields
  if ('userId' in body) employee.userId = body.userId;
  if ('roleId' in body) employee.roleId = body.roleId;

  const savedEmployee = await AppDataSource.getRepository('Employee').save(employee);

  return {
    status: 200,
    message: 'Employee updated successfully',
    data: savedEmployee,
  };
}



  // async remove(id: number): Promise<void> {
  //   const result = await this.employeeRepo.delete(id);

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Employee with ID ${id} not found`);
  //   }
  // }
}
