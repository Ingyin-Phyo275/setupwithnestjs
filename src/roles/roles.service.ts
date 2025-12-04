import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AppDataSource } from '../config/db.config';

@Injectable()
export class RolesService {
 async create(createRoleDto: CreateRoleDto) {
    const res = await AppDataSource.getRepository('Role').save(createRoleDto);
    if ( res ) {
      return {
        status: 201,
        message: 'Role created successfully',
        data: res,
      };
    } else {
      return {
        status: 500,
        message: 'Role creation failed',
        data: null,
      }
    }
  }

  async findAll() {
    const res = await AppDataSource.getRepository('Role').findAndCount();
    const [data, count] = res;
    if (res.length > 0) {
      return {
        status: 200,
        message: 'Roles retrieved successfully',
        data: data,
        count: count,
      };
    } else {
      return {
        status: 404,
        message: 'No roles found',
        data: [],
      };
    }
  }

  async findOne(id: number) {
    const res = await AppDataSource.getRepository('Role').findOneBy({ id });
    if (res) {
      return {
        status: 200,
        message: 'Role retrieved successfully',
        data: res,
      };
    } else {
      return {
        status: 404,
        message: 'Role not found',
        data: null,
      }
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const res = await AppDataSource.getRepository('Role').update(id, updateRoleDto);
    if (res.affected && res.affected > 0) {
      const updatedRole = await AppDataSource.getRepository('Role').findOneBy({ id });
      return {
        status: 200,
        message: 'Role updated successfully',
        data: updatedRole,
      };
    } else {
      return {
        status: 404,
        message: 'Role not found or update failed',
        data: null,
      };
    }
  }

  async remove(id: number) {
    const res = await AppDataSource.getRepository('Role').delete(id);
    if (res.affected && res.affected > 0) {
      return {
        status: 200,
        message: 'Role deleted successfully',
      };
    } else {
      return {
        status: 404,
        message: 'Role not found or deletion failed',
      };
    }
  }
}
