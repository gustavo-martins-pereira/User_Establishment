import express from "express"

import { createUser, getUserById, updateUserById, deleteUser, getAllUsers } from "@controllers/userController.ts";
import { postCreateUserValidator, getUserByIdValidator, putUpdateUserValidator, deleteUserIdValidator } from "./validators/userValidators.ts";
import { createEstablishment, getAllEstablishments, getEstablishmentById, updateEstablishmentById } from "@controllers/establishmentController.ts";
import { getEstablishmentByIdValidator, postCreateEstablishmentValidator, putUpdateEstablishmentValidator } from "./validators/establishmentValidators.ts";

const routes = express.Router();

// USER
routes.post("/users", postCreateUserValidator, createUser);
routes.get("/users/:id", getUserByIdValidator, getUserById);
routes.get("/users", getAllUsers);
routes.put("/users/:id", putUpdateUserValidator, updateUserById);
routes.delete("/users/:id", deleteUserIdValidator, deleteUser);

// ESTABLISHMENT
routes.post("/establishments", postCreateEstablishmentValidator, createEstablishment);
routes.get("/establishments/:id", getEstablishmentByIdValidator, getEstablishmentById);
routes.get("/establishments", getAllEstablishments);
routes.put("/establishments/:id", putUpdateEstablishmentValidator, updateEstablishmentById);

export default routes;