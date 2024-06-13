import { Router } from "express";
import usersRouter from "./usersRouter";
import UsersController from "../controllers/usersController";
import UsersService from "../services/usersService";
import docsRouter from "./docsRouter";
import docs from "../docs/docs";
import userUtils from "../utils/userUtils";
import UsersData from "../data/usersData";
import KnexModel from "../models/knexModel";
import CommunitiesData from "../data/communitiesData";
import CommunitiesService from "../services/communitiesService";
import CommunitiesController from "../controllers/communitiesController";
import communitiesRouter from "./communitiesRouter";

const router = Router();
const knexModel = new KnexModel();

const usersData = new UsersData(knexModel.getConHandler())
const usersService = new UsersService(usersData, userUtils);
const usersController = new UsersController(usersService);

const communitiesData = new CommunitiesData(knexModel.getConHandler());
const communitiesService = new CommunitiesService(communitiesData);
const communitiesController = new CommunitiesController(communitiesService);

router.use("/users", usersRouter(Router(), usersController))
router.use("/communities", communitiesRouter(Router(), communitiesController))
router.use("/docs", docsRouter(router, docs))

export default router;