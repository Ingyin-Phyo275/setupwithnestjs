import { Body, Controller, Delete, Get, Param, Patch, Post,  } from '@nestjs/common';
import { StudentsService } from './students.service';
import type { StudentInput } from './student.interface';


@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

 @Get('all')
  async getAllStudents() {
    const students = await this.studentsService.getAllStudents();
    return students;
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    const student = await this.studentsService.getStudentById(+id);
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

  @Delete(':id')
  async deleteStudentById(@Param('id') id: string) {
    const result = await this.studentsService.deleteStudentById(+id);
    if(!result) {
      return {
        status: 500,
        message: 'Student not found'
      }
    }
    return {
      status: 200,
      message: 'Student deleted successfully',
      data: result
    }
  }

@Patch(':id')
async updateStudentById(
  @Param('id') id: number,
  @Body() studentData: any
) {
  console.log("student in controller", studentData);
  
  const updatedStudent = await this.studentsService.updateStudentById(id, studentData);

  if (!updatedStudent) {
    return {
      status: 404,
      message: 'Student not found'
    };
  }

  return {
    status: 200,
    message: 'Student updated successfully',
    data: updatedStudent
  };
}

@Post('create')
async createStudent(@Body() studentData: StudentInput) {
  try {
    const newStudent = await this.studentsService.createStudent(studentData);
    return {
      status: 201,
      message: 'Student created successfully',
      data: newStudent
    };
  } catch (error) {
    throw new Error('Error creating student: ' + error.message);
  }
}

}

