import { Router } from "express";
import usersRouter from "./usersRouter";
import UsersController from "../controllers/usersController";
import UsersService from "../services/usersService";
import usersData from "../data/usersData";
import docsRouter from "./docsRouter";
import docs from "../docs/docs";
import userUtils from "../utils/userUtils";

const router = Router();
const usersService = new UsersService(usersData, userUtils);
const usersController = new UsersController(usersService);

router.use("/users", usersRouter(Router, usersController))
router.use("/docs", docsRouter(router, docs))

export default router;