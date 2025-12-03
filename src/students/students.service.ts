import { Injectable } from '@nestjs/common';

export type Student = {
  id: number;
  name: string;
  age: number;
};

@Injectable()
export class StudentsService {
  private students: Student[] = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 },
    { id: 3, name: 'Sam Johnson', age: 19 },
  ];

  getAllStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: number) : Student | undefined {
    const res = this.students.find(student => student.id === id);
    return res;
  }
}
