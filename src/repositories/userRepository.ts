import { UUID } from "node:crypto";

import { createDynamoDBUser, getDynamoDBUserById, updateDynamoDBUser, deleteDynamoDBUser } from "@aws/dynamoDB/services/userDynamoDBService.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO, GetUserByIdResponseDTO, UpdateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";

async function createUser(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO | null> {
    return await createDynamoDBUser(userData);
};

async function getUserById(id: UUID): Promise<GetUserByIdResponseDTO | null> {
    return await getDynamoDBUserById(id);
}

async function updateUser(id: UUID, userData: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO | null> {
    return await updateDynamoDBUser(id, userData);
}

async function deleteUser(id: UUID): Promise<void> {
    await deleteDynamoDBUser(id);
}

export {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
