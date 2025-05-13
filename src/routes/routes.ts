import { createUser } from "@controllers/userController.ts";
import express from "express"

const routes = express.Router();

routes.post("/users", createUser);

export default routes;