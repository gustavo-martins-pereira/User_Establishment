import express from "express"

import { createUser } from "@controllers/userController.ts";
import { postCreateUserValidator } from "./validators/userValidators.ts";

const routes = express.Router();

routes.post("/users", postCreateUserValidator, createUser);

export default routes;