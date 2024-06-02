import { Request, Response } from "express";

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
            res.json(users);
        } else {
            res.status(404);
            res.json({message:"users not found"})
        }
    }

    public createUser = async (req:usersRequest, res:usersResponse) => {
        const token = await this._usersService.createUser(req.body);
        if(token) {
            res.status(201).json(token);
        } else {
            res.status(400).json({message: "user was not created."})
        }
    }
}

export default UsersController;