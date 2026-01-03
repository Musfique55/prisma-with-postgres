import { NextFunction, Request, Response } from "express"
import {auth as betterAuth} from "../lib/auth"

export enum Roles {
    ADMIN = "admin",
    USER = "user"
}
declare global{
    namespace Express{
    interface Request{
        user? : {
            id : string;
            email : string;
            role : string;
            emailVerified : boolean;
        }
    }
}
}

export const auth = (...roles : Roles[]) => {
    return async(req : Request,res: Response,next:NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
            headers : req.headers as any
        });
        
        if(!session || !session.user.emailVerified) {
            return res.status(401).json({message : "Unauthorized"});
        }

        req.user = {
            id : session.user.id,
            email : session.user.email!,
            role : session.user.role as Roles,
            emailVerified : session.user.emailVerified
        };

        if(!session.user.role || !roles.includes(session.user.role as Roles)) {
            return  res.status(403).json({message : "Forbidden"});
        }

        next();
        } catch (error) {
            next(error);
        }
    }
}