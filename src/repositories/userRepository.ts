import { createDynamoDBUser } from "@aws/dynamoDB/services/userDynamoDBService.ts";
import { CreateUserRequestDTO } from "@models/user/request/userRequestDTO.ts";
import { CreateUserResponseDTO } from "@models/user/response/userResponseDTO.ts";

async function createUser(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    return await createDynamoDBUser(userData);
};

export {
    createUser,
};
