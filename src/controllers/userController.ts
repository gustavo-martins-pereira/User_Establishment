import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { CreateUserDTO } from "@models/user.ts";
import { createUserUsecase } from "@services/user/createUserUsecase.ts";

async function createUser(request: Request, response: Response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        response.status(400).json({ errors: result.array() });
        return;
    }

    try {
        const userData: CreateUserDTO = request.body;

        await createUserUsecase(userData);

        response.status(201).json(userData);
    } catch (error) {
        response.status(500).send();
    }
}

export {
    createUser
};
