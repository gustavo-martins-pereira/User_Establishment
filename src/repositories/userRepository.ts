import { UUID } from "node:crypto";

import { createDynamoDBUser, getDynamoDBUserById } from "@aws/dynamoDB/services/userDynamoDBService.ts";
import { CreateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO, GetUserByIdResponseDTO } from "@models/user/response/userResponseDTO.ts";

async function createUser(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    return await createDynamoDBUser(userData);
};

async function getUserById(id: UUID): Promise<GetUserByIdResponseDTO | null> {
    return await getDynamoDBUserById(id);
}

export {
    createUser,
    getUserById,
};
