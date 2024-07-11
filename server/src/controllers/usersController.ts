import { Request, Response } from "express";
import {statusCode} from "../utils/httpStatusCodes";

type usersRequest = Request;
type usersResponse = Response;

class UsersController {
    private _usersService:any;

    public constructor(usersService:any) {
        this._usersService = usersService;
    }


    public getUsers = async (req:usersRequest, res:usersResponse) => {
        const users = await this._usersService.getUsers(req.query);
        if(users && !users.error) {
            res.status(statusCode.ok).json(users);
        } else {
            res.status(statusCode.notFound).json({message:"users not found"})
        }
    }

    public authUser = async (req:usersRequest, res:usersResponse) => {
        const token = await this._usersService.authUser(req.body);

        if(token) {
            res
            .status(statusCode.ok)
            .cookie("refreshToken", token.refreshToken, { httpOnly: true })
            .json({accessToken: token.accessToken})
        }  else {
            res.status(statusCode.badRequest).json({message: "BAD_USER"})
        }
    }

    public checkAuth = async(req:usersRequest, res:usersResponse) => {
        const result = await this._usersService.checkAuth(req.refreshPayload);
        if(!result.error) {
            res.status(statusCode.ok)
            .status(statusCode.ok)
            .cookie("refreshToken", result.refreshToken, { httpOnly: true })
            .json({accessToken: result.accessToken});
        } else {
            res.status(statusCode.badRequest).json(result)
        }
    }

    public updateUser = async(req:usersRequest, res:usersResponse) => {
        const result = await this._usersService.updateUser(req.body, req.user);
        if(!result.error) {
            res.json(result);
        } else {
            res.status(statusCode.badRequest).json(result)
        }
    }

    public createUser = async (req:usersRequest, res:usersResponse) => {
        const result = await this._usersService.createUser(req.body);

        if(!result.error) {
            res
            .status(statusCode.created)
            .cookie("refreshToken", result.refreshToken, { httpOnly: true })
            .json({accessToken: result.accessToken});
        } else {
            res.status(statusCode.badRequest).json(result)
        }
    }
}

export default UsersController;