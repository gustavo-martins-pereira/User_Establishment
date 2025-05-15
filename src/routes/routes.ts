import express from "express"

import { createUser, getUserById, updateUserById, deleteUserById, getAllUsers } from "@controllers/userController.ts";
import { postCreateUserValidator, getUserByIdValidator, putUpdateUserValidator, deleteUserByIdValidator } from "./validators/userValidators.ts";
import { createEstablishment, deleteEstablishmentById, getAllEstablishments, getEstablishmentById, getEstablishmentsByType, updateEstablishmentById } from "@controllers/establishmentController.ts";
import { deleteEstablishmentByIdValidator, getEstablishmentByIdValidator, getEstablishmentsByTypeValidator, postCreateEstablishmentValidator, putUpdateEstablishmentValidator } from "./validators/establishmentValidators.ts";
import { deleteProductByIdValidator, getProductByIdValidator, postCreateProductValidator, putUpdateProductValidator } from "./validators/productValidators.ts";
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "@controllers/productController.ts";
import { errorHandler } from "@middlewares/errorHandler.ts";
import { deleteEstablishmentRuleByIdValidator, getEstablishmentRuleByEstablishmentIdValidator, postCreateEstablishmentRuleValidator, putUpdateEstablishmentRuleValidator } from "./validators/establishmentRuleValidators.ts";
import { createEstablishmentRule, deleteEstablishmentRuleById, getEstablishmentRuleByEstablishmentId, updateEstablishmentRuleById } from "@controllers/establishmentRuleController.ts";

const routes = express.Router();

// TODO: Exclude other properties that aren't in the model
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
routes.get("/products", getAllProducts);
routes.put("/products/:id", putUpdateProductValidator, updateProductById);
routes.delete("/products/:id", deleteProductByIdValidator, deleteProductById);

// ESTABLISHMENT RULE
routes.post("/establishment-rules", postCreateEstablishmentRuleValidator, createEstablishmentRule);
routes.get("/establishment-rules/establishment/:establishmentId", getEstablishmentRuleByEstablishmentIdValidator, getEstablishmentRuleByEstablishmentId);
routes.put("/establishment-rules/:id", putUpdateEstablishmentRuleValidator, updateEstablishmentRuleById);
routes.delete("/establishment-rules/:id", deleteEstablishmentRuleByIdValidator, deleteEstablishmentRuleById);

// ERROR MIDDLEWARES
routes.use(errorHandler);

export default routes;