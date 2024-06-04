import { Router } from "express";
import usersRouter from "./usersRouter";
import UsersController from "../controllers/usersController";
import UsersService from "../services/usersService";
import docsRouter from "./docsRouter";
import docs from "../docs/docs";
import userUtils from "../utils/userUtils";
import UsersData from "../data/usersData";
import knexModel from "../models/knexModel";

const router = Router();
const usersData = new UsersData(new knexModel().getConHandler())
const usersService = new UsersService(usersData, userUtils);
const usersController = new UsersController(usersService);

router.use("/users", usersRouter(Router, usersController))
router.use("/docs", docsRouter(router, docs))

export default router;