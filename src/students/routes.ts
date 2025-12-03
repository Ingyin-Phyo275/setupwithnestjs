import { Router } from "express";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";

const router = Router();
const studentService = new StudentsService();
const studentControllers = new StudentsController(studentService);
router.get("/students/all", studentControllers?.getAllStudents.bind(studentControllers));
router.get("/students/:id", studentControllers?.getStudentById.bind(studentControllers));
router.delete("/students/:id", studentControllers?.deleteStudentById.bind(studentControllers));
// router.post("/students", studentControllers?.createStudent.bind(studentControllers));
export default router;