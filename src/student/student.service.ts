import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AppDataSource } from '../config/db.config';

@Injectable()
export class StudentService {
  async create(createStudentDto: CreateStudentDto) {
    try {
      const res = await AppDataSource.getRepository('student').save(createStudentDto);
      return {
        statusCode: 201,
        message: 'Student created successfully',
        data: res
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const res = await AppDataSource.getRepository('student').findAndCount();
      const [data, count] = res;
      return {
        statusCode: 200,
        message: 'Students fetched successfully',
        data: data,
        count: count
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const res = await AppDataSource.getRepository('student').findOneBy({ id: id });
      if(!res) {
        return {
          statusCode: 200,
          message: 'No student found',
          data: res
        }
      }
      return {
        statusCode: 200,
        message: 'Student fetched successfully',
        data: res
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    try {
      const res = await this.findOne(id);
      if(!res) {
        throw new NotFoundException('No student found');
      }
      const data = await AppDataSource.getRepository('student').update({ id: id }, updateStudentDto);
      return {
        statusCode: 200,
        message: 'Student updated successfully',
        data: await this.findOne(id)
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.findOne(id);
      if(!res) {
        throw new NotFoundException('No student found');
      }
      const data = await AppDataSource.getRepository('student').delete({ id: id });
      return {
        statusCode: 200,
        message: 'Student deleted successfully',
        data: data
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
