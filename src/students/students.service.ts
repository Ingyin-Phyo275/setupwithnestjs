import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../config/db.config';
import { Student } from './entities/student.entity';
import { DeleteResult } from 'typeorm';
import { StudentInput } from './student.interface';


@Injectable()
export class StudentsService {


async getAllStudents(): Promise<{
  status: number;
  message: string;
  data: StudentInput[];
  count: number;
}> {
  const [data, count] = await AppDataSource
    .getRepository(Student)
    .findAndCount();

  return {
    status: 200,
    message: 'Students retrieved successfully',
    data,
    count
  };
}


  async getStudentById(id: number): Promise<StudentInput | null> {
    {
      const res = await AppDataSource.getRepository(Student).findOneBy({ id });
      return res;
    }
  }

  deleteStudentById(id: number): Promise<DeleteResult> {
    if(!id) {
      throw new Error('ID must be provided');
    }
    return AppDataSource.getRepository(Student).delete(id);
  }

async updateStudentById(
  id: number,
  studentData: Partial<Student>
): Promise<Student | null> {
  const studentRepo = AppDataSource.getRepository(Student);

  const student = await studentRepo.findOneBy({ id });
  if (!student) return null;

  Object.assign(student, studentData); // merge new data
  return studentRepo.save(student);    // returns updated entity
}

async createStudent(studentData: Partial<Student>): Promise<Student | null> {
  try {
    const res = await AppDataSource.getRepository(Student).save(studentData);
    return res;
  } catch (error) {
    throw new Error('Error creating student: ' + error.message);
  }
}

}
