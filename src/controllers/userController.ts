import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { UUID } from "node:crypto";

import { createUserUsecase } from "@services/user/createUserUsecase.ts";
import { getUserByIdUsecase } from "@services/user/getUserByIdUsecase.ts";
import { updateUserByIdUsecase } from "@services/user/updateUserByIdUsecase.ts";
import { deleteUserByIdUsecase } from "@services/user/deleteUserByIdUsecase.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { BadRequestError, NotFoundError } from "@utils/errors/AppError.ts";
import { getAllUsersUsecase } from "@services/user/getAllUsersUsecase.ts";

async function createUser(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const userData: CreateUserRequestDTO = request.body;
        const user = await createUserUsecase(userData);

        response.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

async function getUserById(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

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
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

        const { id } = request.params;
        const userData: UpdateUserRequestDTO = request.body;

        const isUserExists = await getUserByIdUsecase(id as UUID);
        if(!isUserExists) throw new NotFoundError("User not found");

        const user = await updateUserByIdUsecase(id as UUID, userData);

        response.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

async function deleteUserById(request: Request, response: Response, next: NextFunction) {
    try {
        const result = validationResult(request);
        if(!result.isEmpty()) throw new BadRequestError(result.array()[0].msg);

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
