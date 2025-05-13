import express from "express"

import { createUser, getUser, updateUser, deleteUser } from "@controllers/userController.ts";
import { postCreateUserValidator, getUserIdValidator, putUpdateUserValidator, deleteUserIdValidator } from "./validators/userValidators.ts";

const routes = express.Router();

routes.post("/users", postCreateUserValidator, createUser);
routes.get("/users/:id", getUserIdValidator, getUser);
routes.put("/users/:id", putUpdateUserValidator, updateUser);
routes.delete("/users/:id", deleteUserIdValidator, deleteUser);

export default routes;