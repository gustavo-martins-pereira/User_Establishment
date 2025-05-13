import { UUID } from "node:crypto";

import { createDynamoDBUser, getDynamoDBUserById, updateDynamoDBUser } from "@aws/dynamoDB/services/userDynamoDBService.ts";
import { CreateUserRequestDTO, UpdateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO, GetUserByIdResponseDTO, UpdateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";

async function createUser(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    return await createDynamoDBUser(userData);
};

async function getUserById(id: UUID): Promise<GetUserByIdResponseDTO | null> {
    return await getDynamoDBUserById(id);
}

async function updateUser(id: UUID, userData: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO | null> {
    return await updateDynamoDBUser(id, userData);
}

export {
    createUser,
    getUserById,
    updateUser,
};
