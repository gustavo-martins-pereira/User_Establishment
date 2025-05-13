import express from "express"

import { createUser, getUser } from "@controllers/userController.ts";
import { postCreateUserValidator, getUserIdValidator } from "./validators/userValidators.ts";

const routes = express.Router();

routes.post("/users", postCreateUserValidator, createUser);
routes.get("/users/:id", getUserIdValidator, getUser);

export default routes;