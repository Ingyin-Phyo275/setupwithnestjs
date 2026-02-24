import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AppDataSource } from '../config/db.config';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  async create(createQuestionDto: CreateQuestionDto) {
    const res = await AppDataSource.getRepository(Question).save(createQuestionDto);
    return {
      statusCode: 201,
      message: 'Question created successfully',
      data: res
    };
  }

  async findAll() {
    const res = await AppDataSource.getRepository(Question).findAndCount({
      order: {
        id: 'ASC'
      }
    });
    const [questions, count] = res;
    if( count === 0 ) throw new Error('No questions found');
    return {
      statusCode: 200,
      message: 'Questions fetched successfully',
      data: questions,
      count: count
    }
  }

  async findOne(id: number) {
    try {
      const res = await AppDataSource.getRepository(Question).findOneBy({ id: id });
      if(!res){
        throw new Error('Question not found');
      }
      return {
        statusCode: 200,
        message: 'Question fetched successfully',
        data: res
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      const res = await this.findOne(id);
      if (!res) {
        throw new Error('Question not found');
      }
      const data = await AppDataSource.getRepository(Question).update({ id: id }, updateQuestionDto);
      return {
        statusCode: 200,
        message: 'Question updated successfully',
        data: data
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.findOne(id);
      if (!res) {
        throw new Error('Question not found');
      }
      const data = await AppDataSource.getRepository(Question).delete({ id: id });
      return {
        statusCode: 200,
        message: 'Question deleted successfully',
        data: data
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
