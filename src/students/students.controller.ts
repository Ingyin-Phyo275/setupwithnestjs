import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

 @Get('all')
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    const student = this.studentsService.getStudentById(+id);
    if(!student) {
      return {
        status: 500,
        message: 'Student not found'
      }
    }
    return {
      status: 200,
      message: 'Student found',
      data: student
    }
  }
}
