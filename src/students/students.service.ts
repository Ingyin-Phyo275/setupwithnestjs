import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../config/db.config';
import { Student } from './entities/student.entity';
import { DeleteResult } from 'typeorm';

export type StudentType = {
  id?: number;
  name?: string;
  age?: number;
};

@Injectable()
export class StudentsService {


  async getAllStudents(): Promise<StudentType[]> {
    const students = await AppDataSource.getRepository(Student).find();
    console.log("all", students)
    return students;
  }

  getStudentById(id: number): Promise<StudentType | null> {
    {
      const res = AppDataSource.getRepository(Student).findOneBy({ id });
      return res;
    }
  }

  deleteStudentById(id: number): Promise<DeleteResult> {
    if(!id) {
      throw new Error('ID must be provided');
    }
    return AppDataSource.getRepository(Student).delete(id);
  }

  updateStudentById(id: number, studentData: StudentType): Promise<StudentType> {
    console.log("student data", studentData)
    const res = AppDataSource.getRepository(Student).save({ id, ...studentData });
    return res;
  }

}
