import { Request, Response, NextFunction } from "express";
import { UUID } from "node:crypto";

import { createUserUsecase } from "@services/user/createUserUsecase.ts";
import { getUserByIdUsecase } from "@services/user/getUserByIdUsecase.ts";
import { updateUserByIdUsecase } from "@services/user/updateUserByIdUsecase.ts";
import { deleteUserByIdUsecase } from "@services/user/deleteUserByIdUsecase.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { NotFoundError } from "@utils/errors/AppError.ts";
import { getAllUsersUsecase } from "@services/user/getAllUsersUsecase.ts";
import { handleExpressValidation } from "@utils/handles/handleExpressValidation.ts";
import { removeUndefinedProperties } from "@utils/object.ts";

async function createUser(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const {
            name,
            email,
            type,
        }: CreateUserRequestDTO = request.body;
        const user = await createUserUsecase({ name, email, type } as CreateUserRequestDTO);

        response.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

async function getUserById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;
        const user = await getUserByIdUsecase(id as UUID);
        if(!user) throw new NotFoundError("User not found");

        response.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function getAllUsers(request: Request, response: Response, next: NextFunction) {
    try {
        const users = await getAllUsersUsecase();

        response.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

async function updateUserById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;
        const {
            name,
            email,
            type,
        }: UpdateUserRequestDTO = request.body;

        const isUserExists = await getUserByIdUsecase(id as UUID);
        if(!isUserExists) throw new NotFoundError("User not found");

        const user = await updateUserByIdUsecase(
            id as UUID,
            removeUndefinedProperties({ name, email, type } as UpdateUserRequestDTO)
        );

        response.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function deleteUserById(request: Request, response: Response, next: NextFunction) {
    try {
        handleExpressValidation(request);

        const { id } = request.params;

        const isUserExists = await getUserByIdUsecase(id as UUID);
        if(!isUserExists) throw new NotFoundError("User not found");

        await deleteUserByIdUsecase(id as UUID);

        response.status(204).send();
    } catch (error) {
        next(error);
    }
}

export {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
};
