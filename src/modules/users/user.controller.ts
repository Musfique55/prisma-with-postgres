import { Request, Response } from "express";
import { UserServices } from "./user.services";

const getAllUsers = async(req : Request,res : Response) => {
    try {
        const result = await UserServices.getAllUsers();
        return res.status(200).json(result);
    } catch (error : any) {
        res.status(500).json({message : error.message});
    }
}

export const UserController = {
    getAllUsers
}