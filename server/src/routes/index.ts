import { Router } from "express";
import usersRouter from "./usersRouter";
import UsersController from "../controllers/usersController";
import UsersService from "../services/usersService";
import usersData from "../data/usersData";

const router = Router();
const usersService = new UsersService(usersData);
const usersController = new UsersController(usersService);

router.use("/users", usersRouter(Router, usersController))

export default router;