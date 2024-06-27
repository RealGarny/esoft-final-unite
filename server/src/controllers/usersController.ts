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
        const users = await this._usersService.getUsers();
        if(users) {
            res.status(statusCode.ok).json(users);
        } else {
            res.status(statusCode.notFound).json({message:"users not found"})
        }
    }

    public authUser = async (req:usersRequest, res:usersResponse) => {
        const token = await this._usersService.authUser(req.body);

        if(token) {
            res.status(200).json({token})
        }  else {
            res.status(statusCode.badRequest).json({message: "BAD_USER"})
        }
    }

    public createUser = async (req:usersRequest, res:usersResponse) => {
        const token = await this._usersService.createUser(req.body);
        const cookieConfig = { maxAge: 72 * 60 * 60 * 1000, httpOnly: true };

        if(token) {
            res
            .status(statusCode.created)
            .cookie("refreshToken", token.accessToken, cookieConfig)
            .json({accessToken: token.accessToken});
        } else {
            res.status(statusCode.badRequest).json({message: "user was not created."})
        }
    }

    public getUser = async(req: usersRequest, res: usersResponse) => {
        const user = await this._usersService.getUser(req.params.userLogin, req.query)

        if(user) {
            res.status(statusCode.ok).json(user);
        } else {
            res.status(statusCode.notFound).json({message: "user was not found."})
        }
    }
}

export default UsersController;