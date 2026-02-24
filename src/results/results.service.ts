import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';
import { AppDataSource } from '../config/db.config';

@Injectable()
export class ResultsService {
  async create(createResultDto: CreateResultDto) {
     const res = await AppDataSource.getRepository(Result).save(createResultDto);
        return {
          statusCode: 201,
          message: 'Results created successfully',
          data: res
        };
  }

 async  findAll() {
    const res = await AppDataSource.getRepository(Result).findAndCount({
      order: {
        id: 'ASC'
      }
    });
        const [results, count] = res;
        if( count === 0 ) return new Error('No questions found');
        console.log("response data", results)
        return {
          statusCode: 200,
          message: 'Results fetched successfully',
          data: results,
          count: count
        }
  }

  async findOne(id: number) {
    try {
      const response = await AppDataSource.getRepository(Result).findOneBy({ id: id });
      if(!response){
        throw new Error('Result not found');
      }
      return {
        statusCode: 200,
        message: 'Result fetched successfully',
        data: response
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    try {
      const response = await this.findOne(id);
      if (!response) {
        throw new Error('Result not found');
      }
      const data = await AppDataSource.getRepository(Result).update({ id: id }, updateResultDto);
      return {
        statusCode: 200,
        message: 'Result updated successfully',
        data: data
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const response = await this.findOne(id);
      if (!response) {
        throw new Error('Result not found');
      }
      const data = await AppDataSource.getRepository(Result).delete({ id: id });
      return {
        statusCode: 200,
        message: 'Result deleted successfully',
        data: data
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
