import { Router } from "express";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

const router = Router();
const userService = new UsersService();
const usersController = new UsersController(userService);

router.get("/", usersController.findAll.bind(usersController))
router.post("/", usersController.create.bind(usersController));
router.put("/:id", usersController.update.bind(usersController));
router.delete("/:id", usersController.remove.bind(usersController));