import { Request, Response, NextFunction, RequestHandler } from "express";
import express = require("express");
import { ParamsDictionary } from "express-serve-static-core";

type Req = Request;
type Res = Response;
type Next = NextFunction;
type RequestHandle = RequestHandler;
type ParamsDict = ParamsDictionary;

type Middleware = (req:Req, res:Res, next?:Next) => void;

/*
const methodDecorator = (method:"GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS") => {
    return function<This, Args extends any[], Return>(
        target:(this: This, ...args:Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args:Args) => Return>
    ) {
        return function(this: This, ...args:Args): Return {
            const res = target.call(this, ...args)
            this.method = method;
            return res;
        }
    }
}
*/

class Server {
    private _server;

    public constructor() {
        this._server = express();
    }

    public get(route:string, ...middlewares:Middleware[]) {

        middlewares = middlewares.map(middleware => {
            return (req:Req, res:Res, next?:Next) => {
                req.method = "GET"
                middleware(req, res, next)
            }
        });
        this._server.get(route, middlewares)
    }

    public post(route:string, ...middlewares:Middleware[]) {
        middlewares = middlewares.map(middleware => {
            return (req:Req, res:Res, next?:Next) => {
                req.method = "POST"
                middleware(req, res, next)
            }
        });
        this._server.post(route, middlewares)
    }

    public patch(route:string, ...middlewares:Middleware[]) {
        middlewares = middlewares.map(middleware => {
            return (req:Req, res:Res, next?:Next) => {
                req.method = "PATCH"
                middleware(req, res, next)
            }
        });
        this._server.patch(route, middlewares)
    }

    public delete(route:string, ...middlewares:Middleware[]) {
        middlewares = middlewares.map(middleware => {
            return (req:Req, res:Res, next?:Next) => {
                req.method = "DELETE"
                middleware(req, res, next)
            }
        });
        this._server.delete(route, middlewares)
    }

    public use(...handlers: any[]) {
        this._server.use(...handlers);
    }

    public listen(...params:any[]) {
        this._server.listen(...params)
    }
}

export default Server;