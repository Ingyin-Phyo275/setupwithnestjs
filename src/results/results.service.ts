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
    const res = await AppDataSource.getRepository(Result).findAndCount();
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

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
