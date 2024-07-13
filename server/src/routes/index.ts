import { Router } from "express";
import usersRouter from "./usersRouter";
import UsersController from "../controllers/usersController";
import UsersService from "../services/usersService";
import docsRouter from "./docsRouter";
import docs from "../docs/docs";
import userUtils from "../utils/userUtils";
import UsersData from "../data/usersData";
import uniteModel from "../models/uniteModel";
import CommunitiesData from "../data/communitiesData";
import CommunitiesService from "../services/communitiesService";
import CommunitiesController from "../controllers/communitiesController";
import communitiesRouter from "./communitiesRouter";
import tokenService from "../services/tokenService";
import CommunitiesUtils from "../utils/communitiesUtils";

const router = Router();

const usersData = new UsersData(uniteModel)
const usersService = new UsersService(usersData, userUtils, tokenService);
const usersController = new UsersController(usersService);

const communitiesData = new CommunitiesData(uniteModel);
const communitiesService = new CommunitiesService(communitiesData, CommunitiesUtils);
const communitiesController = new CommunitiesController(communitiesService);

router.use("/users", usersRouter(Router(), usersController))
router.use("/communities", communitiesRouter(Router(), communitiesController))
router.use("/docs", docsRouter(router, docs))

export default router;