import { Request, Response } from "express";

type usersRequest = Request;
type usersResponse = Response;

class UsersController {
    private _usersService:any;

    public constructor(usersService:any) {
        this._usersService = usersService;
    }

    public getUsers = (req:usersRequest, res:usersResponse) => {
        const users = this._usersService.getUsers();
        if(users) {
            res.json(users);
        } else {
            res.status(404);
            res.json({message:"users not found"})
        }
    }
}

export default UsersController;