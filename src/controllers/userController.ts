import { CreateUserDTO } from "@models/user.ts";
import { createUserUsecase } from "@services/user/createUserUsecase.ts";
import { Request, Response } from "express";

async function createUser(request: Request, response: Response): Promise<void> {
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
