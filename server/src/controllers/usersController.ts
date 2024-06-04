import { Request, Response } from "express";

type usersRequest = Request;
type usersResponse = Response;

enum statusCode {
    created = 201,
    ok = 200,
    badRequest = 400,
    notFound = 404,
}

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

    public createUser = async (req:usersRequest, res:usersResponse) => {
        const token = await this._usersService.createUser(req.body);

        if(token) {
            res.status(statusCode.created).json(token);
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