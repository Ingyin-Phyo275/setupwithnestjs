import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppDataSource } from '../config/db.config';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const res = await AppDataSource.getRepository('User').save(createUserDto);
    if ( res ) {
      return {
        status: 201,
        message: 'User created successfully',
        data: res,
      };
    } else {
      return {
        status: 500,
        message: 'User creation failed',
        data: null,
      }
    }
  }

  async findAll() {
    const res = await AppDataSource.getRepository('User').findAndCount();
    const [data, count] = res;
    if (res.length > 0) {
      return {
        status: 200,
        message: 'Users retrieved successfully',
        data: data,
        count: count,
      };
    } else {
      return {
        status: 404,
        message: 'No users found',
        data: [],
      };
    }
  }

  async findOne(id: number) {
    const res = await AppDataSource.getRepository('User').findOneBy({ id });
    if (res) {
      return {
        status: 200,
        message: 'User retrieved successfully',
        data: res,
      };
    } else {
      return {
        status: 404,
        message: 'User not found',
        data: null,
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await AppDataSource.getRepository('User').update(id, updateUserDto);
    if (res.affected && res.affected > 0) {
      const updatedUser = await AppDataSource.getRepository('User').findOneBy({ id });
      return {
        status: 200,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } else {
      return {
        status: 500,
        message: 'User not found',
        data: null,
      };
    }
  }

  async remove(id: number) {
    const res = await AppDataSource.getRepository('User').delete(id);
    return {
      status: 200,
      message: 'User deleted successfully',
      data: res,
    }
  }
}
