import { Router } from "express";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";

const router = Router();
const studentService = new StudentsService();
const studentControllers = new StudentsController(studentService);
router.get("/students/all", studentControllers?.getAllStudents.bind(studentControllers));
router.get("/students/:id", studentControllers?.getStudentById.bind(studentControllers));

export default router;