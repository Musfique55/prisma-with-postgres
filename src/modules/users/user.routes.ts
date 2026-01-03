import { Router } from "express";
import { UserController } from "./user.controller";

const routes = Router();

routes.get("/",UserController.getAllUsers);

export const UserRoutes = routes;