import express from "express"

import { createUser, getUserById, updateUser, deleteUser, getAllUsers } from "@controllers/userController.ts";
import { postCreateUserValidator, getUserByIdValidator, putUpdateUserValidator, deleteUserIdValidator } from "./validators/userValidators.ts";
import { createEstablishment, getAllEstablishments, getEstablishmentById } from "@controllers/establishmentController.ts";
import { getEstablishmentByIdValidator, postCreateEstablishmentValidator } from "./validators/establishmentValidators.ts";

const routes = express.Router();

// USER
routes.post("/users", postCreateUserValidator, createUser);
routes.get("/users/:id", getUserByIdValidator, getUserById);
routes.get("/users", getAllUsers);
routes.put("/users/:id", putUpdateUserValidator, updateUser);
routes.delete("/users/:id", deleteUserIdValidator, deleteUser);

// ESTABLISHMENT
routes.post("/establishments", postCreateEstablishmentValidator, createEstablishment);
routes.get("/establishments/:id", getEstablishmentByIdValidator, getEstablishmentById);
routes.get("/establishments", getAllEstablishments);

export default routes;