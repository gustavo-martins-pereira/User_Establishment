import express from "express"

import { createUser, getUser, updateUser, deleteUser, getAllUsers } from "@controllers/userController.ts";
import { postCreateUserValidator, getUserIdValidator, putUpdateUserValidator, deleteUserIdValidator } from "./validators/userValidators.ts";
import { createEstablishment } from "@controllers/establishmentController.ts";
import { postCreateEstablishmentValidator } from "./validators/establishmentValidators.ts";

const routes = express.Router();

// USER
routes.post("/users", postCreateUserValidator, createUser);
routes.get("/users/:id", getUserIdValidator, getUser);
routes.get("/users", getUserIdValidator, getAllUsers);
routes.put("/users/:id", putUpdateUserValidator, updateUser);
routes.delete("/users/:id", deleteUserIdValidator, deleteUser);

// ESTABLISHMENT
routes.post("/establishments", postCreateEstablishmentValidator, createEstablishment);

export default routes;