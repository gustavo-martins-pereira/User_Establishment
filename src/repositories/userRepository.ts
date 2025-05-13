import { createDynamoDBUser } from "@aws/dynamoDB/services/userDynamoDBService.ts";
import { CreateUserDTO } from "@models/user.ts";

async function createUser(userData: CreateUserDTO) {
    await createDynamoDBUser(userData);
};

export {
    createUser,
};
