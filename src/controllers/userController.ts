import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UUID } from "node:crypto";

import { createUserUsecase } from "@services/user/createUserUsecase.ts";
import { getUserByIdUsecase } from "@services/user/getUserByIdUsecase.ts";
import { updateUserUsecase } from "@services/user/updateUserUsecase.ts";
import { deleteUserUsecase } from "@services/user/deleteUserUsecase.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";

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
        const user = await getUserByIdUsecase(id as UUID);

        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        response.status(200).json(user);
    } catch (error) {
        response.status(500).send();
    }
}

async function updateUser(request: Request, response: Response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        response.status(400).json({ errors: result.array() });
        return;
    }

    try {
        const { id } = request.params;
        const userData: UpdateUserRequestDTO = request.body;

        const isUserExists = await getUserByIdUsecase(id as UUID);
        if (!isUserExists) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        const user = await updateUserUsecase(id as UUID, userData);

        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        response.status(200).json(user);
    } catch (error) {
        response.status(500).send();
    }
}

async function deleteUser(request: Request, response: Response) {
    const result = validationResult(request);

    if(!result.isEmpty()) {
        response.status(400).json({ errors: result.array() });
        return;
    }

    try {
        const { id } = request.params;

        const isUserExists = await getUserByIdUsecase(id as UUID);
        if (!isUserExists) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        await deleteUserUsecase(id as UUID);

        response.status(204).send();
    } catch (error) {
        response.status(500).send();
    }
}

export {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
