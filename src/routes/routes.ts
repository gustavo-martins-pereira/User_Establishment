import express from "express"

import { createUser, getUserById, updateUserById, deleteUserById, getAllUsers } from "@controllers/userController.ts";
import { postCreateUserValidator, getUserByIdValidator, putUpdateUserValidator, deleteUserByIdValidator } from "./validators/userValidators.ts";
import { createEstablishment, deleteEstablishmentById, getAllEstablishments, getEstablishmentById, getEstablishmentsByType, updateEstablishmentById } from "@controllers/establishmentController.ts";
import { deleteEstablishmentByIdValidator, getEstablishmentByIdValidator, getEstablishmentsByTypeValidator, postCreateEstablishmentValidator, putUpdateEstablishmentValidator } from "./validators/establishmentValidators.ts";
import { getProductByIdValidator, postCreateProductValidator } from "./validators/productValidators.ts";
import { createProduct, getProductById } from "@controllers/productController.ts";
import { errorHandler } from "@middlewares/errorHandler.ts";

const routes = express.Router();

// USER
routes.post("/users", postCreateUserValidator, createUser);
routes.get("/users/:id", getUserByIdValidator, getUserById);
routes.get("/users", getAllUsers);
routes.put("/users/:id", putUpdateUserValidator, updateUserById);
routes.delete("/users/:id", deleteUserByIdValidator, deleteUserById);

// ESTABLISHMENT
routes.post("/establishments", postCreateEstablishmentValidator, createEstablishment);
routes.get("/establishments/:id", getEstablishmentByIdValidator, getEstablishmentById);
routes.get("/establishments/type/:type", getEstablishmentsByTypeValidator, getEstablishmentsByType);
routes.get("/establishments", getAllEstablishments);
routes.put("/establishments/:id", putUpdateEstablishmentValidator, updateEstablishmentById);
routes.delete("/establishments/:id", deleteEstablishmentByIdValidator, deleteEstablishmentById);

// PRODUCT
routes.post("/products", postCreateProductValidator, createProduct);
routes.get("/products/:id", getProductByIdValidator, getProductById);

// ERROR MIDDLEWARES
routes.use(errorHandler);

export default routes;