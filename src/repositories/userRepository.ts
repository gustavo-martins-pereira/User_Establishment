import { UUID } from "node:crypto";

import { createDynamoDBUser, getDynamoDBUserById, updateDynamoDBUserById, deleteDynamoDBUser, getDynamoDBAllUsers } from "@aws/dynamoDB/services/userDynamoDBService.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO, GetAllUsersResponseDTO, GetUserByIdResponseDTO, UpdateUserByIdResponseDTO } from "@models/user/response/userResponseDTO.ts";

async function createUser(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null> {
    return await createDynamoDBUser(userData);
};

async function getUserById(id: UUID): Promise<GetUserByIdResponseDTO | null> {
    return await getDynamoDBUserById(id);
}

async function getAllUsers(): Promise<GetAllUsersResponseDTO> {
    return await getDynamoDBAllUsers();
}

async function updateUserById(id: UUID, userData: UpdateUserRequestDTO): Promise<UpdateUserByIdResponseDTO | null> {
    return await updateDynamoDBUserById(id, userData);
}

async function deleteUser(id: UUID): Promise<void> {
    await deleteDynamoDBUser(id);
}

export {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUser,
};
