import { Router } from "express";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";

const router = Router();
const roleService = new RolesService();
const roleController = new RolesController(roleService);

router.get("/", roleController.findAll.bind(roleController))
router.post("/", roleController.create.bind(roleController));
router.put("/:id", roleController.update.bind(roleController));
router.delete("/:id", roleController.remove.bind(roleController));