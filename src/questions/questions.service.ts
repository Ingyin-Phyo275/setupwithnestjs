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
    const res = await AppDataSource.getRepository(Question).findAndCount();
    const [questions, count] = res;
    if( count === 0 ) throw new Error('No questions found');
    return {
      statusCode: 200,
      message: 'Questions fetched successfully',
      data: questions,
      count: count
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
