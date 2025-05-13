import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { createUserUsecase } from "@services/user/createUserUsecase.ts";
import { getUserUsecase } from "@services/user/getUserUsecase.ts";
import { CreateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { UUID } from "node:crypto";

async function createUser(request: Request, response: Response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        response.status(400).json({ errors: result.array() });
        return;
    }

    try {
        const userData: CreateUserRequestDTO = request.body;

        const user = await createUserUsecase(userData);

        response.status(201).json(user);
    } catch (error) {
        response.status(500).send();
    }
}

async function getUser(request: Request, response: Response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        response.status(400).json({ errors: result.array() });
        return;
    }

    try {
        const { id } = request.params;
        const user = await getUserUsecase(id as UUID);

        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        response.status(200).json(user);
    } catch (error) {
        response.status(500).send();
    }
}

export {
    createUser,
    getUser
};
